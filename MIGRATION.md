# Migration Guide: v1.x → v2.0

This guide helps users and developers migrate from the legacy v1.x version to the new v2.0 Plasmo-based version.

## For End Users

### What's New in v2.0

- ✅ **Modern Architecture**: Rebuilt with latest web technologies
- ✅ **Better Performance**: Faster bookmark searching and loading
- ✅ **Multi-Browser Support**: Works across Chrome, Firefox, Edge, Safari, Opera, and Brave
- ✅ **Enhanced Security**: Updated to Manifest V3 for better security
- ✅ **Improved UI**: Cleaner, more responsive interface
- ✅ **Better Settings**: More reliable settings storage

### Installation

1. **Uninstall old version** (if you have v1.x installed)
2. **Install v2.0** from your browser's extension store
3. **Reconfigure settings** (settings from v1.x won't carry over automatically)

### Settings Migration

Your settings will need to be reconfigured as the storage format has changed:

| v1.x Setting | v2.0 Setting | Migration |
|--------------|--------------|-----------|
| Hide Share Links | ✅ Same | Manual reconfiguration needed |
| Hide Folders | ✅ Same | Manual reconfiguration needed |
| Ignore Subdomain | ✅ Same | Manual reconfiguration needed |
| Show URL on Hover | ✅ Same | Manual reconfiguration needed |
| Ignore Current Page | ✅ Same | Manual reconfiguration needed |

### What Changed

- **Storage**: Settings now use `chrome.storage.local` instead of `localStorage`
- **Manifest**: Updated to V3 for Chrome/Edge, V2 maintained for Firefox
- **UI Framework**: Changed from jQuery to React
- **Icons**: Improved icon quality and sizing

## For Developers

### Architecture Changes

#### Before (v1.x)
```
js/
├── background.js      # Plain JavaScript
├── popup.js          # jQuery-based UI
├── options.js        # jQuery-based settings
└── jquery.min.js     # jQuery dependency

css/
├── popup.css         # Plain CSS
└── options.css       # Plain CSS

manifest.json         # Manifest V2 only
```

#### After (v2.0)
```
src/
├── background/
│   └── index.ts      # TypeScript service worker
├── popup.tsx         # React component
├── options.tsx       # React component
├── popup.css         # Component-specific CSS
└── options.css       # Component-specific CSS

package.json          # Yarn workspace
tsconfig.json         # TypeScript config
.env.example          # Environment template
```

### Code Migration Examples

#### Background Script
```javascript
// v1.x - background.js
chrome.tabs.onUpdated.addListener(checkForValidUrl);
chrome.pageAction.show(tabId);
chrome.pageAction.setIcon({imageData: draw(10, 0, matches), tabId: tabId});
```

```typescript
// v2.0 - src/background/index.ts
chrome.tabs.onUpdated.addListener(checkForValidUrl);
// Handles both MV2 and MV3
if (chrome.action) {
  chrome.action.show(tabId);
  chrome.action.setBadgeText({ text: badgeText, tabId: tabId });
} else if ((chrome as any).browserAction) {
  (chrome as any).browserAction.show(tabId);
  (chrome as any).browserAction.setBadgeText({ text: badgeText, tabId: tabId });
}
```

#### Popup UI
```javascript
// v1.x - popup.js
$(document).ready(function() {
  chrome.bookmarks.getTree(function(bookmarkTree){
    chrome.tabs.getSelected(null, function(activeTab){
      // jQuery DOM manipulation
    });
  });
});
```

```tsx
// v2.0 - src/popup.tsx
function Popup() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  
  useEffect(() => {
    loadBookmarks()
  }, [])

  const loadBookmarks = async () => {
    const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true })
    const bookmarkTree = await chrome.bookmarks.getTree()
    // React state management
  }
  
  return (
    <div className="popup-container">
      {/* JSX UI */}
    </div>
  )
}
```

#### Settings Storage
```javascript
// v1.x - options.js
localStorage[fieldId] = fieldValue;
var value = localStorage[fieldId];
```

```typescript
// v2.0 - src/options.tsx
await chrome.storage.local.set({ [key]: value });
const result = await chrome.storage.local.get([key]);
```

### Build System Migration

#### Before (v1.x)
```bash
# Manual file management
# Basic shell script for packaging
./publish.sh
```

#### After (v2.0)
```bash
# Modern build system with Plasmo
yarn install
yarn build:all      # Build for all browsers
yarn package:all    # Package for distribution
```

### Dependencies

#### v1.x Dependencies
- jQuery 1.x
- Manual CSS compilation (SCSS)
- No build system
- No type checking

#### v2.0 Dependencies
- React 19
- TypeScript
- Plasmo framework
- Yarn package manager
- Automated builds

### Browser Compatibility

| Browser | v1.x Support | v2.0 Support | Manifest |
|---------|--------------|--------------|----------|
| Chrome | ✅ Manual | ✅ Automated | V2 → V3 |
| Firefox | ❌ Limited | ✅ Full | V2 |
| Edge | ❌ No | ✅ Full | V3 |
| Safari | ❌ No | ✅ Partial | V2 |
| Opera | ❌ No | ✅ Full | V2 |
| Brave | ❌ No | ✅ Full | V3 |

### Development Workflow

#### v1.x Workflow
1. Edit JavaScript files
2. Manually test in Chrome
3. Run `publish.sh` to create ZIP
4. Manually upload to Chrome Web Store

#### v2.0 Workflow
1. Edit TypeScript/React files
2. Run `yarn dev` for hot reloading
3. Test across multiple browsers with `yarn build:all`
4. Use automated packaging with `yarn package:all`
5. Deploy to multiple stores

### Breaking Changes

1. **API Changes**: 
   - `localStorage` → `chrome.storage.local`
   - `chrome.pageAction` → `chrome.action` (MV3) or `chrome.browserAction` (MV2)

2. **File Structure**: Complete reorganization

3. **Build Process**: Requires Node.js/Yarn

4. **Dependencies**: React/TypeScript required for development

### Migration Checklist

For developers migrating:

- [ ] Install Node.js and Yarn
- [ ] Set up new project structure
- [ ] Migrate JavaScript to TypeScript
- [ ] Convert jQuery UI to React components
- [ ] Update storage API calls
- [ ] Test across all target browsers
- [ ] Update build/deployment scripts
- [ ] Update documentation

## Backward Compatibility

v2.0 is **not backward compatible** with v1.x:

- **Settings**: Need manual reconfiguration
- **APIs**: Storage format changed
- **Build**: Completely different build system
- **Dependencies**: New runtime requirements

## Support

- **v1.x**: Legacy support only (critical bugs)
- **v2.0**: Active development and support

For migration help, please open an issue on GitHub.