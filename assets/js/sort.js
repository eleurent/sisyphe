$(function() {
  let searchParams = new URLSearchParams(window.location.search)
  if (searchParams.has('sort')) {
    let param = searchParams.get('sort')
    let order = searchParams.get('order')
    order = order == "desc" ? -1 : 1;
    var $li = $('ul#texts li').clone();
    var mySort = function(a, b) {
        var objA = $(a).find('.'+param).text()
        var objB = $(b).find('.'+param).text()
        output = objA.localeCompare(objB);
        return output * order
    }
    $li = $li.sort(mySort);
    $('ul#texts').html($li)
  }
});