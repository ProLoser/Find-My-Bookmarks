function menu(url, title, id) {
	if (title === undefined) {
		title = url;
	}
	result = '<div class="menu"><ul>';
	if (id) {
		result += '<li><a class="delete" id="' + id + '" title="Delete this bookmark">Delete</a></li>';
	}
	if (localStorage["no_share"] !== 'true') {
		result += '<li><a class="twitter" href="https://twitter.com/home?status=' + encodeURI(url) + '" target="_blank" title="Share on Twitter">Tweet</a></li>';
		result += '<li><a class="facebook" href="http://www.facebook.com/sharer.php?u=' + url + '&t=' + title + '" target="_blank" title="Share on Facebook">Share</a></li>';
		result += '<li><a class="email" href="mailto:?subject=Checkout this site: ' + title + '&body=' + url + '" target="_blank" title="Email to a Friend">Email</a></li>';
	}
	if (!id) {
		result += '<li><a class="options" href="options.html" target="_blank" title="Settings">Settings</a></li>';		
	}
	result += '</ul></div>';
	
	return result;
}
$(document).ready(function() {
	
// ---
// Show list

	chrome.bookmarks.getTree(function(bookmarkTree){
		chrome.tabs.getSelected(null, function(activeTab){
			var $results = $('<ul></ul>');
			var i = 0;
			
			var url, pieces,
				domain = activeTab.url.split(/^((\w+:)?\/\/)?(www\.)?([\w|\.]+)/gi)[4];
			if (localStorage["ignore_subdomain"] === 'true') {
				pieces = domain.split('.');
				if (pieces.length > 2 && (pieces.length !== 3 || pieces[1] !== 'co' || pieces[2] !== 'uk')) {
					pieces.shift();
					domain = pieces.join('.');
				}
			}
			
			iterator(bookmarkTree);
			function iterator(tree, parent) {
				$.each(tree, function(i, value) {
					if (value.children === undefined) {
						if ((value.url.search(domain) !== -1) && (value.title > "")) {
							strTitle = value.title;
							row = '<li>' + menu(value.url, value.title, value.id) + '<a class="url" href="' + value.url + '" target="_blank" title="' + value.url + '">';
							if (localStorage['hover_url'] === 'true') {
								url = value.url;
								if (localStorage['path_only'] === 'true') {
									url = url.substr(url.search(domain) + domain.length);
								}
								row += '<span class="title">' + strTitle + '</span><span class="link">' + url + '</span>';
							} else {
								row += strTitle;
							}
							
							if (localStorage['no_folders'] !== 'true') {
								 row += '<em>' + parent + '</em>';
							}
							
							row += '</a></li>';

							$results.append(row);
							i++;
			
						}
					} else {
						iterator(value.children, value.title);
					}
				});
			}
			
			$('h2 strong').append(domain);
			$('h2').append(menu(domain));
			$('.list').append($results);
		});
	});
		
// ---
// Remove bookmark

	$('.list').delegate('.delete', 'click', function(el){
		el.preventDefault();
		var $this = $(this);
		chrome.bookmarks.remove($this.attr('id'), function(){
			$this.closest('.menu').parent('li').remove();
		});
	});

// ---
// Show Url on Hover
	if (localStorage['hover_url'] === 'true') {
		$('.list').addClass('hoverUrl');
	}

// ---
// Show Parent Folder
	if (localStorage['no_folders'] !== 'true') {
		$('.list').addClass('folders');
	}
});