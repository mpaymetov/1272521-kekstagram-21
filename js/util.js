'use strict';

(function () {
  const getIntValue = (element) => {
    const valueString = element.value;
    return window.parseInt(valueString);
  };

  const isAllArrStrElemUniq = (arr) => {
    const arrLowerCase = arr.map((element) => {
      return element.toLowerCase();
    });
    const unique = new Set(arrLowerCase);
    const isAllUniq = arr.length === unique.size;
    return isAllUniq;
  };

  const showError = (message) => {
    alert(message); // eslint-disable-line no-alert
  };

  window.util = {
    getIntValue: getIntValue,
    isAllArrStrElemUniq: isAllArrStrElemUniq,
    showError: showError
  };
})();
