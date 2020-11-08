'use strict';

(function () {
  window.load(window.config.DATA_LOAD_URL, window.gallery.onContentLoad, window.util.showError);

  window.modal.fileInput.addEventListener('change', window.modal.openModal);

  window.preview.controlSmallerButton.addEventListener('click', window.preview.valueDown);
  window.preview.controlBiggerButton.addEventListener('click', window.preview.valueUp);
  window.preview.form.addEventListener('change', window.preview.onEffectsChange);
  window.preview.effectLevelPin.addEventListener('mouseup', window.preview.onPinMove);

  window.form.hashtagsInput.addEventListener('input', window.form.onHashtagInput);
  window.form.descriptionInput.addEventListener('input', window.form.onDescriptionInput);
})();
