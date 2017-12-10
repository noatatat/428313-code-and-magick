'use strict';

(function () {
  window.colorizeElement = colorizeElement;
  function colorizeElement(element, colors, doColorizeType) {
    if (typeof doColorizeType === 'function') {
      doColorizeType(element, colors);
    }
  }
})();
