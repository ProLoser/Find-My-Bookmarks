$(document).ready(function(){
	restore();
	$('input, select').bind('change', function(){
		save();
	});
});

// Saves options to localStorage.
function save() {
	$('input, select').each(function(index, field){
		$field = $(field);
		localStorage[$field.attr('id')] = $field.is(':checked');
	});
	// Update status to let user know options were saved.
	var status = $("#status");
	status.addClass('active');
	setTimeout(function() {
		status.removeClass('active');
	}, 2000);
}

// Restores select box state to saved value from localStorage.
function restore() {
	$('input, select').each(function(index, field){
		$field = $(field);
		$field.attr('checked', localStorage[$field.attr('id')] === 'true');
	});
}