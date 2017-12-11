'use strict';

(function () {
  var similarWizardTemlate = document.querySelector('#similar-wizard-template');
  var similarWizardItem = similarWizardTemlate.content.querySelector('.setup-similar-item');
  var similarList = document.querySelector('.setup-similar-list');

  window.backend.load(renderSimilarWizards, window.utils.showErrorMessage);

  function renderSimilarWizards(wizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 4; i++) {
      var number = window.utils.getRandomInteger(wizards.length);
      var wizard = new Wizard(wizards[number].name, wizards[number].colorCoat, wizards[number].colorEyes);
      fragment.appendChild(renderWizard(wizard));
    }
    similarList.appendChild(fragment);
  }

  function Wizard(fullName, coatColor, eyesColor) {
    this.name = fullName;
    this.coatColor = coatColor;
    this.eyesColor = eyesColor;
  }

  function renderWizard(wizard) {
    var similarWizard = similarWizardItem.cloneNode(true);
    similarWizard.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    similarWizard.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    similarWizard.querySelector('.setup-similar-label').textContent = wizard.name;
    return similarWizard;
  }
})();
