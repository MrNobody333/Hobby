const mainRequest = document.querySelectorAll('.main__request');
const mainSubmit = [...document.querySelectorAll('.main__submit')];
const form = document.forms;

form[0][0].addEventListener('blur', ()=> validateName(form[0][0]));
form[0][1].addEventListener('blur', ()=> validatePhone(form[0][1]));

mainSubmit[0].addEventListener('click', changeBanner);
mainSubmit[1].addEventListener('click', sendARequest);

function changeBanner() {
  const mainImg = document.querySelector('.main__img');
  const price = document.querySelector('.main__price');
  const price2 = document.querySelector('.main__price-2');

  mainSubmit[1].style.left = 'calc(50% - (37% / 2))';
  mainSubmit[1].style.bottom = '21%';
  price.classList.remove('price_active');
  mainImg.setAttribute('src', 'images/slider/banner-2.png');
  setTimeout(() => price2.classList.add('price_active'), 130);
  mainRequest[0].classList.remove('request_active');
  mainRequest[1].classList.add('request_active');
  mainRequest[1].style.backgroundImage = 'none';
  mainRequest[1].style.padding = '0';
}

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