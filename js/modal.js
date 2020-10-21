'use strict';

(function () {
  const body = document.querySelector('body');
  const imgUploadOverlay = document.querySelector('.img-upload__overlay');

  const onModalEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      const isHashtagsInputFocus = window.config.hashtagsInput === document.activeElement;
      const isDescriptionInputFocus = window.config.descriptionInput === document.activeElement;
      if (!isHashtagsInputFocus && !isDescriptionInputFocus) {
        closeModal();
      }
    }
  };

  const openModal = function () {
    imgUploadOverlay.classList.remove(window.config.HIDE_CLASS);
    body.classList.add('modal-open');
    window.preview.removeAllEffectClasses();
    window.preview.effectLevelBar.classList.add(window.config.HIDE_CLASS);
    document.addEventListener('keydown', onModalEscPress);
  };

  const closeModal = function () {
    imgUploadOverlay.classList.add(window.config.HIDE_CLASS);
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onModalEscPress);
    window.config.fileInput.value = '';
    window.preview.setScale(window.config.imagePreview, window.config.defaultScalePercent);
  };

  window.modal = {
    onModalEscPress: onModalEscPress,
    openModal: openModal,
    closeModal: closeModal
  };
})();
