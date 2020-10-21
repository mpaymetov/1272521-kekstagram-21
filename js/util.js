'use strict';

(function () {
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

  const showError = function (message) {
    alert(message); // eslint-disable-line no-alert
  };

  window.util = {
    getIntValue: getIntValue,
    isAllArrStrElemUniq: isAllArrStrElemUniq,
    showError: showError
  };
})();
