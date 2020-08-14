'use strict';

let week = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
let date = new Date();

for (let i = 0; i < week.length; i++) {
  let dayOfWeek = week[i];
  if (i === date.getDay()) {
    dayOfWeek = dayOfWeek.bold();
  } else if (i > 5 || i === 0) {
    dayOfWeek = dayOfWeek.italics();
  }

  let div = document.createElement('div');
  div.innerHTML = dayOfWeek;
  document.body.appendChild(div);
}