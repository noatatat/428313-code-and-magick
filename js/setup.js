'use strict';

var wizardsNumber = 4;
var firstNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var secondNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = [
  'rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)',
  'rgb(215, 210, 55)', 'rgb(0, 0, 0)'
];

var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

function getRandom(min, max) {
  if (!max) {
    max = min;
    min = 0;
  }
  return min + Math.random() * (max - min);
}

function getRandomInteger(min, max) {
  return Math.floor(getRandom(min, max));
}

function getRandomElement(elements) {
  return elements[getRandomInteger(0, elements.length - 1)];
}

function getRandomElementExept(elements, exept) {
  var element = elements[getRandomInteger(0, elements.length - 1)];
  if (element !== exept) {
    return element;
  } else {
    return getRandomElementExept(elements, exept);
  }
}

var wizards = [];

var setup = document.querySelector('.setup');
setup.classList.remove('hidden');

var similarWizardTemlate = document.querySelector('#similar-wizard-template');
var similarWizardItem = similarWizardTemlate.content.querySelector('.setup-similar-item');
var similarList = document.querySelector('.setup-similar-list');

function Wizard(fullName, coatColor, eyesColor) {
  this.name = fullName;
  this.coatColor = coatColor;
  this.eyesColor = eyesColor;
}

function generateRandomWizard() {
  var fullName = getRandomElementExept(firstNames, 'Иван') + ' '
    + getRandomElement(secondNames);
  var coatColor = getRandomElement(coatColors);
  var eyesColor = getRandomElement(eyesColors);
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
for (var i = 0; i < wizardsNumber; i++) {
  wizards[i] = generateRandomWizard();
  fragment.appendChild(renderWizard(wizards[i]));
}

function show(element) {
  return element.classList.remove('hidden');
}

similarList.appendChild(fragment);
show(document.querySelector('.setup-similar'));
