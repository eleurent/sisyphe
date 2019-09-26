var colours = ["#000000", null],
    idx;
jQuery(document).ready(function(){
	var div = $('#text-content');
	var lines = div.text().split('\n');
    div.html('');
	for(var l=0; l<lines.length; l++) {
		if (lines[l]) {
			var line_div = $('<div class="line">');
			var words = lines[l].split(' ')
			for(var w=0; w<words.length; w++) {
				if (words[w]) {
					var span = $('<span class="word"></span>')
					span.append(words[w] + ' ')
					line_div.append(span)
				}
			}
			div.append(line_div);
		}
		if (l>0) {
			div.append($('<br />'));
		}
	}
	$('#hide').bind('click', function(){
	    $('.word:not(.hidden)').each(function (index, value) {
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