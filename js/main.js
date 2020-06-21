'use strict';
var messages = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var names = ['Артем', 'Дмитрий', 'Алиса', 'Влад', 'Карина'];

var userDialog = document.querySelector('.container');

var similarListElement = userDialog.querySelector('.setup-similar-list');

var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomElement = function (arr) {
  var arrElement = arr[Math.floor(Math.random() * arr.length)];
  return arrElement;
};


var photoDescription = [];
for (var i = 0; i < 25; i++) {
  var photo = {
    url: './photos/getRandomNumber(1, 25).jpg',
    description: 'Description',
    likes: getRandomNumber(15, 200),
    comments: {
      avatar: 'img/avatar-(getRandomNumber(1, 6)).svg',
      message: getRandomElement(messages),
      name: getRandomElement(names)
    }
  };

  photoDescription.push(photo);
}

var renderPhoto = function (image) {
  var photoElement = pictureTemplate.cloneNode(true);

  photoElement.querySelector('.picture__img').src = image.url;
  photoElement.querySelector('.picture__likes').textContent = image.likes;
  photoElement.querySelector('.picture__comments').textContent = image.comments;

  return photoElement;
};

var fragment = document.createDocumentFragment();

for (var j = 0; j < photoDescription.length; j++) {
  fragment.appendChild(renderPhoto(photoDescription[j]));
}

similarListElement.appendChild(fragment);
userDialog.querySelector('.setup-similar').classList.remove('hidden');
