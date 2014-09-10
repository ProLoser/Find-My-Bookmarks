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
	var matches = 0;
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
					// Display the action
					chrome.pageAction.show(tabId);
					matches++;
					if (matches > 9) {
						matches = '9+';
						chrome.pageAction.setIcon({imageData: draw(10, 0, matches), tabId: tabId});
						break;
					} else {
						chrome.pageAction.setIcon({imageData: draw(10, 0, matches), tabId: tabId});
					}
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

var img = new Image();
img.src = chrome.extension.getURL("img/icon.png");

function draw(starty, startx, text) {
	var canvas = document.createElement('canvas');
	var context = canvas.getContext('2d');
	context.drawImage(img,0,0,18,20);
	context.beginPath();
	context.arc(9, 10, 6, 0, 2 * Math.PI, false);
	context.fillStyle = 'rgba(255,255,255,.6)';
	context.fill();
	context.fillStyle = "#275786";
	context.font = "bold 14px Arial";
	context.fillText(text,5,15);
	return context.getImageData(0, 0, 19, 19);
}