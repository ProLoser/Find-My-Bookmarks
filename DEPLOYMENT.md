# Deployment Guide

This document describes how to deploy Find My Bookmarks to various browser extension stores.

## Pre-Deployment Setup

1. **Update version in package.json**
2. **Set environment variables in .env**
   - Replace all `{*_PLACEHOLDER}` values with actual IDs/keys
3. **Build all browser versions**: `yarn build:all`
4. **Package extensions**: `yarn package:all`

## Browser Store Deployments

### Chrome Web Store

1. **Build**: `yarn build:chrome`
2. **Package**: `yarn package:chrome` 
3. **Upload**: Go to [Chrome Developer Dashboard](https://chrome.google.com/webstore/devconsole/)
4. **Submit**: Upload `find-my-bookmarks-chrome.zip`

**Required Info:**
- Extension ID: Set in `CHROME_EXTENSION_ID`
- Manifest V3 compliant ✅

### Firefox Add-ons (AMO)

1. **Build**: `yarn build:firefox`
2. **Package**: `yarn package:firefox`
3. **Upload**: Go to [Firefox Developer Hub](https://addons.mozilla.org/developers/)
4. **Submit**: Upload `find-my-bookmarks-firefox.zip`

**Required Info:**
- Extension ID: Set in `FIREFOX_EXTENSION_ID` 
- Uses Manifest V2 for compatibility ✅
- Self-hosted updates supported

### Microsoft Edge Add-ons

1. **Build**: `yarn build:edge`
2. **Package**: `yarn package:edge`
3. **Upload**: Go to [Edge Developer Dashboard](https://partner.microsoft.com/dashboard/microsoftedge/)
4. **Submit**: Upload `find-my-bookmarks-edge.zip`

**Required Info:**
- Uses Manifest V3 ✅
- Similar to Chrome Web Store process

### Safari App Store

1. **Build**: `yarn build:safari`
2. **Convert**: Use Xcode to convert web extension
3. **Package**: Follow Apple's extension guidelines
4. **Submit**: Through App Store Connect

**Required Info:**
- Requires Apple Developer Account
- Additional native app wrapper needed
- Manifest V2 with Safari-specific adaptations

### Opera Add-ons

1. **Build**: `yarn build:opera`
2. **Package**: `yarn package:opera`
3. **Upload**: Go to [Opera Developer Portal](https://addons.opera.com/developer/)
4. **Submit**: Upload extension package

**Required Info:**
- Similar to Chrome Web Store
- Uses Manifest V2 ✅

### Brave (via Chrome Web Store)

Brave uses Chrome Web Store extensions by default.

1. **Use Chrome build**: Same as Chrome Web Store
2. **No separate submission needed**
3. **Testing**: Use `yarn build:brave` for Brave-specific testing

## Environment Configuration

### Required Placeholders to Replace

```env
# Browser Extension IDs
FIREFOX_EXTENSION_ID=addon-id@developer.domain
CHROME_EXTENSION_ID=32-character-chrome-id
EDGE_EXTENSION_ID=32-character-edge-id
SAFARI_EXTENSION_ID=10-character-safari-id
OPERA_EXTENSION_ID=opera-extension-id

# Optional API Keys (for future features)
TWITTER_API_KEY=your-twitter-api-key
FACEBOOK_APP_ID=your-facebook-app-id
GOOGLE_ANALYTICS_ID=UA-XXXXXXXX-X

# Update URLs (for self-hosted updates)
UPDATE_URL_CHROME=https://your-domain.com/updates/chrome
UPDATE_URL_FIREFOX=https://your-domain.com/updates/firefox
UPDATE_URL_EDGE=https://your-domain.com/updates/edge
```

### Store-Specific Requirements

#### Chrome Web Store
- **Developer fee**: $5 one-time
- **Review time**: 1-3 days
- **Manifest**: V3 required
- **Content Security Policy**: Strict CSP rules

#### Firefox Add-ons (AMO)
- **Developer fee**: Free
- **Review time**: 1-7 days (depends on complexity)
- **Manifest**: V2 supported, V3 coming
- **Source code**: May require source submission for complex extensions

#### Microsoft Edge Add-ons
- **Developer fee**: Free for individuals, $19 for companies
- **Review time**: 1-7 days
- **Manifest**: V3 preferred
- **Partnership**: Uses Microsoft Partner Center

#### Safari App Store
- **Developer fee**: $99/year Apple Developer Program
- **Review time**: 7-14 days
- **Requirements**: Native app wrapper, notarization
- **Distribution**: Through Mac App Store only

#### Opera Add-ons
- **Developer fee**: Free
- **Review time**: 1-3 days
- **Manifest**: V2/V3 both supported
- **Requirements**: Similar to Chrome

## Testing Checklist

Before deployment, test each build:

- [ ] Extension loads without errors
- [ ] Bookmark detection works correctly
- [ ] Settings persist properly
- [ ] Cross-domain functionality
- [ ] Icon displays correctly
- [ ] Popup renders properly
- [ ] Options page accessible
- [ ] Social sharing links work
- [ ] Multi-language support (if applicable)

## Rollback Plan

If issues are discovered post-deployment:

1. **Immediate**: Remove from store listings
2. **Fix**: Create hotfix in separate branch
3. **Test**: Thoroughly test hotfix
4. **Deploy**: Follow normal deployment process
5. **Monitor**: Watch for user reports

## Monitoring

After deployment, monitor:

- Extension store reviews and ratings
- Error reports through browser developer consoles
- User feedback channels
- Usage analytics (if implemented)
- Performance metrics

## Legal Compliance

Ensure compliance with:

- **Privacy policies** for each store
- **Data collection** transparency
- **User consent** for optional features
- **GDPR/CCPA** requirements if applicable
- **Store-specific policies** and guidelines