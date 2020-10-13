'use strict';

(function () {
  const HASHTAGS_MAX_COUNT = 5;
  const HASHTAGS_DELIMITER = ' ';
  const DESCRIPTION_MAX_LENGHT = 140;

  const hashtagsInput = document.querySelector('.text__hashtags');
  const descriptionInput = document.querySelector('.text__description');

  const isHashtag = function (word) {
    const hashtagRegex = /^#[A-Za-z0-9]{1,19}$/;
    const result = hashtagRegex.test(word);
    return result;
  };

  const onHashtagInput = function () {
    const hashtags = hashtagsInput.value.split(HASHTAGS_DELIMITER);
    const hashtagArr = hashtags.filter((elem) => {
      return Boolean(elem.length);
    });
    const hashtagCount = hashtagArr.length;
    const hashtagCountError = hashtagCount > HASHTAGS_MAX_COUNT;
    const hashtagError = hashtagCount && !hashtagArr.every(isHashtag);
    const hashtagUniqError = !window.util.isAllArrStrElemUniq(hashtagArr);

    if (hashtagCountError) {
      hashtagsInput.setCustomValidity('нельзя указать больше пяти хэш-тегов');
    } else if (hashtagError) {
      hashtagsInput.setCustomValidity('неверный хештег');
    } else if (hashtagUniqError) {
      hashtagsInput.setCustomValidity('хэш-тег не может быть использован дважды');
    } else {
      hashtagsInput.setCustomValidity('');
    }
    hashtagsInput.reportValidity();
  };

  const onDescriptionInput = function () {
    const descriptionTextLength = descriptionInput.value.length;
    const descriptionError = descriptionTextLength > DESCRIPTION_MAX_LENGHT;

    if (descriptionError) {
      descriptionInput.setCustomValidity('комментарий не может быть больше 140 символов');
    } else {
      descriptionInput.setCustomValidity('');
    }

    descriptionInput.reportValidity();
  };

  window.form = {
    hashtagsInput: hashtagsInput,
    descriptionInput: descriptionInput,
    onHashtagInput: onHashtagInput,
    onDescriptionInput: onDescriptionInput
  };
})();
