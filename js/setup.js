'use strict';

var firstNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var secondNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

var setup = document.querySelector('.setup');
setup.classList.remove('hidden');

var randomInteger = function (min, max) {
  if (!max) {
    max = min;
    min = 0;
  }
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

var wizards = [];

for (var i = 0; i <= 3; i++) {
  wizards[i] = {
    name: firstNames[randomInteger(7)] + ' ' + secondNames[randomInteger(7)],
    coatColor: coatColors[randomInteger(5)],
    eyesColor: eyesColors[randomInteger(4)]
  };
}

console.log(wizards);
