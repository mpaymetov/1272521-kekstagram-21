'use strict';

(function () {
  const body = document.querySelector('body');
  const imgUploadOverlay = document.querySelector('.img-upload__overlay');
  const modalCloseButton = document.querySelector('#upload-cancel');
  const fileInput = document.querySelector('#upload-file');

  const onModalEscPress = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      const isHashtagsInputFocus = window.form.hashtagsInput === document.activeElement;
      const isDescriptionInputFocus = window.form.descriptionInput === document.activeElement;
      if (!isHashtagsInputFocus && !isDescriptionInputFocus) {
        closeModal();
      }
    }
  };

  const openModal = () => {
    imgUploadOverlay.classList.remove(window.config.HIDE_CLASS);
    body.classList.add('modal-open');
    window.preview.removeAllEffectClasses();
    window.preview.effectLevelBar.classList.add(window.config.HIDE_CLASS);
    document.addEventListener('keydown', onModalEscPress);
    modalCloseButton.addEventListener('click', closeModal);
  };

  const closeModal = () => {
    imgUploadOverlay.classList.add(window.config.HIDE_CLASS);
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onModalEscPress);
    modalCloseButton.removeEventListener('click', closeModal);

    fileInput.value = '';
    window.preview.setPreviewDefaultScale();
  };

  window.modal = {
    fileInput: fileInput,
    onModalEscPress: onModalEscPress,
    openModal: openModal,
    closeModal: closeModal
  };
})();
