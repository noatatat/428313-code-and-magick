'use strict';

(function () {
  var userNameInput = window.userNameInput;
  userNameInput.addEventListener('validity', function () {
    if (userNameInput.validity.tooShort) {
      userNameInput.setCustomValidity('В имени должно быть не менее 2 символов');
    } else if (userNameInput.validity.tooLong) {
      userNameInput.setCustomValidity('В имени должно быть не более 25 символов');
    } else if (userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity('Обязательное поле');
    } else {
      userNameInput.setCustomValidity('');
    }
  });

  userNameInput.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length < 2) {
      target.setCustomValidity('В имени должно быть не менее 2 символов');
    } else {
      target.setCustomValidity('');
    }
  });
})();
