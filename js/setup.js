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

  function onPopupOpen() {
    window.utils.show(window.setup);
    document.addEventListener('keydown', onPopupEscPress);
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

  setupOpen.addEventListener('click', onPopupOpen);
  setupOpen.addEventListener('keydown', onPopupOpenOnEnter);
  setupClose.addEventListener('click', onPopupClose);
  setupClose.addEventListener('keydown', onPopupCloseOnEnter);
  setupSave.addEventListener('click', onButtonRemoveListeners);
  setupSave.addEventListener('keydown', onButtonRemoveListeners);
})();
