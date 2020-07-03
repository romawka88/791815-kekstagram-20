'use strict';
var PHOTOS_AMOUNT = 25;
var PHOTOS = [];
var messages = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var names = ['Артем', 'Дмитрий', 'Алиса', 'Влад', 'Карина'];
var description = ['Жизнь похожа на фотокамеру: вам просто нужно смотреть на нее с улыбкой.', 'Жизнь похожа на фотографию. Мы развиваемся только из негативов.', 'Не нужно думать позитивно, нужно позитивно жить.'];

var getRandomNumber = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomElement = function(arr) {
  var arrElement = arr[Math.floor(Math.random() * arr.length)];
  return arrElement;
};

var getComments = function() {
  var comments = [];
  for (var i = 0; i < getRandomNumber(1, 25); i++) {
    var comment = {
      avatar: 'img/avatar-' + getRandomNumber(1, 6) + '.svg',
      message: getRandomElement(messages),
      name: getRandomElement(names)
    };

    comments.push(comment);
  }

  return comments;
};

var uploadPhoto = function() {
  for (var i = 0; i < PHOTOS_AMOUNT; i++) {
    var photo = {
      url: './photos/' + (i + 1) + '.jpg',
      description: getRandomElement(description),
      likes: getRandomNumber(15, 200),
      comments: getComments()
    };

    PHOTOS.push(photo);
  }
};

uploadPhoto();

var newPhoto = document.querySelector('.pictures');

var pictureTemplate = document.querySelector('#picture')
    .content;

var renderPhoto = function(image) {
  var photoElement = pictureTemplate.cloneNode(true);

  photoElement.querySelector('.picture__img').src = image.url;
  photoElement.querySelector('.picture__likes').textContent = image.likes;
  photoElement.querySelector('.picture__comments').textContent = image.comments.length;

  return photoElement;
};

var fragment = document.createDocumentFragment();

for (var j = 0; j < PHOTOS.length; j++) {
  fragment.appendChild(renderPhoto(PHOTOS[j]));
}

newPhoto.appendChild(fragment);

var bigPicture = document.querySelector('.big-picture');
var socialComment = document.querySelector('.social__comment-count');
var commentsLoader = document.querySelector('.comments-loader');
var body = document.querySelector('body');
bigPicture.classList.remove('hidden');
socialComment.classList.add('hidden');
commentsLoader.classList.add('hidden');
body.classList.add ('modal-open');

var renderPhotoInformation = function (image) {

  for (var i = 0; i < PHOTOS_AMOUNT; i++) {
    bigPicture.querySelector('.big-picture__img img').src = image.url;
    bigPicture.querySelector('.likes-count').textContent = image.likes;
    bigPicture.querySelector('.comments-count').textContent = image.comments.length;
    bigPicture.querySelector('.social__picture').src = image.comments[i].avatar;
    bigPicture.querySelector('.social__picture').alt = image.comments[i].name;
    bigPicture.querySelector('.social__text').textContent = image.comments[i].message;
    bigPicture.querySelector('.social__caption').textContent = image.description;

  return bigPicture;
  }
};

renderPhotoInformation(PHOTOS[0]);
