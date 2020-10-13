'use strict';

(function () {
  const renderPictures = function (photoArr, pictureContainer, pictureTemplate) {
    let fragment = document.createDocumentFragment();
    for (let i = 0; i < photoArr.length; i++) {
      const photoData = photoArr[i];
      const photoElement = window.picture.renderPicture(photoData, pictureTemplate);
      fragment.appendChild(photoElement);
    }
    pictureContainer.appendChild(fragment);
  };

  window.gallery = {
    renderPictures: renderPictures
  };
})();
