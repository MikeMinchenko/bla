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
	let counter = 10;

	let guessNumber = function() {
		if (0 < counter) {
			let userNumber = prompt('Угадай число от 1 до 100');
			if (userNumber === null) {
				alert('До скорых встреч!');
				return;
			} else if (!isNumber(userNumber)) {
				alert('Введи число!');
				guessNumber();
			} else if (userNumber < botNumber) {
				counter--;
				alert(`Загаданное число меньше, осталось попыток ${counter}`);
				guessNumber();
			} else if (userNumber > botNumber) {
				counter--;
				alert(`Загаданное число меньше, осталось попыток ${counter}`);
				guessNumber();
			} else if (+userNumber === botNumber) {
				let again = confirm('Поздравляю, Вы угадали!!! Хотели бы сыграть еще?');
				if (again === true) {
					window.location.reload();
				} else {
					return;
				}
			}
		} else {
			let anew = confirm('Попытки закончились, хотите сыграть еще?');
			if (anew === true) {
				window.location.reload();
			} else {
				return;
			}
		}
	};

	return guessNumber();
};

result();
