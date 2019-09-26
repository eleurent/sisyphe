var colours = ["#000000", null],
    idx;
jQuery(document).ready(function(){
	var div = $('#text-content');
	var lines = div.text().split('\n');
    div.html('');
	for(var l=0; l<lines.length; l++) {
		if (lines[l]) {
		var span = $('<div class="line">' + lines[l] + ' </div>').css("display", "inline-block")
		div.append(span);
		}
		if (l>0) {
			div.append($('<br />'));
		}
	}
	$('#hide').bind('click', function(){
	    $('.line:not(.hidden)').each(function (index, value) {
	 	    if (Math.random() < 0.2)
		        $(this).addClass("hidden");
	    });
	});
	$('#show').bind('click', function(){
	    $('.hidden').each(function (index, value) {
	 	    if (Math.random() < 0.2)
		        $(this).removeClass("hidden");
	    });
	});
});