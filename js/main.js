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

bigPicture.classList.add('hidden');


var uploadFile = document.getElementById('upload-file');
var imgUploadOverlay = document.querySelector('.img-upload__overlay');
var imgUploadCancel = document.querySelector('.cancel');
var body = document.querySelector('body');
var scaleControlSmaller = document.querySelector('.scale__control--smaller');
var scaleControlValue = document.querySelector('input[name="scale"]');
var scaleControlBigger = document.querySelector('.scale__control--bigger');
var img = document.querySelector('.img-upload__preview');
var MAX_SCALE_VALUE = 75;
var MIN_SCALE_VALUE = 25;
var SCALE_STEP = 25;

var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closePopup();
  }
};

var openPopup = function () {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onPopupEscPress);
};

uploadFile.addEventListener("change", function() {
  openPopup();
});

imgUploadCancel.addEventListener('click', function () {
  closePopup();
});

var setValue = function (operation) {
  var value = parseInt(scaleControlValue.value);

  if (operation === 'bigger') {
    scaleControlValue.value = value > MAX_SCALE_VALUE ? '100%' : value + SCALE_STEP + '%';
  } else {
    scaleControlValue.value = value < MIN_SCALE_VALUE ? '0%' : value - SCALE_STEP + '%';
  }

  document.querySelector('.img-upload__preview img').style.transform = 'scale(' + (parseInt(scaleControlValue.value)/100) + ')';
}
scaleControlSmaller.addEventListener('click', function () {
  setValue('smaller');
});
scaleControlBigger.addEventListener('click', function () {
  setValue('bigger');
});

var imgPic = document.querySelector('.img-upload__preview img');
var effectNone = document.querySelector('#effect-none');
var chrome = document.querySelector('#effect-chrome');
var sepia = document.querySelector('#effect-sepia');
var marvin = document.querySelector('#effect-marvin');
var phobos = document.querySelector('#effect-phobos');
var heat = document.querySelector('#effect-heat');
var elem = document.querySelector('.effect-level__line');
var pinElem = document.querySelector('.effect-level__pin');
var effectLevel = document.querySelector('.effect-level__value');

var mouseup = function (evt) {
  var newLeft = pinElem.offsetLeft;

  pinElem.style.left = newLeft + 'px';

  return newLeft;
}

elem.classList.add('visually-hidden');

var setEffect = function (evt) {
  var button = evt.target;
  var sliderWidth = elem.offsetWidth;

  switch (button.id) {
  case 'effect-none' :
    imgPic.setAttribute("class", "effects__preview--none");
    imgPic.style.filter = 'none';
    elem.classList.add('visually-hidden');
    break;

  case 'effect-chrome' :
    elem.classList.remove('visually-hidden');
    sliderWidth = elem.offsetWidth;
    effectLevel.setAttribute('value', 100);
    pinElem.style.left = sliderWidth + 'px';
    imgPic.setAttribute("class", "effects__preview--chrome");
    imgPic.style.filter = 'grayscale(' + (mouseup(evt) / sliderWidth) + ')';
    break;

  case 'effect-sepia' :
    elem.classList.remove('visually-hidden');
    sliderWidth = elem.offsetWidth;
    effectLevel.setAttribute('value', 100);
    pinElem.style.left = sliderWidth + 'px';
    imgPic.setAttribute("class", "effects__preview--sepia");
    imgPic.style.filter = 'sepia(' + (mouseup(evt) / sliderWidth) + ')';
    break;

  case 'effect-marvin' :
    elem.classList.remove('visually-hidden');
    sliderWidth = elem.offsetWidth;
    effectLevel.setAttribute('value', 100);
    pinElem.style.left = sliderWidth + 'px';
    imgPic.setAttribute("class", "effects__preview--marvin");
    imgPic.style.filter = 'invert(' + ((100 * mouseup(evt)) / sliderWidth) + '%)';
    break;

  case 'effect-phobos' :
    elem.classList.remove('visually-hidden');
    sliderWidth = elem.offsetWidth;
    effectLevel.setAttribute('value', 100);
    pinElem.style.left = sliderWidth + 'px';
    imgPic.setAttribute("class", "effects__preview--phobos");
    imgPic.style.filter = 'blur(' + ((3 * mouseup(evt)) / sliderWidth) + 'px)';
    break;

  case 'effect-heat':
    elem.classList.remove('visually-hidden');
    sliderWidth = elem.offsetWidth;
    effectLevel.setAttribute('value', 100);
    pinElem.style.left = sliderWidth + 'px';
    imgPic.setAttribute("class", "effects__preview--heat");
    imgPic.style.filter = 'brightness(' + (((2 * mouseup(evt)) / sliderWidth) + 1) + ')';
    break;
}
};

document.querySelector('.effects__list').addEventListener('click', function (evt) {
  setEffect(evt);
});

pinElem.addEventListener('mouseup', mouseup);


document.querySelector('.text__hashtags').addEventListener('input', function() {
  var re = /^#[а-яА-Яa-zA-Z0-9]*$/;
  var hashtag = document.querySelector('.text__hashtags').value;
  var characterArray = hashtag.split('');

  for (var i = 0; i < hashtag.length; i++) {
    re.test(characterArray[i]) ? document.querySelector('.text__hashtags').setCustomValidity('go') : document.querySelector('.text__hashtags').setCustomValidity('wrong hashtag');
  };

});
