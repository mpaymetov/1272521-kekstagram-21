'use strict';

(function () {
  const controlValue = document.querySelector('.scale__control--value');
  const imagePreview = document.querySelector('.img-upload__preview');
  const defaultScalePercent = 100;

  const effectLevelLine = document.querySelector('.effect-level__line');
  const effectLevelDepth = document.querySelector('.effect-level__depth');
  const effectLevelValue = document.querySelector('.effect-level__value');

  const form = document.querySelector('.img-upload__form');
  const controlSmallerButton = document.querySelector('.scale__control--smaller');
  const controlBiggerButton = document.querySelector('.scale__control--bigger');
  const effectLevelPin = document.querySelector('.effect-level__pin');
  const effectLevelBar = document.querySelector('.img-upload__effect-level');
  let imageEffect = 'none';

  const setScale = (element, percent) => {
    const scaleValue = percent / 100;
    element.style = `transform: scale(${scaleValue})`;
  };

  const setPreviewDefaultScale = () => {
    setScale(imagePreview, defaultScalePercent);
  };

  const valueUp = () => {
    let number = window.util.getIntValue(controlValue);
    if ((number + window.config.CONTROL_STEP) <= window.config.MAX_CONTROL_VALUE) {
      number += window.config.CONTROL_STEP;
      controlValue.value = number + '%';
      setScale(imagePreview, number);
    }
  };

  const valueDown = () => {
    let number = window.util.getIntValue(controlValue);
    if ((number - window.config.CONTROL_STEP) >= window.config.MIN_CONTROL_VALUE) {
      number -= window.config.CONTROL_STEP;
      controlValue.value = number + '%';
      setScale(imagePreview, number);
    }
  };

  const getEffectList = () => {
    let effectsList = [];
    const effectButtons = document.querySelectorAll('.effects__radio');
    for (let i = 0; i < effectButtons.length; i++) {
      const effect = effectButtons[i].value;
      effectsList.push(effect);
    }
    return effectsList;
  };

  const removeAllEffectClasses = () => {
    const effectsList = getEffectList();
    for (let i = 0; i < effectsList.length; i++) {
      const effectClassName = window.config.EFFECT_CLASS_START + effectsList[i];
      if (imagePreview.classList.contains(effectClassName)) {
        imagePreview.classList.remove(effectClassName);
      }
    }
  };

  const onEffectsChange = (evt) => {
    if (evt.target && evt.target.matches('input[type="radio"]')) {
      removeAllEffectClasses();
      imagePreview.style = '';
      controlValue.value = defaultScalePercent + '%';
      imageEffect = evt.target.value;
      if (imageEffect !== 'none') {
        const effectClass = window.config.EFFECT_CLASS_START + imageEffect;
        imagePreview.classList.add(effectClass);
        if (effectLevelBar.classList.contains(window.config.HIDE_CLASS)) {
          effectLevelBar.classList.remove(window.config.HIDE_CLASS);
        }
      } else {
        effectLevelBar.classList.add(window.config.HIDE_CLASS);
      }
    }
  };

  const setEffectStyle = (level) => {
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

  const onPinMove = () => {
    const effectLevelLineWidth = effectLevelLine.offsetWidth;
    const effectLevelDepthWidth = effectLevelDepth.offsetWidth;
    const level = (effectLevelDepthWidth / effectLevelLineWidth).toFixed(2);
    const levelPercent = level * 100;
    effectLevelValue.value = levelPercent;
    setEffectStyle(level);
  };

  window.preview = {
    effectLevelBar: effectLevelBar,
    controlSmallerButton: controlSmallerButton,
    controlBiggerButton: controlBiggerButton,
    effectLevelPin: effectLevelPin,
    form: form,
    setScale: setScale,
    setPreviewDefaultScale: setPreviewDefaultScale,
    valueUp: valueUp,
    valueDown: valueDown,
    removeAllEffectClasses: removeAllEffectClasses,
    onEffectsChange: onEffectsChange,
    onPinMove: onPinMove
  };
})();
