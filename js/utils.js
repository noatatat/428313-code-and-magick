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
      var element = window.utils.getRandomElement(elements);
      return element !== exept
        ? element
        : window.utils.getRandomElementExept(elements, exept);
    },

    show: function (element) {
      element.classList.remove('hidden');
    },

    hide: function (element) {
      element.classList.add('hidden');
    },

    showErrorMessage: function (errorMessage) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '30px';

      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    }
  };
})();
