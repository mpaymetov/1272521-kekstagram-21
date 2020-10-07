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
const EFFECT_CLASS_START = 'effects__preview--';
const MAX_CONTROL_VALUE = 100;
const MIN_CONTROL_VALUE = 25;
const CONTROL_STEP = 25;
const HIDE_CLASS = 'hidden';

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

const fileInput = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const modalCloseButton = document.querySelector('#upload-cancel');

const onModalEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeModal();
  }
};

const openModal = function () {
  imgUploadOverlay.classList.remove(HIDE_CLASS);
  body.classList.add('modal-open');
  document.addEventListener('keydown', onModalEscPress);
};

const closeModal = function () {
  imgUploadOverlay.classList.add(HIDE_CLASS);
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onModalEscPress);
};

fileInput.addEventListener('change', function () {
  openModal();
});

modalCloseButton.addEventListener('click', function () {
  closeModal();
});

openModal();

const controlSmallerButton = document.querySelector('.scale__control--smaller');
const controlBiggerButton = document.querySelector('.scale__control--bigger');
const controlValue = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview');

const getIntValue = function (element) {
  const valueString = element.value;
  let number = window.parseInt(valueString);
  return number;
};

const setScale = function (element, percent) {
  const scaleValue = percent / 100;
  element.style = `transform: scale(${scaleValue})`;
};

const valueUp = function () {
  let number = getIntValue(controlValue);
  if ((number + CONTROL_STEP) <= MAX_CONTROL_VALUE) {
    number += CONTROL_STEP;
    controlValue.value = number + '%';
    setScale(imagePreview, number);
  }
};

const valueDown = function () {
  let number = getIntValue(controlValue);
  if ((number - CONTROL_STEP) >= MIN_CONTROL_VALUE) {
    number -= CONTROL_STEP;
    controlValue.value = number + '%';
    setScale(imagePreview, number);
  }
};

controlSmallerButton.addEventListener('click', function () {
  valueDown();
});

controlBiggerButton.addEventListener('click', function () {
  valueUp();
});

const form = document.querySelector('.img-upload__form');

const getEffectList = function () {
  let effectsList = [];
  const effectButtons = document.querySelectorAll('.effects__radio');
  for (let i = 0; i < effectButtons.length; i++) {
    const effect = effectButtons[i].value;
    effectsList.push(effect);
  }
  return effectsList;
};

const effectsList = getEffectList();

const removeAllEffectClasses = function () {
  for (let i = 0; i < effectsList.length; i++) {
    const effectClassName = EFFECT_CLASS_START + effectsList[i];
    if (imagePreview.classList.contains(effectClassName)) {
      imagePreview.classList.remove(effectClassName);
    }
  }
};

const effectLevelBar = document.querySelector('.img-upload__effect-level');
let imageEffect = 'none';

const onEffectsChange = function (evt) {
  if (evt.target && evt.target.matches('input[type="radio"]')) {
    removeAllEffectClasses();
    imagePreview.style = '';
    imageEffect = evt.target.value;
    if (imageEffect !== 'none') {
      const effectClass = EFFECT_CLASS_START + imageEffect;
      imagePreview.classList.add(effectClass);
      if (effectLevelBar.classList.contains(HIDE_CLASS)) {
        effectLevelBar.classList.remove(HIDE_CLASS);
      }
    } else {
      effectLevelBar.classList.add(HIDE_CLASS);
    }
  }
};

form.addEventListener('change', onEffectsChange);

const effectLevelPin = document.querySelector('.effect-level__pin');
const effectLevelLine = document.querySelector('.effect-level__line');
const effectLevelDepth = document.querySelector('.effect-level__depth');
const effectLevelValue = document.querySelector('.effect-level__value');

const setEffectStyle = function (level) {
  const levelPercent = level * 100;
  let effectStyle = '';
  if (imageEffect === 'chrome') {
    effectStyle = 'filter: grayscale(' + level + ')';
  }
  if (imageEffect === 'sepia') {
    effectStyle = 'filter: sepia(' + level + ')';
  }
  if (imageEffect === 'marvin') {
    effectStyle = 'filter: invert(' + levelPercent + '%)';
  }
  if (imageEffect === 'phobos') {
    const effectValue = level * 3;
    effectStyle = 'filter: blur(' + effectValue + 'px)';
  }
  if (imageEffect === 'heat') {
    const effectValue = level * 2 + 1;
    effectStyle = 'filter: brightness(' + effectValue + ')';
  }
  imagePreview.style = effectStyle;
};

const onPinMove = function () {
  const effectLevelLineWidth = effectLevelLine.offsetWidth;
  const effectLevelDepthWidth = effectLevelDepth.offsetWidth;
  const level = (effectLevelDepthWidth / effectLevelLineWidth).toFixed(2);
  const levelPercent = level * 100;
  effectLevelValue.value = levelPercent;
  setEffectStyle(level);
};

effectLevelPin.addEventListener('mouseup', onPinMove);
