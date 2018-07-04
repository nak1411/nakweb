/* global $ alert */

//Fetch stored data on page load
$(window).ready(function () {
  $('.item-list').html(localStorage.getItem('entry'));
});

// Add text from input to list after Enter is pressed
$('input[name=hike-entry]').keypress(function (event) {
  if (event.which === 13) {
    inputText = $(this).val();
    if (inputText !== '') {
      $('.item-list').append('<li><span><i class=trash></i></span>' + inputText + '</li>');
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
    $('.item-list').append('<li><span><i class=trash></i></span>' +
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

// Autosave entered data
setInterval(function () {
  localStorage.setItem('entry', $('.item-list').html());
}, 5000);

// Save data on close
$(window).on('beforeunload', function () {
  localStorage.setItem('entry', $('.item-list').html());
});

//TODO: Create functionality for each input
