/* global $ alert */

// Add text from input to list after Enter is pressed
$('input[name=hike-entry]').keypress(function (event) {
  if (event.which === 13) {
    var inputText = $(this).val();
    if (inputText !== '') {
      $('.item-list').append('<li><span><i class=image></i></span>' +
                           inputText + '</li>');
      $(this).val('');
    } else {
      alert('Enter Something');
    }
  }
});

// Add text from input to list afer "+" button is pressed
$('button').on('click', function () {
  var inputText = $('input[name=hike-entry]').val();
  if (inputText !== '') {
    $('.item-list').append('<li><span><i class=image></i></span>' +
                           inputText + '</li>');
    $('input[name=hike-entry]').val('');
  } else {
    alert('Enter Something');
  }
});

// Delete item off list
$('.item-list').on('click', '.image', function (event) {
  event.stopPropagation();
  $(this).closest('li').remove();
});
