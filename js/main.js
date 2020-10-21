'use strict';

(function () {
  window.load(window.config.dataLoadUrl, window.gallery.renderPictures, window.util.showError);

  window.config.fileInput.addEventListener('change', function () {
    window.modal.openModal();
  });

  const modalCloseButton = document.querySelector('#upload-cancel');
  modalCloseButton.addEventListener('click', function () {
    window.modal.closeModal();
  });

  const controlSmallerButton = document.querySelector('.scale__control--smaller');
  controlSmallerButton.addEventListener('click', function () {
    window.preview.valueDown();
  });

  const controlBiggerButton = document.querySelector('.scale__control--bigger');
  controlBiggerButton.addEventListener('click', function () {
    window.preview.valueUp();
  });

  const form = document.querySelector('.img-upload__form');
  form.addEventListener('change', window.preview.onEffectsChange);

  const effectLevelPin = document.querySelector('.effect-level__pin');
  effectLevelPin.addEventListener('mouseup', window.preview.onPinMove);

  window.config.hashtagsInput.addEventListener('input', window.form.onHashtagInput);
  window.config.descriptionInput.addEventListener('input', window.form.onDescriptionInput);
})();
