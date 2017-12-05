'use strict';
(function () {
  window.ESC_KEYCODE = 27;
  window.ENTER_KEYCODE = 13;
  window.WIZARD_NUMBER = 4;
  window.FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  window.SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  window.COAT_COLORS = [
    'rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)',
    'rgb(215, 210, 55)', 'rgb(0, 0, 0)'
  ];
  window.EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  window.FIRE_BALLS_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
})();

(function () {
  window.setup = document.querySelector('.setup');
  window.userNameInput = window.setup.querySelector('.setup-user-name');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = window.setup.querySelector('.setup-close');
  var setupSave = window.setup.querySelector('.setup-submit');

  window.hidden = {
    show: function (element) {
      element.classList.remove('hidden');
    },

    hide: function (element) {
      element.classList.add('hidden');
    }
  };

  function onPopupEscPress(evt) {
    if ((evt.keyCode === window.ESC_KEYCODE) && (window.userNameInput !== document.activeElement)) {
      onPopupClose();
    }
  }

  function onPopupOpen() {
    window.hidden.show(window.setup);
    document.addEventListener('keydown', onPopupEscPress);
  }

  function onPopupOpenOnEnter(evt) {
    if (evt.keyCode === window.ENTER_KEYCODE) {
      onPopupOpen();
    }
  }

  function onPopupClose() {
    window.hidden.hide(window.setup);
    document.removeEventListener('keydown', onPopupEscPress);
  }

  function onPopupCloseOnEnter(evt) {
    if (evt.keyCode === window.ENTER_KEYCODE) {
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

(function () {
  var userNameInput = window.userNameInput;
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
})();

(function () {
  var wizardCoat = window.setup.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = window.setup.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireBall = window.setup.querySelector('.setup-fireball-wrap');

  function changeFillColor(element, colors) {
    element.style.fill = window.randomUtils.getRandomElement(colors);
  }
  function changeBackgroundColor(element, colors) {
    element.style.backgroundColor = window.randomUtils.getRandomElement(colors);
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
  var wizards = [];
  var similarWizardTemlate = document.querySelector('#similar-wizard-template');
  var similarWizardItem = similarWizardTemlate.content.querySelector('.setup-similar-item');
  var similarList = document.querySelector('.setup-similar-list');

  function Wizard(fullName, coatColor, eyesColor) {
    this.name = fullName;
    this.coatColor = coatColor;
    this.eyesColor = eyesColor;
  }

  function generateRandomWizard() {
    var fullName = window.randomUtils.getRandomElementExept(window.FIRST_NAMES, 'Иван') + ' '
      + window.randomUtils.getRandomElement(window.SECOND_NAMES);
    var coatColor = window.randomUtils.getRandomElement(window.COAT_COLORS);
    var eyesColor = window.randomUtils.getRandomElement(window.EYES_COLORS);
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
  for (var i = 0; i < window.WIZARD_NUMBER; i++) {
    wizards[i] = generateRandomWizard();
    fragment.appendChild(renderWizard(wizards[i]));
  }

  similarList.appendChild(fragment);
  window.hidden.show(document.querySelector('.setup-similar'));
})();
