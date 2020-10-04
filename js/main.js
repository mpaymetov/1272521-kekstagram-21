'use strict';

const PHOTOS_COUNT = 25;
const LIKES_MIN = 15;
const LIKES_MAX = 200;
const AVATARS_COUNT = 6;

const NAMES = ["Иван", "Николай", "Михаил", "Алексей", "Владимир", "Сергей", "Артем"];
const MESSAGES = [
  "Всё отлично!",
  "В целом всё неплохо. Но не всё.",
  "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.",
  "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
  "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.",
  "Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!"
];

const getRandom = function (number = 1, offset = 0) {
  const result = Math.round(number * Math.random() + offset);
  return result;
};

const createRandomComment = function () {
  const commentAvatar = `img/avatar-${getRandom(AVATARS_COUNT - 1, 1)}.svg`;
  const commentMessage = MESSAGES[getRandom(MESSAGES.length - 1)];
  const commentName = NAMES[getRandom(NAMES.length - 1)];
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
  } while (getRandom());
  return comments;
};

const createPhotoDecr = function (number) {
  const url = `photos/${number}.jpg`;
  const description = `Фотография № ${number}`;
  const likes = getRandom(LIKES_MAX - LIKES_MIN, LIKES_MIN);
  const comments = createComments();
  const photo = {
    url: url,
    description: description,
    likes: likes,
    comments: comments
  };
  return photo;
};

const createPhotoDecrArr = function () {
  let photos = [];
  for (let i = 1; i <= PHOTOS_COUNT; i++) {
    photos.push(createPhotoDecr(i));
  }
  return photos;
};

const pictureTemplate = document.querySelector('#picture').content.querySelector('a');

const renderPicture = function (pictureData) {
  let element = pictureTemplate.cloneNode(true);
  element.querySelector('.picture__img').src = pictureData.url;
  element.querySelector('.picture__comments').innerText = pictureData.comments.length;
  element.querySelector('.picture__likes').innerText = pictureData.likes;
  return element;
};

const renderPictures = function () {
  const pictureContainer = document.querySelector('.pictures');
  const photoArr = createPhotoDecrArr();
  let fragment = document.createDocumentFragment();
  for (let i = 0; i < PHOTOS_COUNT; i++) {
    fragment.appendChild(renderPicture(photoArr[i]));
  }
  pictureContainer.appendChild(fragment);
};

renderPictures();
