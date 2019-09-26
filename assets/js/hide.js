var colours = ["#000000", null],
    hidden_index, max_index;

function randomArray(min, max) {
  return (new Array(max-min))
    .join(',').split(',')
    .map(function(v,i){ return [Math.random(), min + i]; })
    .sort().map(function(v) { return v[1]; });
}

jQuery(document).ready(function(){
    hidden_index = max_index = 0;
    var div = $('#text-content');
    var lines = div.text().split('\n');
    div.html('');
    for(var l=0; l<lines.length; l++) {
        if (lines[l]) {
            var line_div = $('<div class="line">');
            var words = lines[l].split(' ').filter(x => x);
            order = randomArray(0, words.length)
            max_index = Math.max(max_index, words.length)
            for(var w=0; w<words.length; w++) {
                var span = $('<span class="word" order=' + order[w] +'></span>')
                span.append(words[w] + ' ')
                line_div.append(span)
            }
            div.append(line_div);
        }
        if (l>0) {
            div.append($('<br />'));
        }
    }

    $('#hide').bind('click', function(){
        $('.word[order=' + hidden_index + ']').each(function (index, value) {
            $(this).addClass("hidden");
        });
        hidden_index = Math.min(hidden_index + 1, max_index)
    });
    $('#show').bind('click', function(){
        hidden_index = Math.max(hidden_index - 1, 0);
        $('.word[order=' + hidden_index + ']').each(function (index, value) {
            $(this).removeClass("hidden");
        });
    });
});