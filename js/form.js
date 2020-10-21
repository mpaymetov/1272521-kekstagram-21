'use strict';

(function () {
  const isHashtag = function (word) {
    const hashtagRegex = /^#[A-Za-z0-9]{1,19}$/;
    const result = hashtagRegex.test(word);
    return result;
  };

  const onHashtagInput = function () {
    const hashtags = window.config.hashtagsInput.value.split(window.config.HASHTAGS_DELIMITER);
    const hashtagArr = hashtags.filter((elem) => {
      return Boolean(elem.length);
    });
    const hashtagCount = hashtagArr.length;
    const hashtagCountError = hashtagCount > window.config.HASHTAGS_MAX_COUNT;
    const hashtagError = hashtagCount && !hashtagArr.every(isHashtag);
    const hashtagUniqError = !window.util.isAllArrStrElemUniq(hashtagArr);

    if (hashtagCountError) {
      window.config.hashtagsInput.setCustomValidity('нельзя указать больше пяти хэш-тегов');
    } else if (hashtagError) {
      window.config.hashtagsInput.setCustomValidity('неверный хештег');
    } else if (hashtagUniqError) {
      window.config.hashtagsInput.setCustomValidity('хэш-тег не может быть использован дважды');
    } else {
      window.config.hashtagsInput.setCustomValidity('');
    }
    window.config.hashtagsInput.reportValidity();
  };

  const onDescriptionInput = function () {
    const descriptionTextLength = window.config.descriptionInput.value.length;
    const descriptionError = descriptionTextLength > window.config.DESCRIPTION_MAX_LENGHT;

    if (descriptionError) {
      window.config.descriptionInput.setCustomValidity('комментарий не может быть больше 140 символов');
    } else {
      window.config.descriptionInput.setCustomValidity('');
    }

    window.config.descriptionInput.reportValidity();
  };

  window.form = {
    onHashtagInput: onHashtagInput,
    onDescriptionInput: onDescriptionInput
  };
})();
