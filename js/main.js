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

const getRandomArray = function (array) {
  const element = array[getRandom(array.length - 1)];
  return element;
};

const createRandomComment = function () {
  const randomAvatarNumber = getRandom(AVATARS_COUNT - 1, 1);
  const commentAvatar = `img/avatar-${randomAvatarNumber}.svg`;
  const commentMessage = getRandomArray(MESSAGES);
  const commentName = getRandomArray(NAMES);
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

const createPhotoData = function (number) {
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

const createPhotoDataArray = function (photosCount) {
  let photos = [];
  for (let i = 1; i <= photosCount; i++) {
    const photoDescription = createPhotoData(i);
    photos.push(photoDescription);
  }
  return photos;
};

const pictureTemplateBlock = document.querySelector('#picture');
const pictureTemplate = pictureTemplateBlock.content.querySelector('a');

const renderPicture = function (pictureData) {
  let element = pictureTemplate.cloneNode(true);
  element.querySelector('.picture__img').src = pictureData.url;
  element.querySelector('.picture__comments').innerText = pictureData.comments.length;
  element.querySelector('.picture__likes').innerText = pictureData.likes;
  return element;
};

const renderPictures = function () {
  const pictureContainer = document.querySelector('.pictures');
  const photoArr = createPhotoDataArray(PHOTOS_COUNT);
  let fragment = document.createDocumentFragment();
  for (let i = 0; i < PHOTOS_COUNT; i++) {
    const photoData = photoArr[i];
    const photoElement = renderPicture(photoData);
    fragment.appendChild(photoElement);
  }
  pictureContainer.appendChild(fragment);
};

renderPictures();
