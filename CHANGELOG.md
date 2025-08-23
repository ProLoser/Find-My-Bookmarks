# Changelog

All notable changes to Find My Bookmarks will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2024-08-23

### 🚀 Major Release - Complete Rewrite

This version represents a complete modernization of the Find My Bookmarks extension using the Plasmo framework.

### Added
- **Multi-Browser Support**: Native support for Chrome, Firefox, Edge, Safari, Opera, and Brave
- **Modern Architecture**: Built with Plasmo framework for better development experience
- **TypeScript**: Full TypeScript codebase for better type safety and maintainability  
- **React UI**: Modern React 19 components for popup and options interfaces
- **Manifest V3**: Support for the latest Chrome extension manifest version
- **Environment Configuration**: Placeholder system for tokens, API keys, and extension IDs
- **Automated Builds**: Yarn-based build system with browser-specific targets
- **Better Error Handling**: Improved error handling and user feedback
- **Development Mode**: Hot reloading support during development
- **Packaging Scripts**: Automated packaging for all supported browsers

### Changed
- **Framework**: Migrated from vanilla JavaScript/jQuery to Plasmo + React + TypeScript
- **Build System**: Replaced shell scripts with modern Yarn workspace
- **Storage API**: Migrated from `localStorage` to `chrome.storage.local` for better compatibility
- **Action API**: Updated from `chrome.pageAction` to `chrome.action` (with MV2 fallback)
- **File Structure**: Reorganized into modern `src/` based structure
- **Settings**: Enhanced settings interface with better state management
- **Icons**: Improved icon generation and sizing across browsers
- **Documentation**: Comprehensive documentation including deployment and migration guides

### Improved
- **Performance**: Faster bookmark searching and UI rendering
- **Reliability**: Better error handling and edge case management
- **Maintainability**: Modern code architecture with TypeScript
- **User Experience**: Cleaner UI with better responsive design
- **Developer Experience**: Hot reloading, type checking, and automated testing

### Browser Compatibility
- **Chrome**: ✅ Manifest V3 (Recommended)
- **Firefox**: ✅ Manifest V2 (Full compatibility)
- **Edge**: ✅ Manifest V3 (New!)
- **Safari**: ✅ Partial support (New!)
- **Opera**: ✅ Full support (New!)
- **Brave**: ✅ Full support (New!)

### Migration Required
- ⚠️ **Breaking Change**: Settings will need to be reconfigured
- ⚠️ **Breaking Change**: Complete architecture change - not backward compatible
- 📖 See [MIGRATION.md](MIGRATION.md) for detailed migration instructions

---

## [1.1.5] - Previous Version

### Added
- Add bookmark count to icon
- Set minimum width of popup when social links are enabled

### Fixed
- Various UI improvements and bug fixes

## [1.1.4] - Previous Version

### Fixed
- Fixed options page after upgrading

## [1.1.3] - Previous Version

### Changed
- Upgrading for new version of Chrome

## [1.1.2] - Previous Version

### Added
- Enhanced URL detection with better support for 2-part suffixes (co.uk)

### Changed
- Using dynamic protocol for CSS and JS assets (fixes encryption warnings)

## [1.1.1] - Previous Version

### Added
- 'Hide Share Links' option
- Parent Folder display with 'Hide Folders' option

### Fixed
- Installation issues resolved

## [1.1.0] - Previous Version

### Added
- 'Ignore Subdomain' option functionality
- 'Hide domain from hover URL' option

### Changed
- Cleaned up file structure
- Stylistic improvements

## [1.0.8] - Previous Version

### Changed
- Small stylistic tweaks

## [1.0.7] - Previous Version

### Added
- Option to show URL of link on hover

## [1.0.6] - Previous Version

### Added
- Working options link

### Fixed
- Small visual bug with delete functionality

## [1.0.5] - Previous Version

### Added
- Domain-level actions (email/share/tweet)
- Email action functionality
- Clickable row functionality
- URL tooltips for bookmarks

## [1.0.4] - Previous Version

### Changed
- Moved footer content to options page

---

## Development Information

### Version Numbering
- **Major** (x.0.0): Breaking changes, architectural changes
- **Minor** (1.x.0): New features, new browser support
- **Patch** (1.1.x): Bug fixes, small improvements

### Release Process
1. Update version in `package.json`
2. Update `CHANGELOG.md` with changes
3. Run full test suite: `yarn test`
4. Build all browsers: `yarn build:all`
5. Test builds in actual browsers
6. Create release tags
7. Deploy to browser stores

### Browser Release Schedule
- **Chrome Web Store**: 1-3 days review
- **Firefox Add-ons**: 1-7 days review  
- **Microsoft Edge**: 1-7 days review
- **Safari App Store**: 7-14 days review
- **Opera Add-ons**: 1-3 days review