'use strict';

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
