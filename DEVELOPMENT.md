# Development Setup Guide

This guide helps developers set up a local development environment for Find My Bookmarks v2.0.

## Prerequisites

- **Node.js** 18.x or later
- **Yarn** 1.22.x or later
- **Git** for version control
- A modern web browser for testing

## Initial Setup

### 1. Clone the Repository

```bash
git clone https://github.com/ProLoser/Find-My-Bookmarks.git
cd Find-My-Bookmarks
```

### 2. Install Dependencies

```bash
yarn install
```

This will install:
- Plasmo framework
- React and React DOM
- TypeScript
- Chrome extension types
- All build dependencies

### 3. Environment Configuration

```bash
cp .env.example .env
```

Edit `.env` and replace placeholders with your values:

```env
# Required for Firefox development
FIREFOX_EXTENSION_ID=your-dev-extension-id@example.com

# Optional for testing other browsers
CHROME_EXTENSION_ID=your-chrome-dev-id
EDGE_EXTENSION_ID=your-edge-dev-id
# ... etc
```

## Development Workflow

### 1. Development Mode

Start the development server with hot reloading:

```bash
yarn dev
```

This will:
- Build the extension for Chrome MV3
- Start development server
- Enable hot reloading
- Watch for file changes

### 2. Load Extension in Browser

#### Chrome/Edge/Brave
1. Open `chrome://extensions/` (or equivalent)
2. Enable "Developer mode" 
3. Click "Load unpacked"
4. Select the `build/chrome-mv3-dev` directory

#### Firefox
1. Open `about:debugging`
2. Click "This Firefox"
3. Click "Load Temporary Add-on"
4. Navigate to `build/firefox-mv2-dev` and select `manifest.json`

### 3. Making Changes

The development server supports hot reloading for most changes:

- **React components** (`src/*.tsx`): Auto-reload
- **CSS files** (`src/*.css`): Auto-reload  
- **Background script** (`src/background/index.ts`): Requires extension reload
- **Manifest changes**: Requires extension reload

### 4. Testing Changes

When you make changes:

1. **UI Changes**: Should reload automatically
2. **Background Changes**: Click extension reload button
3. **Manifest Changes**: Reload extension manually

## Building for Production

### Build All Browsers

```bash
yarn build:all
```

### Build Specific Browser

```bash
yarn build:chrome    # Chrome MV3
yarn build:firefox   # Firefox MV2  
yarn build:edge      # Edge MV3
yarn build:safari    # Safari
yarn build:opera     # Opera
yarn build:brave     # Brave
```

### Package for Distribution

```bash
yarn package:all     # Package all browsers
yarn package:chrome  # Package Chrome only
yarn package:firefox # Package Firefox only
# ... etc
```

## Project Structure

```
src/
├── background/           # Background service worker
│   └── index.ts         # Main background script
├── popup.tsx            # Main popup component
├── options.tsx          # Settings/options page
├── popup.css            # Popup styles
├── options.css          # Options page styles
└── assets/              # Static assets
    └── icons/           # Extension icons

assets/
└── icon.png            # Main extension icon (used by Plasmo)

build/                   # Generated builds (git-ignored)
├── chrome-mv3-dev/     # Chrome development build
├── chrome-mv3-prod/    # Chrome production build
├── firefox-mv2-dev/    # Firefox development build
├── firefox-mv2-prod/   # Firefox production build
└── ...                 # Other browser builds

legacy/                  # Legacy v1.x files (deprecated)
├── manifest.json       # Old manifest
├── js/                 # Old JavaScript files
└── css/                # Old stylesheets

*.zip                   # Generated packages (git-ignored)
```

## Development Tips

### Hot Reloading

- **Popup/Options**: Changes reload automatically
- **Background**: Requires manual extension reload
- **Manifest**: Requires manual extension reload

### Debugging

#### Chrome DevTools
1. Right-click extension icon → "Inspect popup"
2. For background: `chrome://extensions/` → Extension details → "Inspect views: background page"

#### Firefox DevTools  
1. `about:debugging` → Extension → "Inspect"
2. Background debugging available in browser console

### TypeScript

The project uses strict TypeScript:

```bash
# Type checking (automatically runs during build)
npx tsc --noEmit

# Type checking in watch mode
npx tsc --noEmit --watch
```

### Browser API Compatibility

The codebase handles browser differences:

```typescript
// Background script handles MV2/MV3 differences
if (chrome.action) {
  // Manifest V3
  chrome.action.setBadgeText({...})
} else if (chrome.browserAction) {
  // Manifest V2 fallback
  chrome.browserAction.setBadgeText({...})
}
```

## Testing

### Manual Testing

Test in multiple browsers:

1. **Chrome**: Latest stable + dev channel
2. **Firefox**: Latest stable + developer edition  
3. **Edge**: Latest stable
4. **Safari**: Latest (if on macOS)

### Test Scenarios

- [ ] Extension loads without errors
- [ ] Popup displays bookmark count correctly
- [ ] Settings save and persist
- [ ] Social sharing links work
- [ ] Cross-domain bookmark detection
- [ ] Badge updates on tab changes
- [ ] Options page accessible and functional

### Browser-Specific Testing

#### Firefox-Specific
- Test with `browser.*` vs `chrome.*` APIs
- Verify MV2 compatibility
- Test permissions handling

#### Safari-Specific  
- Test extension conversion workflow
- Verify native app wrapper compatibility

## Troubleshooting

### Common Issues

#### "Extension failed to load"
- Check browser console for errors
- Verify manifest syntax
- Ensure all required permissions

#### "Module not found"
- Run `yarn install` again
- Clear `node_modules` and reinstall
- Check TypeScript imports

#### "Hot reload not working"
- Restart development server
- Clear browser cache
- Reload extension manually

#### "Build fails"
- Check TypeScript errors: `npx tsc --noEmit`
- Verify all imports are correct
- Ensure all dependencies installed

### Debug Mode

Enable debug logging:

```typescript
// Add to background script for verbose logging
console.log('Debug: Extension loaded')
```

### Clean Build

If builds are acting strange:

```bash
# Clean builds
rm -rf build/
rm -rf .plasmo/
rm -rf node_modules/

# Reinstall and rebuild
yarn install
yarn build:all
```

## Contributing

### Code Style

- **TypeScript**: Strict mode enabled
- **React**: Functional components with hooks
- **CSS**: Component-scoped stylesheets
- **Naming**: camelCase for variables, PascalCase for components

### Pull Request Process

1. Fork the repository
2. Create feature branch: `git checkout -b feature/your-feature`
3. Make changes and test thoroughly
4. Update documentation if needed
5. Submit pull request with detailed description

### Commit Messages

Use conventional commits:

```
feat: add Firefox MV2 support
fix: resolve popup layout issue
docs: update development guide
chore: upgrade dependencies
```

## Resources

- [Plasmo Documentation](https://docs.plasmo.com/)
- [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/)
- [Firefox Extension Documentation](https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)