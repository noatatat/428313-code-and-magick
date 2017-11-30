'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var wizardsNumber = 4;
var firstNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var secondNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = [
  'rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)',
  'rgb(215, 210, 55)', 'rgb(0, 0, 0)'
];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
var wizards = [];

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupSave = setup.querySelector('.setup-submit');
var setupUserName = setup.querySelector('.setup-user-name');
var inputFactor = 0;

function show(element) {
  element.classList.remove('hidden');
}

function hide(element) {
  element.classList.add('hidden');
}

function onPopupEscPress(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
}

function openPopup() {
  show(setup);
  document.addEventListener('keydown', onPopupEscPress);
}

function openPopupOnEnter(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
}

function closePopup() {
  hide(setup);
  document.removeEventListener('keydown', onPopupEscPress);
}

function closePopupOnEnter(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
}

setupOpen.addEventListener('click', openPopup);
setupOpen.addEventListener('keydown', openPopupOnEnter);

setupClose.addEventListener('click', closePopup);
setupClose.addEventListener('keydown', closePopupOnEnter);

setupSave.addEventListener('click', closePopup);
setupSave.addEventListener('keydown', closePopupOnEnter);

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
  return elements[getRandomInteger(elements.length)];
}

function getRandomElementExept(elements, exept) {
  var element = elements[getRandomInteger(elements.length)];
  if (element !== exept) {
    return element;
  } else {
    return getRandomElementExept(elements, exept);
  }
}

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

similarList.appendChild(fragment);
show(document.querySelector('.setup-similar'));
