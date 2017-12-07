'use strict';

(function () {
  window.setup = document.querySelector('.setup');
  window.userNameInput = window.setup.querySelector('.setup-user-name');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = window.setup.querySelector('.setup-close');
  var setupSave = window.setup.querySelector('.setup-submit');

  function onPopupEscPress(evt) {
    if ((evt.keyCode === window.KEYCODE.ESCAPE)
      && (window.userNameInput !== document.activeElement)) {
      onPopupClose();
    }
  }

  var setupStart;
  function setStartCoords() {
    if (!setupStart) {
      setupStart = {
        x: window.setup.offsetLeft,
        y: window.setup.offsetTop
      };
    } else {
      if (window.setup.offsetLeft !== setupStart.x) {
        window.setup.style.left = setupStart.x + 'px';
      }
      if (window.setup.offsetTop !== setupStart.y) {
        window.setup.style.top = setupStart.y + 'px';
      }
    }
  }

  function onPopupOpen() {
    window.utils.show(window.setup);
    setStartCoords();
    document.addEventListener('keydown', onPopupEscPress);
    setupMove();
  }

  function onPopupOpenOnEnter(evt) {
    if (evt.keyCode === window.KEYCODE.ENTER) {
      onPopupOpen();
    }
  }

  function onPopupClose() {
    window.utils.hide(window.setup);
    document.removeEventListener('keydown', onPopupEscPress);
  }

  function onPopupCloseOnEnter(evt) {
    if (evt.keyCode === window.KEYCODE.ENTER) {
      onPopupClose();
    }
  }

  function onButtonRemoveListeners() {
    setupClose.removeEventListener('click', onPopupClose);
    setupClose.removeEventListener('keydown', onPopupCloseOnEnter);
  }

  function setupMove() {
    var setupHandle = window.setup.querySelector('.setup-user-pic');
    setupHandle.addEventListener('mousedown', onSetupMouseDown);

    function onSetupMouseDown(evt) {
      evt.preventDefault();
      var startX = window.setup.offsetLeft;
      var startY = window.setup.offsetTop;
      var shift = {
        x: evt.clientX - startX,
        y: evt.clientY - startY
      };

      window.onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        var coords = {
          x: moveEvt.clientX - shift.x,
          y: moveEvt.clientY - shift.y
        };
        window.setup.style.top = coords.y + 'px';
        window.setup.style.left = coords.x + 'px';
      };

      window.onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', window.onMouseMove);
        document.removeEventListener('mouseup', window.onMouseUp);
      };
      document.addEventListener('mousemove', window.onMouseMove);
      document.addEventListener('mouseup', window.onMouseUp);
    }
  }

  setupOpen.addEventListener('click', onPopupOpen);
  setupOpen.addEventListener('keydown', onPopupOpenOnEnter);
  setupClose.addEventListener('click', onPopupClose);
  setupClose.addEventListener('keydown', onPopupCloseOnEnter);
  setupSave.addEventListener('click', onButtonRemoveListeners);
  setupSave.addEventListener('keydown', onButtonRemoveListeners);
})();
