'use strict';

(function () {
  const PHOTOS_COUNT = 25;
  const HIDE_CLASS = 'hidden';

  const LIKES_MIN = 15;
  const LIKES_MAX = 200;
  const AVATARS_COUNT = 6;

  const MAX_CONTROL_VALUE = 100;
  const MIN_CONTROL_VALUE = 25;
  const CONTROL_STEP = 25;
  const EFFECT_CLASS_START = 'effects__preview--';

  const HASHTAGS_MAX_COUNT = 5;
  const HASHTAGS_DELIMITER = ' ';
  const DESCRIPTION_MAX_LENGHT = 140;

  const fileInput = document.querySelector('#upload-file');
  const controlValue = document.querySelector('.scale__control--value');
  const imagePreview = document.querySelector('.img-upload__preview');
  const defaultScalePercent = 100;

  const hashtagsInput = document.querySelector('.text__hashtags');
  const descriptionInput = document.querySelector('.text__description');

  window.config = {
    PHOTOS_COUNT: PHOTOS_COUNT,
    HIDE_CLASS: HIDE_CLASS,
    LIKES_MIN: LIKES_MIN,
    LIKES_MAX: LIKES_MAX,
    AVATARS_COUNT: AVATARS_COUNT,
    MAX_CONTROL_VALUE: MAX_CONTROL_VALUE,
    MIN_CONTROL_VALUE: MIN_CONTROL_VALUE,
    CONTROL_STEP: CONTROL_STEP,
    EFFECT_CLASS_START: EFFECT_CLASS_START,
    HASHTAGS_MAX_COUNT: HASHTAGS_MAX_COUNT,
    HASHTAGS_DELIMITER: HASHTAGS_DELIMITER,
    DESCRIPTION_MAX_LENGHT: DESCRIPTION_MAX_LENGHT,
    fileInput: fileInput,
    hashtagsInput: hashtagsInput,
    descriptionInput: descriptionInput,
    controlValue: controlValue,
    imagePreview: imagePreview,
    defaultScalePercent: defaultScalePercent
  };
})();
