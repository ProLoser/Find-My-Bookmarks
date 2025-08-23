import { useEffect, useState } from "react"
import "./popup.css"

const API = chrome || browser;

interface Bookmark {
  id: string
  title: string
  url: string
  parentId?: string
}

interface Settings {
  ignore_subdomain?: string
  hover_url?: string
  no_folders?: string
  no_share?: string
}

function Popup() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [domain, setDomain] = useState<string>("")
  const [settings, setSettings] = useState<Settings>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadBookmarks()
  }, [])

  const loadBookmarks = async () => {
    try {
      // Get current tab
      const [activeTab] = await API.tabs.query({ active: true, currentWindow: true })
      if (!activeTab.url) return

      // Extract domain
      const urlParts = activeTab.url.split(/^((\w+:)?\/\/)?(www\.)?([\\w|\\.])+/gi)
      let currentDomain = urlParts[4] || ""

      // Load settings
      const result = await API.storage.local.get([
        'ignore_subdomain', 
        'hover_url', 
        'no_folders', 
        'no_share'
      ])
      setSettings(result)

      // Apply subdomain filtering
      if (result.ignore_subdomain === 'true') {
        const pieces = currentDomain.split('.')
        if (pieces.length > 2 && (pieces.length !== 3 || pieces[1] !== 'co' || pieces[2] !== 'uk')) {
          pieces.shift()
          currentDomain = pieces.join('.')
        }
      }

      setDomain(currentDomain)

      // Get bookmarks
      const bookmarkTree = await API.bookmarks.getTree()
      const matchingBookmarks: Bookmark[] = []

      function searchBookmarks(tree: chrome.bookmarks.BookmarkTreeNode[], parentTitle = "") {
        for (const node of tree) {
          if (!node.children && node.url) {
            if (node.url.includes(currentDomain)) {
              matchingBookmarks.push({
                id: node.id,
                title: node.title,
                url: node.url,
                parentId: parentTitle
              })
            }
          } else if (node.children) {
            searchBookmarks(node.children, node.title)
          }
        }
      }

      searchBookmarks(bookmarkTree)
      setBookmarks(matchingBookmarks)
    } catch (error) {
      console.error('Error loading bookmarks:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteBookmark = async (bookmarkId: string) => {
    try {
      await API.bookmarks.remove(bookmarkId)
      setBookmarks(prev => prev.filter(b => b.id !== bookmarkId))
    } catch (error) {
      console.error('Error deleting bookmark:', error)
    }
  }

  const renderMenu = (url: string, title: string, id?: string) => {
    return (
      <div className="menu">
        <ul>
          {id && (
            <li>
              <button 
                className="delete" 
                onClick={() => deleteBookmark(id)}
                title="Delete this bookmark"
              >
                Delete
              </button>
            </li>
          )}
          {settings.no_share !== 'true' && (
            <>
              <li>
                <a 
                  className="twitter" 
                  href={`https://twitter.com/home?status=${encodeURI(url)}`}
                  target="_blank" 
                  title="Share on Twitter"
                >
                  Tweet
                </a>
              </li>
              <li>
                <a 
                  className="facebook" 
                  href={`http://www.facebook.com/sharer.php?u=${url}&t=${title}`}
                  target="_blank" 
                  title="Share on Facebook"
                >
                  Share
                </a>
              </li>
              <li>
                <a 
                  className="email" 
                  href={`mailto:?subject=Checkout this site: ${title}&body=${url}`}
                  target="_blank" 
                  title="Email to a Friend"
                >
                  Email
                </a>
              </li>
            </>
          )}
          {!id && (
            <li>
              <a 
                className="options" 
                href={API.runtime.getURL("options.html")}
                target="_blank" 
                title="Settings"
              >
                Settings
              </a>
            </li>
          )}
        </ul>
      </div>
    )
  }

  if (loading) {
    return <div className="loading">Loading bookmarks...</div>
  }

  return (
    <div className="popup-container">
      <h2>
        <strong>{domain}</strong> Bookmarks
        {renderMenu(domain)}
      </h2>
      <div className={`list ${settings.hover_url === 'true' ? 'hoverUrl' : ''} ${settings.no_folders !== 'true' ? 'folders' : ''}`}>
        {bookmarks.length === 0 ? (
          <div className="no-bookmarks">No bookmarks found for this domain</div>
        ) : (
          <ul>
            {bookmarks.map((bookmark) => (
              <li key={bookmark.id}>
                <a href={bookmark.url} target="_blank" title={bookmark.url}>
                  {bookmark.title}
                </a>
                {settings.no_folders !== 'true' && bookmark.parentId && (
                  <span className="folder">{bookmark.parentId}</span>
                )}
                {renderMenu(bookmark.url, bookmark.title, bookmark.id)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Popup