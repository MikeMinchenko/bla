'use strict';
// вариант a
let clock = function () {
  let date = new Date(),
    days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сенятбря', 'Октября', 'Ноября', 'Декабря'],
    hours = date.getHours(),
    minutes = date.getMinutes(),
    seconds = date.getSeconds(),
    year = date.getFullYear(),
    month = months[date.getMonth()],
    day = days[date.getDay()],
    dayOfMonth = date.getDate(),
    oClock,
    minutesName,
    secondsName;
  // склоняем часы
  if (hours === 1 || hours === 21) {
    oClock = 'час';
  } else if ((2 <= hours && hours <= 4) || (22 === hours || hours === 23)) {
    oClock = 'часа';
  } else {
    oClock = 'часов';
  }
  // склоняем минуты
  if (minutes === 1 || minutes === 21 || minutes === 31 || minutes === 41 || minutes === 51) {
    minutesName = 'минута';
  } else if ((2 <= minutes && minutes <= 4) || (22 <= minutes && minutes <= 24) || (32 <= minutes && minutes <= 34) || (42 <= minutes && minutes <= 44) || (52 <= minutes && minutes <= 54)) {
    minutesName = 'минуты';
  } else {
    minutesName = 'минут';
  }
  // склоняем секунды
  if (seconds === 1 || seconds === 21 || seconds === 31 || seconds === 41 || seconds === 51) {
    secondsName = 'секунда';
  } else if ((2 <= seconds && seconds <= 4) || (22 <= seconds && seconds <= 24) || (32 <= seconds && seconds <= 34) || (42 <= seconds && seconds <= 44) || (52 <= seconds && seconds <= 54)) {
    secondsName = 'секунды';
  } else {
    secondsName = 'секунд';
  }
  // выводим на экран
  document.getElementById('clock').innerHTML = `Сегодня ${day}, ${dayOfMonth} ${month} ${year} года, ${hours} ${oClock} ${minutes} ${minutesName} ${seconds} ${secondsName}`;

};
setInterval(clock, 1000);
clock();

// вариант b

/*let clock = function () {
  let date = new Date(),

    hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours(),
    minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes(),
    seconds = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds(),
    year = date.getFullYear(),
    month = (date.getMonth() < 10) ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1),
    day = (date.getDate() < 10) ? '0' + date.getDate() : date.getDate();
  document.getElementById('clock').innerHTML = `${day}.${month}.${year} - ${hours}:${minutes}:${seconds}`;
  console.log(date.getMonth());
};
setInterval(clock, 1000);
clock(); */