'use strict';

const toLog = function () {

  const date = new Date(),
    hours = date.getHours(),
    day = date.getDay(),
    days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

  function greeting() {
    let goodDay,
      dayNow;

    if (hours >= 3 && hours < 9) {
      goodDay = 'Доброе утро';
    } else if (hours >= 9 && hours < 15) {
      goodDay = 'Добрый день';
    } else if (hours >= 15 && hours < 21) {
      goodDay = 'Добрый вечер';
    } else {
      goodDay = 'Доброй ночи';
    }

    days.forEach((item, index) => {
      if (index === day) {
        dayNow = item;
      }
    });
    return {
      goodDay,
      dayNow
    };
  }

  function toNewYear() {
    const newYearDate = new Date('January 1 2021').getTime(),
      nowDate = new Date().getTime(),
      timeRemaining = (newYearDate - nowDate) / 1000,
      timeRemainingDays = Math.floor(timeRemaining / 60 / 60 / 24);
    return timeRemainingDays;
  }

  function declOfNum(n, titles) {
    return n + ' ' + titles[n % 10 === 1 && n % 100 !== 11 ?
      0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];
  }

  const greetingFun = greeting();

  console.log(`${greetingFun.goodDay}
Сегодня: ${greetingFun.dayNow}
Текущее время: ${date.toLocaleTimeString('en')}
До Нового Года осталось: ${declOfNum(toNewYear(), ['день', 'дня', 'дней'])}`);

};

toLog();