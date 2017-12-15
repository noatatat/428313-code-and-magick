'use strict';

(function () {
  var similarWizardTemlate = document.querySelector('#similar-wizard-template');
  var similarWizardItem = similarWizardTemlate.content.querySelector('.setup-similar-item');
  var similarList = document.querySelector('.setup-similar-list');

  window.backend.load(onSuccessHandler, window.utils.showErrorMessage);
  var wizards;
  function onSuccessHandler(data) {
    wizards = data;
    window.sortWizards();
  }

  function getRank(wizard) {
    var rank = 0;
    if (wizard.colorCoat === window.usersWizard.coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === window.usersWizard.eyesColor) {
      rank += 1;
    }
    return rank;
  }

  function namesComparator(left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  }

  window.sortWizards = sortWizards;
  function sortWizards() {
    updateWizards(wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  }

  function updateWizards(wizardsDataBase) {
    removeSimilarWizards();
    renderSimilarWizards(wizardsDataBase);
  }

  function removeSimilarWizards() {
    var oldWizards = similarList.querySelectorAll('.setup-similar-item');
    [].forEach.call(oldWizards, function (node) {
      similarList.removeChild(node);
    });
  }

  function renderSimilarWizards(wizardsToRender) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 4; i++) {
      var wizard = new Wizard(wizardsToRender[i].name, wizardsToRender[i].colorCoat, wizardsToRender[i].colorEyes);
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
