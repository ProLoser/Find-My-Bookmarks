// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var fullTree;

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);
chrome.bookmarks.onCreated.addListener(refreshTree);
chrome.bookmarks.onChanged.addListener(refreshTree);
chrome.bookmarks.onImportEnded.addListener(refreshTree);
chrome.bookmarks.onRemoved.addListener(refreshTree);
refreshTree();

// Called when the url of a tab changes.
function checkForValidUrl(tabId, changeInfo, tab) {	
	// var domain = tab.url.match(/:\/\/(.[^/]+)/)[1].replace('www.','');
	
	var domain;
	if (localStorage["ignore_subdomain"]) {
		domain = tab.url.split(/\/+/g)[1].replace('www.','');
	} else {
		domain = tab.url.split(/\/+/g)[1].replace('www.','');
	}
	iterator(fullTree);
	function iterator(tree) {
		var l = tree.length;
		while (l--) {
			if (tree[l].children === undefined) {	
				if (tree[l].url.search(domain) !== -1) {
					chrome.pageAction.show(tabId);
				}
			} else {
				iterator(tree[l].children);
			}
		}
	}
}

function refreshTree() {
	chrome.bookmarks.getTree(function(bookmarkTree){
		fullTree = bookmarkTree;
	});
}