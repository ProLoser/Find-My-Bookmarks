// Background service worker for Find My Bookmarks extension
// Handles bookmark counting and page action display

const API = chrome || browser;

let fullTree: chrome.bookmarks.BookmarkTreeNode[];

// Listen for tab updates and bookmark changes
API.tabs.onUpdated.addListener(checkForValidUrl);
API.bookmarks.onCreated.addListener(refreshTree);
API.bookmarks.onChanged.addListener(refreshTree);
API.bookmarks.onImportEnded.addListener(refreshTree);
API.bookmarks.onRemoved.addListener(refreshTree);

// Initialize bookmark tree
refreshTree();

function refreshTree() {
  API.bookmarks.getTree(function(bookmarkTree) {
    fullTree = bookmarkTree;
  });
}

// Called when the url of a tab changes
function checkForValidUrl(tabId: number, changeInfo: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab) {
  if (!tab.url || !fullTree) return;
  
  let domain: string;
  
  // Extract domain from URL
  const urlParts = tab.url.split(/\/+/g);
  if (urlParts.length > 1) {
    domain = urlParts[1].replace('www.', '');
  } else {
    return;
  }
  
  // Apply subdomain filtering if enabled
  if (API.storage?.local) {
    API.storage.local.get(['ignore_subdomain'], function(result) {
      if (result.ignore_subdomain === 'true') {
        const pieces = domain.split('.');
        if (pieces.length > 2 && (pieces.length !== 3 || pieces[1] !== 'co' || pieces[2] !== 'uk')) {
          pieces.shift();
          domain = pieces.join('.');
        }
      }
      searchBookmarks(tabId, domain);
    });
  } else {
    // Fallback for compatibility
    searchBookmarks(tabId, domain);
  }
}

function searchBookmarks(tabId: number, domain: string) {
  let matches = 0;
  
  function iterator(tree: chrome.bookmarks.BookmarkTreeNode[]) {
    for (const node of tree) {
      if (!node.children && node.url) {
        if (node.url.includes(domain)) {
          matches++;
          if (matches > 9) {
            matches = 9;
            break;
          }
        }
      } else if (node.children) {
        iterator(node.children);
        if (matches > 9) break;
      }
    }
  }
  
  iterator(fullTree);
  
  if (matches > 0) {
    const badgeText = matches > 9 ? '9+' : matches.toString();
    
    // Use API.action for manifest v3, API.browserAction for manifest v2
    if (API.action) {
      // Manifest v3
      API.action.show(tabId);
      API.action.setBadgeText({ text: badgeText, tabId: tabId });
      API.action.setBadgeBackgroundColor({ color: '#275786', tabId: tabId });
    } else if ((API as any).browserAction) {
      // Manifest v2 fallback
      (API as any).browserAction.show(tabId);
      (API as any).browserAction.setBadgeText({ text: badgeText, tabId: tabId });
      (API as any).browserAction.setBadgeBackgroundColor({ color: '#275786', tabId: tabId });
    }
  } else {
    // Hide action when no matches
    if (API.action) {
      API.action.hide(tabId);
    } else if ((API as any).browserAction) {
      (API as any).browserAction.hide(tabId);
    }
  }
}

export {};