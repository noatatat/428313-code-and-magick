'use strict';

var WIZARD_NUMBER = 4;
var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = [
  'rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)',
  'rgb(215, 210, 55)', 'rgb(0, 0, 0)'
];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIRE_BALLS_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var wizards = [];

var setup = document.querySelector('.setup');
var userNameInput = setup.querySelector('.setup-user-name');
var wizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
var wizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
var wizardFireBall = setup.querySelector('.setup-fireball-wrap');

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var setupSave = setup.querySelector('.setup-submit');

  window.hidden = {
    show: function (element) {
      element.classList.remove('hidden');
    },

    hide: function (element) {
      element.classList.add('hidden');
    }
  };

  function onPopupEscPress(evt) {
    if ((evt.keyCode === ESC_KEYCODE) && (userNameInput !== document.activeElement)) {
      onPopupClose();
    }
  }

  function onPopupOpen() {
    window.hidden.show(setup);
    document.addEventListener('keydown', onPopupEscPress);
  }

  function onPopupOpenOnEnter(evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      onPopupOpen();
    }
  }

  function onPopupClose() {
    window.hidden.hide(setup);
    document.removeEventListener('keydown', onPopupEscPress);
  }

  function onPopupCloseOnEnter(evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      onPopupClose();
    }
  }

  function onButtonRemoveListeners() {
    setupClose.removeEventListener('click', onPopupClose);
    setupClose.removeEventListener('keydown', onPopupCloseOnEnter);
  }

  setupOpen.addEventListener('click', onPopupOpen);
  setupOpen.addEventListener('keydown', onPopupOpenOnEnter);
  setupClose.addEventListener('click', onPopupClose);
  setupClose.addEventListener('keydown', onPopupCloseOnEnter);
  setupSave.addEventListener('click', onButtonRemoveListeners);
  setupSave.addEventListener('keydown', onButtonRemoveListeners);
})();

userNameInput.addEventListener('validity', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('В имени должно быть не менее 2 символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('В имени должно быть не более 25 символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

userNameInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 2) {
    target.setCustomValidity('В имени должно быть не менее 2 символов');
  } else {
    target.setCustomValidity('');
  }
});

function changeFillColor(element, colors) {
  element.style.fill = getRandomElement(colors);
}

wizardCoat.addEventListener('click', function () {
  changeFillColor(wizardCoat, COAT_COLORS);
});

wizardEyes.addEventListener('click', function () {
  changeFillColor(wizardEyes, EYES_COLORS);
});

wizardFireBall.addEventListener('click', function () {
  wizardFireBall.style.backgroundColor = getRandomElement(FIRE_BALLS_COLORS);
});

(function () {
  window.randomUtils = {
    getRandom: function (min, max) {
      if (!max) {
        max = min;
        min = 0;
      }
      return min + Math.random() * (max - min);
    },

    getRandomInteger: function (min, max) {
      return Math.floor(window.randomUtils.getRandom(min, max));
    },

    getRandomElement: function (elements) {
      return elements[window.randomUtils.getRandomInteger(elements.length)];
    },

    getRandomElementExept: function (elements, exept) {
      var element = elements[window.randomUtils.getRandomInteger(elements.length)];
      if (element !== exept) {
        return element;
      } else {
        return window.randomUtils.getRandomElementExept(elements, exept);
      }
    }
  };
})();

(function () {
  var similarWizardTemlate = document.querySelector('#similar-wizard-template');
  var similarWizardItem = similarWizardTemlate.content.querySelector('.setup-similar-item');
  var similarList = document.querySelector('.setup-similar-list');

  function Wizard(fullName, coatColor, eyesColor) {
    this.name = fullName;
    this.coatColor = coatColor;
    this.eyesColor = eyesColor;
  }

  function generateRandomWizard() {
    var fullName = window.randomUtils.getRandomElementExept(FIRST_NAMES, 'Иван') + ' '
      + window.randomUtils.getRandomElement(SECOND_NAMES);
    var coatColor = window.randomUtils.getRandomElement(COAT_COLORS);
    var eyesColor = window.randomUtils.getRandomElement(EYES_COLORS);
    return new Wizard(fullName, coatColor, eyesColor);
  }

  function renderWizard(wizard) {
    var similarWizard = similarWizardItem.cloneNode(true);
    similarWizard.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    similarWizard.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    similarWizard.querySelector('.setup-similar-label').textContent = wizard.name;
    return similarWizard;
  }

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < WIZARD_NUMBER; i++) {
    wizards[i] = generateRandomWizard();
    fragment.appendChild(renderWizard(wizards[i]));
  }

  similarList.appendChild(fragment);
  window.hidden.show(document.querySelector('.setup-similar'));
})();
