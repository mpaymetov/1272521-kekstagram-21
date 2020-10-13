'use strict';

(function () {
  const pictureContainer = document.querySelector('.pictures');
  const photoData = window.data.createPhotoDataArray(window.util.PHOTOS_COUNT);
  const pictureTemplateBlock = document.querySelector('#picture');
  const pictureTemplate = pictureTemplateBlock.content.querySelector('a');
  window.gallery.renderPictures(photoData, pictureContainer, pictureTemplate);

  window.util.fileInput.addEventListener('change', function () {
    window.modal.openModal();
  });

  const modalCloseButton = document.querySelector('#upload-cancel');
  modalCloseButton.addEventListener('click', function () {
    window.modal.closeModal();
  });

  window.modal.openModal();

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

  window.form.hashtagsInput.addEventListener('input', window.form.onHashtagInput);
  window.form.descriptionInput.addEventListener('input', window.form.onDescriptionInput);
})();
