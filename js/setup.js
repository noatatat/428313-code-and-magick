'use strict';

var wizardsNumber = 4;
var firstNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var secondNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

var getRandomInteger = function (min, max) {
  if (!max) {
    max = min;
    min = 0;
  }
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

var wizards = [];

var setup = document.querySelector('.setup');
setup.classList.remove('hidden');

var similarWizardTemlate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var similarList = document.querySelector('.setup-similar-list');

var renderWizard = function (wizard) {
  var similarWizard = similarWizardTemlate.cloneNode(true);
  similarWizard.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  similarWizard.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  similarWizard.querySelector('.setup-similar-label').textContent = wizard.name;
  return similarWizard;
};

var createWizardPassport = function () {
  var wizardPassportElement = {
    name: firstNames[getRandomInteger(firstNames.length - 1)] + ' ' + secondNames[secondNames.length - 1],
    coatColor: coatColors[getRandomInteger(coatColors.length - 1)],
    eyesColor: eyesColors[getRandomInteger(eyesColors.length - 1)]
  };
  return wizardPassportElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizardsNumber; i++) {
  wizards[i] = createWizardPassport();
  fragment.appendChild(renderWizard(wizards[i]));
}

similarList.appendChild(fragment);
document.querySelector('.setup-similar').classList.remove('hidden');
