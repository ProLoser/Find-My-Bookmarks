# Bookmarked

A modern browser extension that helps you find all your related bookmarks for the current website. Now built with [Plasmo](https://plasmo.com) framework for multi-browser support.

## Features

- 🔍 **Smart Bookmark Search**: Automatically finds bookmarks related to the current domain
- 🌐 **Multi-Browser Support**: Works on Chrome, Firefox, Edge, Safari, Brave, and Opera
- 📊 **Bookmark Counter**: Shows the number of matching bookmarks in the extension badge
- ⚙️ **Customizable Settings**: Various options to customize behavior
- 🔗 **Social Sharing**: Built-in sharing to Twitter, Facebook, and email
- 📁 **Folder Display**: Optional display of bookmark parent folders
- 🎯 **Subdomain Handling**: Option to ignore subdomains for broader matching

## Installation

### Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/ProLoser/Find-My-Bookmarks.git
   cd Find-My-Bookmarks
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env and replace placeholders with actual values
   ```

4. **Build for development**
   ```bash
   yarn dev
   ```

### Browser-Specific Builds

```bash
# Chrome (Manifest V3)
yarn build:chrome

# Firefox (Manifest V2)
yarn build:firefox

# Edge (Manifest V3)
yarn build:edge

# Safari
yarn build:safari

# Opera
yarn build:opera

# Brave
yarn build:brave

# All browsers
yarn build
```

### Loading the Extension

#### Chrome/Edge/Brave
1. Open `chrome://extensions/` (or equivalent)
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select the `build/chrome-mv3-prod` folder

#### Firefox
1. Open `about:debugging`
2. Click "This Firefox"
3. Click "Load Temporary Add-on"
4. Select the `manifest.json` from `build/firefox-mv2-prod` folder

## Configuration

### Environment Variables

Create a `.env` file based on `.env.example` and configure the following placeholders:

```env
# Extension IDs for different browsers
FIREFOX_EXTENSION_ID=your-firefox-extension-id
CHROME_EXTENSION_ID=your-chrome-extension-id
EDGE_EXTENSION_ID=your-edge-extension-id
# ... etc
```

### Extension Settings

The extension provides several customizable options:

- **Hide Share Links**: Disable social sharing buttons
- **Hide Folders**: Don't display bookmark parent folders
- **Ignore Subdomain**: Treat `subdomain.example.com` same as `example.com`
- **Show URL on Hover**: Display full URLs when hovering over bookmarks
- **Ignore Current Page**: Don't show results if current page is the only bookmark

## Architecture

This extension is built using modern web technologies:

- **Framework**: [Plasmo](https://plasmo.com) - Modern browser extension framework
- **Language**: TypeScript for type safety
- **UI**: React 19 for component-based UI
- **Build Tool**: Yarn for package management
- **Manifest**: V3 for Chrome/Edge, V2 for Firefox compatibility

### Project Structure

```
src/
├── background/         # Service worker (background script)
│   └── index.ts
├── popup.tsx          # Main popup interface
├── options.tsx        # Extension options page
├── popup.css          # Popup styling
├── options.css        # Options page styling
└── assets/
    └── icons/         # Extension icons and UI assets

assets/
└── icon.png          # Main extension icon

build/                 # Generated browser-specific builds
├── chrome-mv3-prod/
├── firefox-mv2-prod/
├── edge-mv3-prod/
└── ...
```

## Development

### Adding New Features

1. Make changes to the source files in `src/`
2. Test with `yarn dev` for hot reloading
3. Build for specific browsers to test compatibility
4. Update documentation as needed

### API Compatibility

The extension handles differences between browser APIs:

- **Manifest V3** (Chrome, Edge): Uses `chrome.action` API
- **Manifest V2** (Firefox): Uses `chrome.browserAction` API
- **Storage**: Uses `chrome.storage.local` instead of localStorage for better compatibility

## Migration from v1.x

This v2.0 represents a complete rewrite with:

- ✅ Modern TypeScript/React codebase
- ✅ Plasmo framework for better development experience
- ✅ Multi-browser support out of the box
- ✅ Manifest V3 compatibility
- ✅ Better error handling and performance
- ✅ Maintainable architecture

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test across browsers
5. Submit a pull request

## License

GPL-2.0 - See [LICENSE](LICENSE) file for details.

## Credits

Created by [Dean Sofer](http://www.deansofer.com) and [Usability Counts](http://www.usabilitycounts.com).

---

**Version 2.0.0** - Modernized with Plasmo framework and multi-browser support
