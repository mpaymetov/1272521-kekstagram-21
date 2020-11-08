'use strict';

(function () {
  const renderPictures = (photoArr, pictureContainer, pictureTemplate) => {
    let fragment = document.createDocumentFragment();
    for (let i = 0; i < photoArr.length; i++) {
      const photoData = photoArr[i];
      const photoElement = window.picture.renderPicture(photoData, pictureTemplate);
      fragment.appendChild(photoElement);
    }
    pictureContainer.appendChild(fragment);
  };

  const onContentLoad = (photoData) => {
    const pictureContainer = document.querySelector('.pictures');
    const pictureTemplateBlock = document.querySelector('#picture');
    const pictureTemplate = pictureTemplateBlock.content.querySelector('a');

    renderPictures(photoData, pictureContainer, pictureTemplate);
  };

  window.gallery = {
    onContentLoad: onContentLoad
  };
})();
