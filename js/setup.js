'use strict';

(function () {
  var wizardCoat = window.setup.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = window.setup.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireBall = window.setup.querySelector('.setup-fireball-wrap');

  function changeFillColor(element, color) {
    element.style.fill = color;
  }
  function changeBackgroundColor(element, color) {
    element.style.backgroundColor = color;
  }

  wizardCoat.addEventListener('click', function () {
    window.colorizeElement(wizardCoat, window.COAT_COLORS, changeFillColor);
  });

  wizardEyes.addEventListener('click', function () {
    window.colorizeElement(wizardEyes, window.EYES_COLORS, changeFillColor);
  });

  wizardFireBall.addEventListener('click', function () {
    window.colorizeElement(wizardFireBall, window.FIRE_BALLS_COLORS, changeBackgroundColor);
  });

  var shopElement = document.querySelector('.setup-artifacts-shop');
  var shopItems = shopElement.querySelectorAll('img');
  var artifactsElement = document.querySelector('.setup-artifacts');
  var artifactsElementStartModeHTML = artifactsElement.innerHTML;
  [].forEach.call(shopItems, function (element) {
    element.draggable = true;
  });
  var shopElementStartModeHTML = shopElement.innerHTML;

  function setOutline(element, flag) {
    element.style.outline = (flag) ? '2px dashed red' : '';
  }
  var draggedItem = null;
  var dragZoneItem = null;
  shopElement.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target.cloneNode();
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }
    var artifactsElementItems = artifactsElement.querySelectorAll('.setup-artifacts-cell');
    function setDragZoneItem() {
      dragZoneItem = window.utils.getRandomElement(artifactsElementItems);
      return !dragZoneItem.hasChildNodes()
        ? dragZoneItem
        : setDragZoneItem();
    }
    setDragZoneItem();
    setOutline(dragZoneItem, true);
  });

  artifactsElement.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  document.addEventListener('dragend', function (evt) {
    evt.preventDefault();
    setOutline(dragZoneItem, false);
  });

  document.addEventListener('drop', function (evt) {
    evt.preventDefault();
    if (!evt.target.hasChildNodes()) {
      evt.target.style.backgroundColor = '';
      evt.target.appendChild(draggedItem);
    }
    if (evt.target !== dragZoneItem) {
      shopElement.innerHTML = shopElementStartModeHTML;
      artifactsElement.innerHTML = artifactsElementStartModeHTML;
      dragZoneItem = null;
    }
  });

  artifactsElement.addEventListener('dragenter', function (evt) {
    if ((!evt.target.hasChildNodes())
      && (evt.target.tagName.toLowerCase() !== 'img')) {
      evt.target.style.backgroundColor = 'yellow';
    }
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragleave', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  });
})();
