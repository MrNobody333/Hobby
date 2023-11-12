/* Change Banner
================================= */
const mainRequest = document.querySelectorAll('.main__request');
const mainSubmit = [...document.querySelectorAll('.main__submit')];

mainSubmit[0].addEventListener('click', changeBanner);

function changeBanner() {
  const mainImg = document.querySelector('.main__img');
  const price = document.querySelector('.main__price');
  const price2 = document.querySelector('.main__price-2');

  mainSubmit[1].style.left = 'calc(50% - (42.3% / 2))';
  mainSubmit[1].style.bottom = '21%';
  price.classList.remove('price_active');
  mainImg.setAttribute('src', 'images/slider/banner-2.png');
  setTimeout(() => price2.classList.add('price_active'), 130);
  mainRequest[0].classList.remove('request_active');
  mainRequest[1].classList.add('request_active');
  mainRequest[1].style.backgroundImage = 'none';
  mainRequest[1].style.padding = '0';
  delayInterval();
}

/* Validate Form
================================= */
const form = document.forms;

form[0][0].addEventListener('blur', ()=> validateName(form[0][0]));
form[0][1].addEventListener('blur', ()=> validatePhone(form[0][1]));
mainSubmit[1].addEventListener('click', sendARequest);

function validateName(name) {
  if (name?.classList?.contains('name')) {
    if (!(/^[а-яА-Яa-zA-Z]+$/.test(name.value))) {
      name.style.outline = '2px solid #ff0000';
    } else {
      name.style.outline = 'none';
      return true;
    }
  }
  return false;
}

function validatePhone(phone) {
  if (phone?.classList?.contains('phone')) {
    if (!(/^[0-9]+$/.test(phone.value))) {
      phone.style.outline = '2px solid #ff0000';
    } else {
      phone.style.outline = 'none';
      return true;
    }
  }
  return false;
}

function sendARequest() {
  if (validateName(form[0][0]) && validatePhone(form[0][1])) {
    fetch('https://eoppor86w7aowc1.m.pipedream.net', {
      method: 'POST',
      body: new FormData(form[0]),
      headers: {'Content-type': 'application/json; charset=UTF-8'}
    })
    .then(response => response)
    .then(data => console.log(data))
    .catch(error => console.log(new Error(error)));

    showNotification();
  }
}

function showNotification() {
  mainRequest[1].classList.remove('request_active');
  mainRequest[2].classList.add('request_active');
  mainRequest[2].style.backgroundImage = 'none';
  mainRequest[2].style.padding = '0';
}

/* Main Slider
================================= */
let mainSlider = document.querySelector('.main-slider');
let sliderImg = document.querySelectorAll('.main-slider__img');
let pagination = document.querySelectorAll('.btn');
let currentIndex = 0;
let timerId = null;

window.addEventListener('resize', init);

function init() {
  mainSlider.style.transform = `translateX(-${currentIndex * sliderImg[0].offsetWidth}px)`;
}
init();

pagination.forEach((el, index, arr) => {
  el.addEventListener('click', () => {
    rollSlide(el, index, arr);
    delayInterval();
})});
    
function rollSlide(btn, index, arr) {
  arr[currentIndex].classList.remove('btn_active');
  btn.classList.add('btn_active');
  currentIndex = index;
  mainSlider.style.transform = `translateX(-${currentIndex * sliderImg[0].offsetWidth}px)`;
}

function rollInterval() {
  if (currentIndex < sliderImg.length - 1) {
    pagination[currentIndex].classList.remove('btn_active');
    currentIndex++;
    pagination[currentIndex].classList.add('btn_active');
  } else {
    pagination[currentIndex].classList.remove('btn_active');
    currentIndex = 0;
    pagination[currentIndex].classList.add('btn_active');
  }
  mainSlider.style.transform = `translateX(-${currentIndex * sliderImg[0].offsetWidth}px)`;
}

function delayInterval() {
  clearInterval(timerId);

  if (mainRequest[1].classList.contains('request_active')) {
    clearInterval(timerId);
  } else {
    timerId = setInterval(rollInterval, 5000);
  }
}
delayInterval();