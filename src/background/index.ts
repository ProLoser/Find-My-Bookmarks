// Background service worker for Find My Bookmarks extension
// Handles bookmark counting and page action display

// Declare browser for cross-browser compatibility
declare const browser: typeof chrome;

// Cross-browser API compatibility
const API = typeof chrome !== 'undefined' ? chrome : browser;

// Cross-browser badge API wrapper to eliminate "as any" usage throughout the code
const setBadge = (tabId: number, text: string, color: string) => {
  if (API.action) {
    // Manifest v3 (Chrome/Edge)
    API.action.setBadgeText({ text, tabId });
    API.action.setBadgeBackgroundColor({ color, tabId });
  } else {
    // Manifest v2 (Firefox) - consolidated type assertion in one place
    const browserAction = (API as any).browserAction;
    if (browserAction) {
      browserAction.setBadgeText({ text, tabId });
      browserAction.setBadgeBackgroundColor({ color, tabId });
    }
  }
};

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
function checkForValidUrl(tabId: number, _changeInfo: any, tab: chrome.tabs.Tab) {
  if (!tab.url || !fullTree) return;
  
  let domain: string;
  
  // Extract domain using URL constructor for reliability
  try {
    const url = new URL(tab.url);
    domain = url.hostname.replace(/^www\./, '');
  } catch (error) {
    console.error('Invalid URL:', tab.url);
    return;
  }
  
  // Apply subdomain filtering and check ignore current page setting
  if (API.storage?.local) {
    API.storage.local.get(['ignore_subdomain', 'ignore_current_page'], function(result) {
      if (result.ignore_subdomain === 'true') {
        const pieces = domain.split('.');
        if (pieces.length > 2 && (pieces.length !== 3 || pieces[1] !== 'co' || pieces[2] !== 'uk')) {
          pieces.shift();
          domain = pieces.join('.');
        }
      }
      searchBookmarks(tabId, domain, tab.url, result.ignore_current_page === 'true');
    });
  } else {
    // Fallback for compatibility
    searchBookmarks(tabId, domain, tab.url, false);
  }
}

function searchBookmarks(tabId: number, domain: string, currentUrl: string, ignoreCurrentPage: boolean) {
  let matches = 0;
  
  function iterator(tree: chrome.bookmarks.BookmarkTreeNode[]) {
    for (const node of tree) {
      if (!node.children && node.url) {
        if (node.url.includes(domain)) {
          // Check if we should ignore exact matches for the current page
          if (ignoreCurrentPage && node.url === currentUrl) {
            continue; // Skip this bookmark as it matches the current page exactly
          }
          
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
    setBadge(tabId, badgeText, '#275786');
  } else {
    // Clear the badge if no matches
    setBadge(tabId, '', '#275786');
  }
}

export {};