'use strict';

(function () {
  var wizardCoat = window.setup.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = window.setup.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireBall = window.setup.querySelector('.setup-fireball-wrap');

  function changeFillColor(element, color) {
    element.style.fill = color;
  }

  function changeBackgroundColor(element, color) {
    element.style.backgroundColor = color;
  }

  wizardCoat.addEventListener('click', function () {
    window.colorizeElement(wizardCoat, window.COAT_COLORS, changeFillColor);
  });

  wizardEyes.addEventListener('click', function () {
    window.colorizeElement(wizardEyes, window.EYES_COLORS, changeFillColor);
  });

  wizardFireBall.addEventListener('click', function () {
    window.colorizeElement(wizardFireBall, window.FIRE_BALLS_COLORS, changeBackgroundColor);
  });
})();
