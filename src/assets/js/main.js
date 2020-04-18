'use strict';

document.addEventListener('DOMContentLoaded', function() {
  /* ========================= Choices Selects ========================= */
  if ( document.querySelector('.js-select-default') ) {
    const choicesDefault = new Choices('.js-select-default', {
      delimiter: ',',
      searchEnabled: false,
      itemSelectText: '',
      shouldSort: false
    });
  };

  if ( document.querySelector('.js-select-autocomplete') ) {
    const choicesAutocomplete = new Choices('.js-select-autocomplete', {
      delimiter: ',',
      itemSelectText: '',
      shouldSort: false
    });
  };

  if ( document.querySelector('.js-select-tags') ) {
    const selectTags = document.querySelectorAll('.js-select-tags');
    let values = selectTags.value;

    selectTags.forEach((selectTag) => {
      const placeholderValue = selectTag.placeholder;

      new Choices(selectTag, {
        delimiter: ',',
        editItems: true,
        removeItemButton: true,
        placeholderValue: placeholderValue,
        duplicateItemsAllowed: false,

        addItemFilter: (value) => {
          if (!value) return false;

          selectTag.value = selectTag.value.toLowerCase();

          let values = selectTag.value.split(',');
          let inputValue = value.toLowerCase();

          console.log(values);
          
          return !values.includes(inputValue);
        },
      });
    });
  };
  /* ========================= Choices Selects ========================= */

  /* ========================= Custom Scroll ========================= */
  const customScrolls = document.querySelectorAll('.js-custom-scroll');

  if (customScrolls) {
    customScrolls.forEach(function(el) {
      new SimpleBar(el, {
        autoHide: false,
        scrollbarMinSize: 4
      });
    });
  }
  /* ========================= Custom Scroll ========================= */

  /* ========================= Tippy JS ========================= */
  tippy('[data-tippy-content]', {
    theme: 'white-border'
  });
  /* ========================= Tippy JS ========================= */

  /* ========================= Input Type File ========================= */
  const fileInputs = document.querySelectorAll('input[type="file"].upload-file__upload');

  Array.prototype.forEach.call(fileInputs, function(input) {
    var label  = input.nextElementSibling,
        labelVal = label.innerHTML;

    input.addEventListener('change', function(e) {
      var fileName = '';
      
      if( this.files && this.files.length > 1 ) {
        fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace('{count}', this.files.length );
      } else {
        fileName = e.target.value.split("\\").pop();
      }

      if(fileName) {
        label.querySelector('span').innerHTML = fileName;
      } else {
        label.innerHTML = labelVal;
      }
    });
  });
  /* ========================= Input Type File ========================= */

  /* ========================= JS Dropdown ========================= */
  document.addEventListener('click', function(e) {
    const dropdownToggle = e.target.closest('.js-dropdown-toggle');

    if (!dropdownToggle) return;

    const dropdownBody = dropdownToggle.querySelector('.js-dropdown');

    if ( !dropdownToggle.classList.contains('opened') ) {
      dropdownToggle.classList.add('opened');

      document.addEventListener('click', clickOutsideDropdown);
    }
  });

  function clickOutsideDropdown(e) {
    const dropdown = e.target.closest('.js-dropdown');

    if (dropdown) return;

    const openedDropdownParents = document.querySelectorAll('.js-dropdown-toggle');
    
    openedDropdownParents.forEach((dropdownToggle) => {
      dropdownToggle.classList.remove('opened');
    });

    document.removeEventListener('click', clickOutsideDropdown);
  }
  /* ========================= JS Dropdown ========================= */

  /* ========================= Navbar ========================= */
  const toggleNavbar = document.querySelector('.navbar-trigger');
    
    /* Toggler Navbar */
  if (toggleNavbar) {
    toggleNavbar.addEventListener('click', function() {
      const body = document.body;

      if ( !body.classList.contains('is-navbar-opened') ) {
        body.classList.add('is-navbar-opened');
        body.style.paddingRight = scrollWidth() + 'px';
        toggleNavbar.classList.add('is-active');
      } else {
        body.classList.remove('is-navbar-opened');
        body.style.paddingRight = '';
        toggleNavbar.classList.remove('is-active');
      }
    });
    /* Toggler Navbar */

    /* Toggles Deep Levels Inside */
    // create toggles
    let navbarLinks = document.querySelectorAll('.navbar a');
    // let navbarLinks = document.querySelectorAll('.navbar .icon');

    navbarLinks.forEach(function(item) {
      if ( item.closest('li').querySelector('ul') ) {
        item.classList.add('has-dropdown');
      }
    });

    let dropdownToggles = document.querySelectorAll('.navbar .has-dropdown');

    dropdownToggles.forEach(function(item) {
      item.addEventListener('click', function(e) {
        item.closest('li').classList.toggle('is-opened');

        e.preventDefault();
      });
    });
    /* Toggles Deep Levels Inside */
  }
  /* ========================= Navbar ========================= */

  /* ========================= JS Password Field Toggle ========================= */
  const pswFieldToggles = document.querySelectorAll('.js-psw-field-toggle');

  if (pswFieldToggles) {
    pswFieldToggles.forEach((fieldToggle) => {
      fieldToggle.addEventListener('click', function(e) {
        let input = this.parentNode.querySelector('input');

        if ( input.type === 'password' ) {
          input.type = 'text';
        } else {
          input.type = 'password';
        }
      });
    });
  }
  /* ========================= JS Password Field Toggle ========================= */

  /* ========================= Calendars ========================= */
  const dateFields = document.querySelectorAll('.js-date-picker');

  if (dateFields) {
    dateFields.forEach(function(datePicker) {
      new Pikaday({
        field: datePicker,
        format: 'YYYY/MM/DD',
        bound: true,
        //container: document.querySelectorAll('.orders-filter__date-picker')[0],
        toString(date, format) {
            // you should do formatting based on the passed format,
            // but we will just return 'D/M/YYYY' for simplicity
            let year = date.getFullYear();
            let day = date.getDate();
            if (day < 10) day = '0' + day;
            let month = date.getMonth() + 1;
            if (month < 10) month = '0' + month;
            return `${year}/${month}/${day}`;
        },
        parse(dateString, format) {
            // dateString is the result of `toString` method
            const parts = dateString.split('/');
            const day = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10) - 1;
            const year = parseInt(parts[2], 10);
            return new Date(year, month, day);
        },
        firstDay: 1,
        i18n: {
          previousMonth : 'Следующий месяц',
          nextMonth     : 'Предыдущий месяц',
          months        : ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
          weekdays      : ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'],
          weekdaysShort : ['Вс','Пн','Вт','Ср','Чт','Пт','Сб']
        },
        onSelect: function(d) {
          this.hide();
        },
        showDaysInNextAndPreviousMonths: true
      });
    });
  }
  /* ========================= Calendars ========================= */

  /* ------------ Radio Opt States ------------ */
  let optStates = document.querySelectorAll('.radio-opt');

  optStates.forEach(function(item) {
    item.querySelector('input[type="radio"]').addEventListener('change', function() {
      clearOptStates(optStates);
      this.closest('.radio-opt').classList.add('active');
    });
  });

  function clearOptStates(opts) {
    opts.forEach(function(item) {
      item.classList.remove('active');
    });
  }
  /* ------------ Radio Opt States ------------ */

  /* ------------ Opinions Carousel ------------ */
  const opinionsCarousel = new Swiper('.js-opinions-carousel', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: false,
    autoHeight: true,

    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
    },

    navigation: {
      prevEl: '.opinions-carousel__prev',
      nextEl: '.opinions-carousel__next',
    },
  });
  /* ------------ Opinions Carousel ------------ */
});

svg4everybody({});

/* ------------ Video FROM YOUTUBE!!! ------------ */
function init() {
  var vidDefer = document.getElementsByTagName('iframe');
  for (var i=0; i<vidDefer.length; i++) {
    if(vidDefer[i].getAttribute('data-src')) {
      vidDefer[i].setAttribute('src',vidDefer[i].getAttribute('data-src'));
    }
  }
}

window.onload = init;
/* ------------ Video FROM YOUTUBE!!! ------------ */

/* ------------ Helpers ------------ */
function scrollWidth() {
  let div = document.createElement('div');
  div.style.overflowY = 'scroll';
  div.style.width = '50px';
  div.style.height = '50px';
  div.style.visibility = 'hidden';
  document.body.appendChild(div);
  let scrollWidth = div.offsetWidth - div.clientWidth;
  document.body.removeChild(div);
  return scrollWidth;
}
/* ------------ Helpers ------------ */

// Polyfill of pseudo-class :placeholder-shown
(function(){
  (() => {
    const isCheck = () => {
      try {
        document.querySelector(':placeholder-shown');
      } catch (error) {
        if (error instanceof DOMException) return false;
        throw new Error(error);
      }
      return true;
    };

    const changeClass = el => el.classList[el.value ? 'remove' : 'add']('placeholder-shown');

    const placeholderShownPolyfill = () => {
      document.querySelectorAll('[placeholder]').forEach(el => {
        el.classList.add('no-support-placeholder-shown');
        changeClass(el);
        ['change', 'keyup'].forEach(type => {
          el.addEventListener(type, ({ target }) => changeClass(target));
        });
      });
    };

    if (!isCheck()) window.addEventListener('load', placeholderShownPolyfill);
  })();
})();