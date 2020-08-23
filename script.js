'use strict';

let userName = document.querySelector('#name'),
  regButton = document.querySelector('#registration'),
  authButton = document.querySelector('#authorization'),
  userList = document.querySelector('#user-list');



// создаем массив
let userData = [];
// Запись в localStorage
let toLocalStorage = function () {
  let jsonUserData = JSON.stringify(userData);
  localStorage.setItem('data', jsonUserData);
};
// Вытаскиваем значения из localStorage
let fromLocaleStorage = function () {
  if (localStorage.getItem('data')) {
    userData = localStorage.getItem('data');
    userData = JSON.parse(userData);
  }
};
// рендер страницы
let render = function () {
  userList.textContent = '';
  userData.forEach(function (item) {
    let newElem = document.createElement('li');
    newElem.innerHTML = `Имя: <span class='firstname'>${item.firstName}</span>, Фамилия: ${item.lastName}, Зарегестрирован: ${item.date} <button id="delete" style="padding: 5px 10px">удалить</button>`;
    userList.append(newElem);

    let deleteBtn = newElem.querySelector('#delete');
    // действие по клику на кнопку удалить
    deleteBtn.addEventListener('click', function () {
      let elem = this.closest('li');
      let elemIndex;

      for (let i in userData) {

        if (userData[i].firstName === elem.querySelector('.firstname').textContent) {
          elemIndex = i;
        }
      }
      userData.splice(elemIndex, 1);
      render();
    });
  });
  toLocalStorage();
};
// действие по клику на кнопку регистрации
regButton.addEventListener('click', function () {
  let newUser = {
      firstName: '',
      lastName: '',
      login: '',
      password: '',
      date: ''
    },
    date = new Date(),
    day = date.getDate(),
    months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'],
    month = months[date.getMonth()],
    year = date.getFullYear(),
    hours = date.getHours(),
    minutes = date.getMinutes(),
    seconds = date.getSeconds(),
    firstAndLastName;

  if (hours < 10) {
    hours = '0' + hours;
  } else if (minutes < 10) {
    minutes = '0' + minutes;
  } else if (seconds < 10) {
    seconds = '0' + seconds;
  }

  do {
    firstAndLastName = prompt('Введите Имя и Фамилию через пробел');
  } while (firstAndLastName.split(' ').length - 1 > 1 || firstAndLastName.split(' ').length - 1 < 1);
  firstAndLastName = firstAndLastName.split(' ');
  newUser.firstName = firstAndLastName[0];
  newUser.lastName = firstAndLastName[1];

  newUser.login = prompt('Введите логин');
  newUser.password = prompt('Ведите пароль');
  newUser.date = `${day} ${month} ${year} г., ${hours}:${minutes}:${seconds}`;
  userData.push(newUser);
  render();
  toLocalStorage();
});
// действие по клику на кнопку авторизации
authButton.addEventListener('click', function () {
  let login = prompt('Введите логин'),
    password = prompt('Ведите пароль');

  userData.forEach(function (item) {
    if (item.login === login && item.password === password) {
      userName.textContent = item.firstName;
    } else {
      alert('Пользователь не найден');
    }
  });

});
fromLocaleStorage();
render();