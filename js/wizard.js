'use strict';

(function () {
  var wizardCoat = window.setup.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = window.setup.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireBall = window.setup.querySelector('.setup-fireball-wrap');

  window.usersWizard = {
    coatColor: wizardCoat.style.fill,
    eyesColor: wizardEyes.style.fill
  };

  function changeFillColor(element, color) {
    element.style.fill = color;
  }

  function changeBackgroundColor(element, color) {
    element.style.backgroundColor = color;
  }

  wizardCoat.addEventListener('click', function () {
    window.colorizeElement(wizardCoat, window.COAT_COLORS, changeFillColor);
    window.usersWizard.coatColor = wizardCoat.style.fill;
    window.debounce(window.sortWizards, 500);
  });

  wizardEyes.addEventListener('click', function () {
    window.colorizeElement(wizardEyes, window.EYES_COLORS, changeFillColor);
    window.usersWizard.eyesColor = wizardEyes.style.fill;
    window.debounce(window.sortWizards, 500);
  });

  wizardFireBall.addEventListener('click', function () {
    window.colorizeElement(wizardFireBall, window.FIRE_BALLS_COLORS, changeBackgroundColor);
  });
})();
