echo 'Packaging extension...'
echo
zip -ur9v -i='*.json' -i='*.css' -i='*.html' -i='*.png' -i='*.js' -x='assets/*' FindMyBookmarks.zip .
echo
echo 'Results saved to "FindMyBookmarks.zip"'