'use strict';

(function () {
  window.colorizeElement = colorizeElement;
  function colorizeElement(element, colors, doColorizeType) {
    var color = window.utils.getRandomElement(colors);
    if (typeof doColorizeType === 'function') {
      doColorizeType(element, color);
    }
  }
})();
