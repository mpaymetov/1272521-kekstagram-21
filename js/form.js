'use strict';

(function () {
  const hashtagsInput = document.querySelector('.text__hashtags');
  const descriptionInput = document.querySelector('.text__description');

  const isHashtag = (word) => {
    const hashtagRegex = /^#[A-Za-z0-9]{1,19}$/;
    const result = hashtagRegex.test(word);
    return result;
  };

  const onHashtagInput = (evt) => {
    const hashtags = evt.target.value.split(window.config.HASHTAGS_DELIMITER);
    const hashtagArr = hashtags.filter((elem) => {
      return Boolean(elem.length);
    });
    const hashtagCount = hashtagArr.length;
    const hashtagCountError = hashtagCount > window.config.HASHTAGS_MAX_COUNT;
    const hashtagError = hashtagCount && !hashtagArr.every(isHashtag);
    const hashtagUniqError = !window.util.isAllArrStrElemUniq(hashtagArr);

    if (hashtagCountError) {
      evt.target.setCustomValidity('нельзя указать больше пяти хэш-тегов');
    } else if (hashtagError) {
      evt.target.setCustomValidity('неверный хештег');
    } else if (hashtagUniqError) {
      evt.target.setCustomValidity('хэш-тег не может быть использован дважды');
    } else {
      evt.target.setCustomValidity('');
    }
    evt.target.reportValidity();
  };

  const onDescriptionInput = (evt) => {
    const descriptionTextLength = evt.target.value.length;
    const descriptionError = descriptionTextLength > window.config.DESCRIPTION_MAX_LENGHT;

    if (descriptionError) {
      evt.target.setCustomValidity('комментарий не может быть больше 140 символов');
    } else {
      evt.target.setCustomValidity('');
    }

    evt.target.reportValidity();
  };

  window.form = {
    hashtagsInput: hashtagsInput,
    descriptionInput: descriptionInput,
    onHashtagInput: onHashtagInput,
    onDescriptionInput: onDescriptionInput
  };
})();
