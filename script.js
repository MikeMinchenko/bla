'use strict';

let week = [ 'Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота' ];
let date = new Date();

for (let i = 0; i < week.length; i++) {
	let dayOfWeek = week[i];
	let div = document.createElement('div');
	div.innerHTML = dayOfWeek;

	if ((i === 6 || i === 0) && i === date.getDay()) {
		div.style.cssText = 'font-style: italic; font-weight: bold';
	} else if (i === 6 || i === 0) {
		div.style.cssText = 'font-style: italic';
	} else if (i === date.getDay()) {
		div.style.cssText = 'font-weight: bold';
	}

	document.body.appendChild(div);
}
