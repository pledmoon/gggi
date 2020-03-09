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
  const fileInputs = document.querySelectorAll('input[type="file"]');

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