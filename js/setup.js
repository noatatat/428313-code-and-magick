'use strict';

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
  var wizards = [];
  var similarWizardTemlate = document.querySelector('#similar-wizard-template');
  var similarWizardItem = similarWizardTemlate.content.querySelector('.setup-similar-item');
  var similarList = document.querySelector('.setup-similar-list');

  function Wizard(fullName, coatColor, eyesColor) {
    this.name = fullName;
    this.coatColor = coatColor;
    this.eyesColor = eyesColor;
  }

  function generaterandomWizard() {
    var fullName = window.random.getrandomElementExept(window.FIRST_NAMES, 'Иван') + ' '
      + window.random.getrandomElement(window.SECOND_NAMES);
    var coatColor = window.random.getrandomElement(window.COAT_COLORS);
    var eyesColor = window.random.getrandomElement(window.EYES_COLORS);
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
    wizards[i] = generaterandomWizard();
    fragment.appendChild(renderWizard(wizards[i]));
  }

  similarList.appendChild(fragment);
  window.hidden.show(document.querySelector('.setup-similar'));
})();
