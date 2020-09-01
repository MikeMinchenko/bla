'use strict';
window.addEventListener('DOMContentLoaded', () => {
	// таймер
	function countTimer(deadline) {
		const timerHours = document.querySelector('#timer-hours'),
			timerMinutes = document.querySelector('#timer-minutes'),
			timerSeconds = document.querySelector('#timer-seconds');

		function getTimeRemaining() {
			const dateStop = new Date(deadline).getTime(),
				dateNow = new Date().getTime(),
				timeRemaining = (dateStop - dateNow) / 1000,
				seconds = Math.floor(timeRemaining) % 60,
				minutes = Math.floor((timeRemaining / 60) % 60),
				hours = Math.floor(timeRemaining / 60 / 60);

			return {
				seconds,
				minutes,
				hours,
				timeRemaining
			};
		}

		function updateClock() {
			const timer = getTimeRemaining();

			timerSeconds.textContent = timer.seconds;
			timerMinutes.textContent = timer.minutes;
			timerHours.textContent = timer.hours;
			if (timer.seconds < 10) {
				timerSeconds.textContent = '0' + timer.seconds;
			}
			if (timer.minutes < 10) {
				timerMinutes.textContent = '0' + timer.minutes;
			}
			if (timer.hours < 10) {
				timerHours.textContent = '0' + timer.hours;
			}
		}

		if (getTimeRemaining().timeRemaining > 0) {
			updateClock();
			setInterval(updateClock, 1000);
		} else {
			clearInterval(2);
			timerSeconds.textContent = '00';
			timerMinutes.textContent = '00';
			timerHours.textContent = '00';
		}
	}

	countTimer('2 september 2020');
	// меню
	const toogleMenu = () => {
		const btnMenu = document.querySelector('.menu'),
			menu = document.querySelector('menu'),
			closeBtn = document.querySelector('.close-btn'),
			menuItems = menu.querySelectorAll('ul>li');

		const handlerMenu = () => {
			if (!menu.style.transform || menu.style.transform === 'translate(-100%)') {
				menu.style.transform = 'translate(0)';
			} else {
				menu.style.transform = 'translate(-100%)';
			}
		};

		btnMenu.addEventListener('click', handlerMenu);
		closeBtn.addEventListener('click', handlerMenu);
		menuItems.forEach(item => item.addEventListener('click', handlerMenu));
	};

	toogleMenu();
	// модальное окно
	const tooglePopup = () => {
		const popup = document.querySelector('.popup'),
			popupBtnt = document.querySelectorAll('.popup-btn'),
			popupClose = document.querySelector('.popup-close');



		function animate({
			timing,
			draw,
			duration
		}) {

			const start = performance.now();

			requestAnimationFrame(function animate(time) {
				// timeFraction изменяется от 0 до 1
				let timeFraction = (time - start) / duration;
				if (timeFraction > 1) {
					timeFraction = 1;
				}

				// вычисление текущего состояния анимации
				const progress = timing(timeFraction);

				draw(progress); // отрисовать её

				if (timeFraction < 1) {
					requestAnimationFrame(animate);
				}

			});
		}
		popupBtnt.forEach(item => item.addEventListener('click', () => {
			popup.style.display = 'block';

			if (window.innerWidth > 768) {
				animate({
					duration: 500,
					timing(timeFraction) {
						return timeFraction;
					},
					draw(progress) {
						popup.style.opacity = progress;
					}
				});
				popup.style.visibility = 'visible';
			}
		}));

		popupClose.addEventListener('click', () => {
			if (window.innerWidth > 768) {
				window.setTimeout(() => popup.style.visibility = 'hidden', 500);
				animate({
					duration: 500,
					timing(timeFraction) {
						return timeFraction;
					},
					draw(progress) {
						popup.style.opacity = 1 - progress;
					}
				});

			} else {
				popup.style.display = 'none';
			}
		});

	};
	tooglePopup();
});