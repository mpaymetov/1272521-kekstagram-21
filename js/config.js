'use strict';

(function () {
  const PHOTOS_COUNT = 25;
  const HIDE_CLASS = 'hidden';

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

  const pictureContainer = document.querySelector('.pictures');
  const pictureTemplateBlock = document.querySelector('#picture');
  const pictureTemplate = pictureTemplateBlock.content.querySelector('a');

  const dataLoadUrl = "https://21.javascript.pages.academy/kekstagram/data";

  window.config = {
    PHOTOS_COUNT: PHOTOS_COUNT,
    HIDE_CLASS: HIDE_CLASS,
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
    defaultScalePercent: defaultScalePercent,
    pictureContainer: pictureContainer,
    pictureTemplate: pictureTemplate,
    dataLoadUrl: dataLoadUrl
  };
})();
