'use strict';

(function () {
  const MAX_CONTROL_VALUE = 100;
  const MIN_CONTROL_VALUE = 25;
  const CONTROL_STEP = 25;
  const EFFECT_CLASS_START = 'effects__preview--';

  const controlValue = document.querySelector('.scale__control--value');
  const imagePreview = document.querySelector('.img-upload__preview');
  const defaultScalePercent = 100;

  const effectLevelLine = document.querySelector('.effect-level__line');
  const effectLevelDepth = document.querySelector('.effect-level__depth');
  const effectLevelValue = document.querySelector('.effect-level__value');

  const effectLevelBar = document.querySelector('.img-upload__effect-level');
  let imageEffect = 'none';

  const setScale = function (element, percent) {
    const scaleValue = percent / 100;
    element.style = `transform: scale(${scaleValue})`;
  };

  const valueUp = function () {
    let number = window.util.getIntValue(controlValue);
    if ((number + CONTROL_STEP) <= MAX_CONTROL_VALUE) {
      number += CONTROL_STEP;
      controlValue.value = number + '%';
      setScale(imagePreview, number);
    }
  };

  const valueDown = function () {
    let number = window.util.getIntValue(controlValue);
    if ((number - CONTROL_STEP) >= MIN_CONTROL_VALUE) {
      number -= CONTROL_STEP;
      controlValue.value = number + '%';
      setScale(imagePreview, number);
    }
  };

  const getEffectList = function () {
    let effectsList = [];
    const effectButtons = document.querySelectorAll('.effects__radio');
    for (let i = 0; i < effectButtons.length; i++) {
      const effect = effectButtons[i].value;
      effectsList.push(effect);
    }
    return effectsList;
  };

  const removeAllEffectClasses = function () {
    const effectsList = getEffectList();
    for (let i = 0; i < effectsList.length; i++) {
      const effectClassName = EFFECT_CLASS_START + effectsList[i];
      if (imagePreview.classList.contains(effectClassName)) {
        imagePreview.classList.remove(effectClassName);
      }
    }
  };

  const onEffectsChange = function (evt) {
    if (evt.target && evt.target.matches('input[type="radio"]')) {
      removeAllEffectClasses();
      imagePreview.style = '';
      imageEffect = evt.target.value;
      if (imageEffect !== 'none') {
        const effectClass = EFFECT_CLASS_START + imageEffect;
        imagePreview.classList.add(effectClass);
        if (effectLevelBar.classList.contains(window.util.HIDE_CLASS)) {
          effectLevelBar.classList.remove(window.util.HIDE_CLASS);
        }
      } else {
        effectLevelBar.classList.add(window.util.HIDE_CLASS);
      }
    }
  };

  const setEffectStyle = function (level) {
    const levelPercent = level * 100;
    let effectStyle = '';
    if (imageEffect === 'chrome') {
      effectStyle = 'filter: grayscale(' + level + ')';
    }
    if (imageEffect === 'sepia') {
      effectStyle = 'filter: sepia(' + level + ')';
    }
    if (imageEffect === 'marvin') {
      effectStyle = 'filter: invert(' + levelPercent + '%)';
    }
    if (imageEffect === 'phobos') {
      const effectValue = level * 3;
      effectStyle = 'filter: blur(' + effectValue + 'px)';
    }
    if (imageEffect === 'heat') {
      const effectValue = level * 2 + 1;
      effectStyle = 'filter: brightness(' + effectValue + ')';
    }
    imagePreview.style = effectStyle;
  };

  const onPinMove = function () {
    const effectLevelLineWidth = effectLevelLine.offsetWidth;
    const effectLevelDepthWidth = effectLevelDepth.offsetWidth;
    const level = (effectLevelDepthWidth / effectLevelLineWidth).toFixed(2);
    const levelPercent = level * 100;
    effectLevelValue.value = levelPercent;
    setEffectStyle(level);
  };

  window.preview = {
    imagePreview: imagePreview,
    defaultScalePercent: defaultScalePercent,
    effectLevelBar: effectLevelBar,
    setScale: setScale,
    valueUp: valueUp,
    valueDown: valueDown,
    onEffectsChange: onEffectsChange,
    onPinMove: onPinMove
  };
})();
