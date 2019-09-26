var hidden_index, max_index;

function randomArray(min, max) {
  return (new Array(max-min))
    .join(',').split(',')
    .map(function(v,i){ return [Math.random(), min + i]; })
    .sort().map(function(v) { return v[1]; });
}

function extractWords(line) {
    var words = line.split(' ').filter(x => x);
    var spans = []
    var order = randomArray(0, words.length)
    max_index = Math.max(max_index, words.length)
    for(var w=0; w<words.length; w++) {
        var span = $('<span class="word" order=' + order[w] +'></span>')
        span.append(words[w] + ' ')
        spans.push(span)
    }
    return spans
}

function extractLines(div) {
    var lines = div.text().split('\n');
    div.html('');
    for(var l=0; l<lines.length; l++) {
        if (lines[l]) {
            var line_div = $('<div class="line">');
            var words = extractWords(lines[l])
            for (var w=0; w<words.length; w++)
                line_div.append(words[w])
            div.append(line_div);
        }
        if (l>0) {
            div.append($('<br />'));
        }
    }
}

function reorderLines() {
    $('.line').each(function() {
        var words = $(this).find('.word');
        var order = randomArray(0, words.length)
        words.each(function(index) {
            $(this).attr("order", order[index]);
        });
    });
}

jQuery(document).ready(function(){
    // Initialization
    hidden_index = max_index = 0;
    // Extract words and lines
    var div = $('#text-content');
    extractLines(div)
    // Hide words and increase index
    $('#hide').bind('click', function(){
        $('.word[order=' + hidden_index + ']').each(function (index, value) {
            $(this).addClass("hidden");
        });
        hidden_index = Math.min(hidden_index + 1, max_index)
    });
    // Show words and decrease index
    $('#show').bind('click', function(){
        hidden_index = Math.max(hidden_index - 1, 0);
        $('.word[order=' + hidden_index + ']').each(function (index, value) {
            $(this).removeClass("hidden");
        });
        // Scramble the lines hiding order again when every word is revealed
        if (hidden_index == 0)
            reorderLines()
    });
});