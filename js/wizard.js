'use strict';

(function () {
  var wizardCoat = window.setup.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = window.setup.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireBall = window.setup.querySelector('.setup-fireball-wrap');

  function changeFillColor(element, colors) {
    element.style.fill = window.random.getrandomElement(colors);
  }
  function changeBackgroundColor(element, colors) {
    element.style.backgroundColor = window.random.getrandomElement(colors);
  }

  wizardCoat.addEventListener('click', function () {
    changeFillColor(wizardCoat, window.COAT_COLORS);
  });

  wizardEyes.addEventListener('click', function () {
    changeFillColor(wizardEyes, window.EYES_COLORS);
  });

  wizardFireBall.addEventListener('click', function () {
    changeBackgroundColor(wizardFireBall, window.FIRE_BALLS_COLORS);
  });
})();
