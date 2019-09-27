var hidden_index = 0, max_index = 0;

function wrapLines(div) {
    div.children('p').each(function() {
        $(this).contents().filter(function() {
            return this.nodeType == 3; // filter <br>
        }).wrap('<span class="line">');
    });
    // handle strong and emph, but only for whole lines
    div.find('strong, em').wrap('<span class="line">');
}

function wrapWords() {
    $('.line').each(function() {
        var words = $(this).html().split(' ').filter(x => x),
            result = [];
        for (var i = 0; i < words.length; i++ ) {
            result[i] = '<span class="word">' + words[i] + '</span>';
        }
        $(this).html(result.join(' '));
    });
}

function orderWords() {
    $('.line').each(function() {
        var words = $(this).find('.word');
        max_index = Math.max(words.length, max_index);
        var order = randomArray(0, words.length)
        words.each(function(index) {
            $(this).attr("order", order[index]);
        });
    });
}

function randomArray(min, max) {
  return (new Array(max-min))
    .join(',').split(',')
    .map(function(v,i){ return [Math.random(), min + i]; })
    .sort().map(function(v) { return v[1]; });
}


jQuery(document).ready(function(){
    // Extract words and lines
    var div = $('#text-content');
    wrapLines(div)
    wrapWords()

    // Hide words and increase index
    $('#hide').bind('click', function(){
        // New shuffling
        if (hidden_index == 0)
            orderWords()
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
    });
});