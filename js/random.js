'use strict';

(function () {
  window.random = {
    getrandom: function (min, max) {
      if (!max) {
        max = min;
        min = 0;
      }
      return min + Math.random() * (max - min);
    },

    getrandomInteger: function (min, max) {
      return Math.floor(window.random.getrandom(min, max));
    },

    getrandomElement: function (elements) {
      return elements[window.random.getrandomInteger(elements.length)];
    },

    getrandomElementExept: function (elements, exept) {
      var element = elements[window.random.getrandomInteger(elements.length)];
      if (element !== exept) {
        return element;
      } else {
        return window.random.getrandomElementExept(elements, exept);
      }
    }
  };
})();
