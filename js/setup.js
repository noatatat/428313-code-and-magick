'use strict';

(function () {
  var wizardCoat = window.setup.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = window.setup.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireBall = window.setup.querySelector('.setup-fireball-wrap');

  function changeFillColor(element, colors) {
    element.style.fill = window.utils.getRandomElement(colors);
  }
  function changeBackgroundColor(element, colors) {
    element.style.backgroundColor = window.utils.getRandomElement(colors);
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
      draggedItem = evt.target;
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

  document.addEventListener('drop', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.target.appendChild(draggedItem);
    evt.preventDefault();

    if (evt.target === dragZoneItem) {
      setOutline(dragZoneItem, false);
    } else {
      shopElement.innerHTML = shopElementStartModeHTML;
      artifactsElement.innerHTML = artifactsElementStartModeHTML;
      dragZoneItem = null;
    }
  });

  artifactsElement.addEventListener('dragenter', function (evt) {
    evt.target.style.backgroundColor = 'yellow';
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragleave', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  });
})();
