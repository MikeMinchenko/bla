'use strict';

let isNumber = function(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
};

let randomNumber = function() {
	let targetNumber = parseInt(Math.random() * 100);
	if (targetNumber === 0) {
		targetNumber = 1;
	}
	return targetNumber;
};

let result = function() {
	let botNumber = randomNumber();
	console.log('botNumber: ', botNumber);

	function guessNumber() {
		let userNumber = prompt('Угадай число от 1 до 100');
		if (userNumber === null) {
			return;
		} else if (!isNumber(userNumber)) {
			alert('Введи число!');
			guessNumber();
		} else if (userNumber < botNumber) {
			alert('Загаданное число больше');
			guessNumber();
		} else if (userNumber > botNumber) {
			alert('Загаданное число меньше');
			guessNumber();
		} else if (+userNumber === botNumber) {
			alert('Наши поздравления! Число верно!');
			return;
		}
	}

	return guessNumber();
};

result();
