'use strict';

(function () {
  window.utils = {
    getRandom: function (min, max) {
      if (!max) {
        max = min;
        min = 0;
      }
      return min + Math.random() * (max - min);
    },

    getRandomInteger: function (min, max) {
      return Math.floor(window.utils.getRandom(min, max));
    },

    getRandomElement: function (elements) {
      return elements[window.utils.getRandomInteger(elements.length)];
    },

    getRandomElementExept: function (elements, exept) {
      var element = window.getRandomElement(elements);
      return element !== exept
        ? element
        : window.random.getRandomElementExept(elements, exept);
    },

    show: function (element) {
      element.classList.remove('hidden');
    },

    hide: function (element) {
      element.classList.add('hidden');
    }
  };
})();
