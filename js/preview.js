'use strict';

(function () {
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
    let number = window.util.getIntValue(window.config.controlValue);
    if ((number + window.config.CONTROL_STEP) <= window.config.MAX_CONTROL_VALUE) {
      number += window.config.CONTROL_STEP;
      window.config.controlValue.value = number + '%';
      setScale(window.config.imagePreview, number);
    }
  };

  const valueDown = function () {
    let number = window.util.getIntValue(window.config.controlValue);
    if ((number - window.config.CONTROL_STEP) >= window.config.MIN_CONTROL_VALUE) {
      number -= window.config.CONTROL_STEP;
      window.config.controlValue.value = number + '%';
      setScale(window.config.imagePreview, number);
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
      const effectClassName = window.config.EFFECT_CLASS_START + effectsList[i];
      if (window.config.imagePreview.classList.contains(effectClassName)) {
        window.config.imagePreview.classList.remove(effectClassName);
      }
    }
  };

  const onEffectsChange = function (evt) {
    if (evt.target && evt.target.matches('input[type="radio"]')) {
      removeAllEffectClasses();
      window.config.imagePreview.style = '';
      window.config.controlValue.value = window.config.defaultScalePercent + '%';
      imageEffect = evt.target.value;
      if (imageEffect !== 'none') {
        const effectClass = window.config.EFFECT_CLASS_START + imageEffect;
        window.config.imagePreview.classList.add(effectClass);
        if (effectLevelBar.classList.contains(window.config.HIDE_CLASS)) {
          effectLevelBar.classList.remove(window.config.HIDE_CLASS);
        }
      } else {
        effectLevelBar.classList.add(window.config.HIDE_CLASS);
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
    window.config.imagePreview.style = effectStyle;
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
    effectLevelBar: effectLevelBar,
    setScale: setScale,
    valueUp: valueUp,
    valueDown: valueDown,
    removeAllEffectClasses: removeAllEffectClasses,
    onEffectsChange: onEffectsChange,
    onPinMove: onPinMove
  };
})();
