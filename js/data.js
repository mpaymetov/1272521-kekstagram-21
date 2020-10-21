'use strict';

(function () {
  const NAMES = ["Иван", "Николай", "Михаил", "Алексей", "Владимир", "Сергей", "Артем"];
  const MESSAGES = [
    "Всё отлично!",
    "В целом всё неплохо. Но не всё.",
    "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.",
    "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
    "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.",
    "Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!"
  ];

  const createRandomComment = function () {
    const randomAvatarNumber = window.util.getRandom(window.config.AVATARS_COUNT - 1, 1);
    const commentAvatar = `img/avatar-${randomAvatarNumber}.svg`;
    const commentMessage = window.util.getRandomArray(MESSAGES);
    const commentName = window.util.getRandomArray(NAMES);
    const comment = {
      avatar: commentAvatar,
      message: commentMessage,
      name: commentName
    };
    return comment;
  };

  const createComments = function () {
    const comments = [];
    do {
      const comment = createRandomComment();
      comments.push(comment);
    } while (window.util.getRandom());
    return comments;
  };

  const createPhotoData = function (number) {
    const url = `photos/${number}.jpg`;
    const description = `Фотография № ${number}`;
    const likes = window.util.getRandom(window.config.LIKES_MAX - window.config.LIKES_MIN, window.config.LIKES_MIN);
    const comments = createComments();
    const photo = {
      url: url,
      description: description,
      likes: likes,
      comments: comments
    };
    return photo;
  };

  const createPhotoDataArray = function (photosCount) {
    let photos = [];
    for (let i = 1; i <= photosCount; i++) {
      const photoDescription = createPhotoData(i);
      photos.push(photoDescription);
    }
    return photos;
  };

  window.data = {
    createPhotoDataArray: createPhotoDataArray
  };
})();
