import { useEffect, useState } from "react"
import "./options.css"

interface Settings {
  no_share: boolean
  no_folders: boolean
  ignore_subdomain: boolean
  hover_url: boolean
  ignore_current_page: boolean
}

function OptionsPage() {
  const [settings, setSettings] = useState<Settings>({
    no_share: false,
    no_folders: false,
    ignore_subdomain: false,
    hover_url: false,
    ignore_current_page: false
  })
  const [showStatus, setShowStatus] = useState(false)

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      const result = await chrome.storage.local.get([
        'no_share',
        'no_folders', 
        'ignore_subdomain',
        'hover_url',
        'ignore_current_page'
      ])
      
      setSettings({
        no_share: result.no_share === 'true',
        no_folders: result.no_folders === 'true',
        ignore_subdomain: result.ignore_subdomain === 'true',
        hover_url: result.hover_url === 'true',
        ignore_current_page: result.ignore_current_page === 'true'
      })
    } catch (error) {
      console.error('Error loading settings:', error)
    }
  }

  const saveSettings = async (newSettings: Partial<Settings>) => {
    try {
      const updatedSettings = { ...settings, ...newSettings }
      setSettings(updatedSettings)

      // Convert booleans to strings for storage (maintaining compatibility)
      const storageData: Record<string, string> = {}
      Object.entries(updatedSettings).forEach(([key, value]) => {
        storageData[key] = value.toString()
      })

      await chrome.storage.local.set(storageData)
      
      setShowStatus(true)
      setTimeout(() => setShowStatus(false), 2000)
    } catch (error) {
      console.error('Error saving settings:', error)
    }
  }

  const handleCheckboxChange = (key: keyof Settings) => {
    saveSettings({ [key]: !settings[key] })
  }

  return (
    <div className="options-container">
      <h1>About Find My Bookmarks</h1>
      <div className="container">
        <p id="status" className={showStatus ? 'active' : ''}>
          Settings were saved!
        </p>
        
        <form>
          <h2>Settings</h2>
          
          <p>
            <input 
              id="no_share" 
              type="checkbox" 
              checked={settings.no_share}
              onChange={() => handleCheckboxChange('no_share')}
            />
            <label htmlFor="no_share">
              Hide Share Links
              <span>Antisocial? Fine with us!</span>
            </label>
          </p>
          
          <p>
            <input 
              id="no_folders" 
              type="checkbox" 
              checked={settings.no_folders}
              onChange={() => handleCheckboxChange('no_folders')}
            />
            <label htmlFor="no_folders">
              Hide Folders
              <span>Disable the display of the parent folder</span>
            </label>
          </p>
          
          <p>
            <input 
              id="ignore_subdomain" 
              type="checkbox" 
              checked={settings.ignore_subdomain}
              onChange={() => handleCheckboxChange('ignore_subdomain')}
            />
            <label htmlFor="ignore_subdomain">
              Ignore Subdomain
              <span>If you bookmarked en.wikipedia.org, show those results when viewing wikipedia.org</span>
            </label>
          </p>
          
          <p>
            <input 
              id="hover_url" 
              type="checkbox" 
              checked={settings.hover_url}
              onChange={() => handleCheckboxChange('hover_url')}
            />
            <label htmlFor="hover_url">
              Show URL on Hover
              <span>Display the full URL when hovering over a bookmark link</span>
            </label>
          </p>
          
          <p>
            <input 
              id="ignore_current_page" 
              type="checkbox" 
              checked={settings.ignore_current_page}
              onChange={() => handleCheckboxChange('ignore_current_page')}
            />
            <label htmlFor="ignore_current_page">
              Ignore Current Page
              <span>If the current page is the only bookmark you have, do not show in the results</span>
            </label>
          </p>
        </form>

        <h2>Found a Bug? Want a Feature?</h2>
        <p>
          <a href="https://docs.google.com/spreadsheet/viewform?formkey=dDY4Z09NUTNzZjlsaFM4QlhLRG1HLXc6MQ" target="_blank">
            Send us a note
          </a> -- we'll let you know if it's in an upcoming release!
        </p>

        <h2>Upcoming Features</h2>
        <ul>
          <li><strike>Show the folder path to each bookmark</strike></li>
          <li><strike>Option to ignore subdomains (so that sites like en.wikipedia.org and wikipedia.org will share results)</strike></li>
          <li>Hide the plugin if the current page is the only bookmark you have</li>
          <li>Image optimization for smaller filesizes</li>
          <li>Page titles included in sharing to Twitter, Facebook and Emails</li>
          <li>Sharing options permanent for any URL</li>
        </ul>

        <h2>Extension Updates</h2>
        <h3>v2.0.0</h3>
        <ul>
          <li>Migrated to Plasmo framework</li>
          <li>Updated to Manifest V3</li>
          <li>Added multi-browser support (Firefox, Edge, Safari, Brave, Opera)</li>
          <li>Modernized codebase with TypeScript and React</li>
        </ul>
        
        <h3>v1.1.5</h3>
        <ul>
          <li>Add bookmark count to icon</li>
          <li>Set a minimum width of the popup in case social links are enabled</li>
        </ul>
        
        <h3>v1.1.4</h3>
        <ul>
          <li>Fixed options page after upgrading</li>
        </ul>
        
        <h3>v1.1.3</h3>
        <ul>
          <li>Upgrading for the new version of chrome</li>
        </ul>
        
        <h3>v1.1.2</h3>
        <ul>
          <li>Enhanced URL detection, better support for 2-part suffixes (co.uk)</li>
          <li>Using dynamic protocol for CSS and JS assets (fixes encryption warnings)</li>
        </ul>

        <footer>
          <h3>Credits</h3>
          <p>
            <strong>
              <a href="http://www.findmybookmarks.com" target="_blank">
                Find My Bookmarks
              </a>
            </strong> was brought to you by{" "}
            <a href="http://www.usabilitycounts.com" target="_blank">
              Usability Counts
            </a> and{" "}
            <a href="http://www.deansofer.com" target="_blank">
              Dean Sofer
            </a>.<br />
            For more fun, download the{" "}
            <a href="http://www.uxdrinkinggame.com" target="_blank">
              UX Drinking Game
            </a> for your iPhone or visit the{" "}
            <a href="http://www.uxdrinkinggame.com" target="_blank">
              website
            </a>.
          </p>
        </footer>
      </div>
    </div>
  )
}

export default OptionsPage