/* global $ alert */

var UIsetup = (function () {
  var DOMstrings = {
    list: '.item-list',
    storageEntry: 'entry',
    button: '#add-btn',
    inputName: 'input[name=hike-entry]',
    inputLocation: 'input[name=location-entry]',
    inputLength: 'input[name=length-entry]',
    inputElevation: 'input[name=elevation-entry]',
    trashIcon: '.trash',
  };

  return {
    getDOMstrings: function () {
      return DOMstrings;
    },
  };

})();

var controller = (function () {
  var DOM = UIsetup.getDOMstrings();

  /**
   * Set up event handling for adding items
   **/
  var addItems = function () {

    // Add text from input to list after Enter is pressed
    $(document).on('keypress', function (event) {
      if (event.keyCode === 13 || event.which === 13) {
        if ($(DOM.inputName).val() !== '') {
          appendItem();
          $(DOM.inputName).val('');
        } else {
          alert('Enter Something');
        }
      }
    });

    // Add text from input to list after "+" button is pressed
    $(DOM.button).on('click', function () {
      if ($(DOM.inputName).val() !== '') {
        appendItem();
        $(DOM.inputName).val('');
      } else {
        alert('Enter Something');
      }
    });

    // String to be appended to list
    var appendItem = function () {
      $(DOM.list).append('<li><span><i class=trash></i></span>' +
        $(DOM.inputName).val() + '</li>');
    };
  };

  /**
   * Removing items off of list
   **/
  var removeItems = function () {
    // Delete item off list
    $(DOM.list).on('click', DOM.trashIcon, function (event) {
      $(this).closest('li').remove();
    });
  };

  /**
   * Handle local storage
   **/
  var storageHandler = function () {
    //Fetch stored data on page load
    $(window).ready(function () {
      $(UIsetup.getDOMstrings().list)
        .html(localStorage.getItem(UIsetup.getDOMstrings().storageEntry));
    });

    // Autosave entered data
    setInterval(function () {
      localStorage.setItem(UIsetup.getDOMstrings().storageEntry,
        $(UIsetup.getDOMstrings().list).html());
    }, 5000);

    // Save data on close
    $(window).on('beforeunload', function () {
      localStorage.setItem(UIsetup.getDOMstrings().storageEntry,
        $(UIsetup.getDOMstrings().list).html());
    });
  };

  return {
    init: function () {
      addItems();
      removeItems();
      storageHandler();
    },
  };
})();

controller.init();
