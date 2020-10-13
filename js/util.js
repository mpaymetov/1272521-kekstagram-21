'use strict';

(function () {
  const PHOTOS_COUNT = 25;
  const HIDE_CLASS = 'hidden';

  const fileInput = document.querySelector('#upload-file');

  const getRandom = function (number = 1, offset = 0) {
    const result = Math.round(number * Math.random() + offset);
    return result;
  };

  const getRandomArray = function (array) {
    const element = array[getRandom(array.length - 1)];
    return element;
  };

  const getIntValue = function (element) {
    const valueString = element.value;
    const number = window.parseInt(valueString);
    return number;
  };

  const isAllArrStrElemUniq = (arr) => {
    const arrLowerCase = arr.map((element) => {
      return element.toLowerCase();
    });
    const unique = new Set(arrLowerCase);
    const isAllUniq = arr.length === unique.size;
    return isAllUniq;
  };

  window.util = {
    PHOTOS_COUNT: PHOTOS_COUNT,
    HIDE_CLASS: HIDE_CLASS,
    fileInput: fileInput,
    getRandom: getRandom,
    getRandomArray: getRandomArray,
    getIntValue: getIntValue,
    isAllArrStrElemUniq: isAllArrStrElemUniq
  };
})();
