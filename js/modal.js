'use strict';

(function () {
  const body = document.querySelector('body');
  const imgUploadOverlay = document.querySelector('.img-upload__overlay');

  const onModalEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      const isHashtagsInputFocus = window.form.hashtagsInput === document.activeElement;
      const isDescriptionInputFocus = window.form.descriptionInput === document.activeElement;
      if (!isHashtagsInputFocus && !isDescriptionInputFocus) {
        closeModal();
      }
    }
  };

  const openModal = function () {
    imgUploadOverlay.classList.remove(window.util.HIDE_CLASS);
    body.classList.add('modal-open');
    window.preview.effectLevelBar.classList.add(window.util.HIDE_CLASS);
    document.addEventListener('keydown', onModalEscPress);
  };

  const closeModal = function () {
    imgUploadOverlay.classList.add(window.util.HIDE_CLASS);
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onModalEscPress);
    window.util.fileInput.value = '';
    window.preview.setScale(window.preview.imagePreview, window.preview.defaultScalePercent);
  };

  window.modal = {
    onModalEscPress: onModalEscPress,
    openModal: openModal,
    closeModal: closeModal
  };
})();
