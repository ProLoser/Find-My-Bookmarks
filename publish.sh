#!/bin/bash

echo "⚠️  DEPRECATED: This build script is for the legacy v1.x version"
echo "🚀 For v2.0, use the modern Yarn-based build system:"
echo ""
echo "   yarn build:all      # Build for all browsers"
echo "   yarn package:all    # Package for distribution"
echo ""
echo "📖 See README.md for migration instructions"
echo ""
echo "🔧 If you need to build the legacy version:"
echo ""

# Legacy build process
cd legacy
echo 'Packaging legacy extension...'
echo
zip -ur9v -i='*.json' -i='*.css' -i='*.html' -i='*.png' -i='*.js' -x='assets/*' ../FindMyBookmarks-legacy.zip .
echo
echo 'Legacy results saved to "FindMyBookmarks-legacy.zip"'
echo ""
echo "⚠️  NOTE: Legacy version has limited browser support"
echo "🎯 Consider migrating to v2.0 for full multi-browser support"