/* global $ alert */

const UIsetup = (() => {
  const DOMstrings = {
    list: '.item-list',
    entrydata: '.entry-data',
    storageEntry: 'entry',
    button: '#add-btn',
    inputName: 'input[name=hike-entry]',
    inputLocation: 'input[name=location-entry]',
    inputLength: 'input[name=length-entry]',
    inputElevation: 'input[name=elevation-entry]',
    trashIcon: '#input-trash',
    listedItem: '#input-name',
    dropdown: '#dropdown',
    dropcontent: '.dropdown-content',
  };

  return {
    getDOMstrings: () => DOMstrings,
  };
})();

const controller = (() => {
  let DOM = UIsetup.getDOMstrings();

  /**
   * Set up event handling for adding items
   **/
  const addItems = () => {

    // Add text from input to list after Enter is pressed
    $(document).on('keypress', event => {
      if (event.keyCode === 13 || event.which === 13) {
        if ($(DOM.inputName).val() !== '') {
          appendItem();
          $(DOM.entrydata).contents().val('');
        } else {
          alert('Enter Something');
        }
      }
    });

    // Add text from input to list after "+" button is pressed
    $(DOM.button).on('click', () => {
      if ($(DOM.inputName).val() !== '') {
        appendItem();
        $(DOM.entrydata).contents().val('');
      } else {
        alert('Enter Something');
      }
    });

    // String to be appended to list(template literals ;))
    const appendItem = () => {
      $(DOM.list).append(`<li><span id=input-trash title=Delete></span>
        <div class=dropdown-container><span id=input-name title=Details>
          ${$(DOM.inputName).val()}</span>
        <div id=dropdown class=dropdown-content>
        <span id=input-location><u>Location:</u>
          ${$(DOM.inputLocation).val()}</span><br/>
        <span id=input-length><u>Length:</u>
          ${$(DOM.inputLength).val()} miles</span><br/>
        <span id=input-elevation><u>Elevation:</u>
          ${$(DOM.inputElevation).val()} ft.</span></div></div></li>`);
    };
  };

  // Expand detail dropdown
  const expandDropdown = () => {
    $(DOM.list).on('click', DOM.listedItem, function () {
      $(this).next().slideToggle(200);
    });
  };

  /**
   * Removing items off of list
   **/
  const removeItems = () => {
    // Delete item off list
    $(DOM.list).on('click', DOM.trashIcon, function (event) {
      $(this).closest('li').remove();
    });
  };

  /**
   * Handle local storage
   **/
  const storageHandler = () => {
    //Fetch stored data on page load
    $(window).ready(() => {
      $(UIsetup.getDOMstrings().list)
        .html(localStorage.getItem(UIsetup.getDOMstrings().storageEntry));
    });

    // Autosave entered data
    setInterval(() => {
      localStorage.setItem(UIsetup.getDOMstrings().storageEntry,
        $(UIsetup.getDOMstrings().list).html());
    }, 5000);

    // Save data on close
    $(window).on('beforeunload', () => {
      localStorage.setItem(UIsetup.getDOMstrings().storageEntry,
        $(UIsetup.getDOMstrings().list).html());
    });
  };

  return {
    init: () => {
      addItems();
      removeItems();
      expandDropdown();
      storageHandler();
    },
  };
})();

controller.init();

//localStorage.clear();

//TODO: Firefox and IE not liking this
