'use strict';

(function () {
  const renderPictures = function (photoArr) {
    let fragment = document.createDocumentFragment();
    for (let i = 0; i < photoArr.length; i++) {
      const photoData = photoArr[i];
      const photoElement = window.picture.renderPicture(photoData, window.config.pictureTemplate);
      fragment.appendChild(photoElement);
    }
    window.config.pictureContainer.appendChild(fragment);
  };

  window.gallery = {
    renderPictures: renderPictures
  };
})();
