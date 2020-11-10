'use strict';

(function () {
  const renderPicture = (pictureData, pictureTemplate) => {
    let element = pictureTemplate.cloneNode(true);
    element.querySelector('.picture__img').src = pictureData.url;
    element.querySelector('.picture__comments').innerText = pictureData.comments.length;
    element.querySelector('.picture__likes').innerText = pictureData.likes;
    return element;
  };

  window.picture = {
    renderPicture: renderPicture
  };
})();
