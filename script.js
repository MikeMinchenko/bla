'use strict';
window.addEventListener('DOMContentLoaded', () => {
	// патерн анимации
	function animate({ timing, draw, duration }) {
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
		const menu = document.querySelector('menu'),
			closeBtn = document.querySelector('.close-btn');

		const handlerMenu = () => {
			menu.classList.toggle('active-menu');
		};

		document.addEventListener('click', event => {
			const target = event.target;
			if (target === closeBtn || target.closest('menu>ul')) {
				handlerMenu();
			} else if (target.closest('.menu')) {
				handlerMenu();
			} else if (target !== menu) {
				menu.classList.remove('active-menu');
			}
		});
	};
	toogleMenu();

	// модальное окно
	const tooglePopup = () => {
		const popup = document.querySelector('.popup'),
			popupBtnt = document.querySelectorAll('.popup-btn'),
			popupClose = document.querySelector('.popup-close');

		// функция открытия модального окна
		const openPopup = () => {
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
			} else {
				popup.style.visibility = 'visible';
				popup.style.opacity = 1;
			}
		};
		// фунция закрытия модального окна
		const closePopup = () => {
			if (window.innerWidth > 768) {
				window.setTimeout(() => (popup.style.visibility = 'hidden'), 500);
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
		};

		popupBtnt.forEach(item => item.addEventListener('click', openPopup));
		// закрываем на клик вне модалки и на кнопку закрыть
		popup.addEventListener('click', event => {
			let target = event.target;
			if (target === popupClose) {
				closePopup();
			} else {
				target = target.closest('.popup-content');
				if (!target) {
					closePopup();
				}
			}
		});
	};

	tooglePopup();
	// табы
	const tabs = () => {
		const tabHeader = document.querySelector('.service-header'),
			tab = tabHeader.querySelectorAll('.service-header-tab'),
			tabContent = document.querySelectorAll('.service-tab');

		tabHeader.addEventListener('click', event => {
			let target = event.target;
			target = target.closest('.service-header-tab');

			if (target) {
				tab.forEach((item, i) => {
					if (item === target) {
						item.classList.add('active');
						tabContent[i].classList.remove('d-none');
					} else {
						item.classList.remove('active');
						tabContent[i].classList.add('d-none');
					}
				});
			}
		});
	};

	tabs();

	// скролл до элемента
	const scroll = () => {
		const anchors = document.querySelectorAll('a[href*="#"]');

		for (const anchor of anchors) {
			anchor.addEventListener('click', event => {
				event.preventDefault();

				const blockID = anchor.getAttribute('href'),
					idElem = document.querySelector(blockID);
				if (idElem) {
					const idElemY = idElem.offsetTop;
					window.scrollTo({
						top: idElemY,
						behavior: 'smooth'
					});
				}
			});
		}
	};
	scroll();

	// слайдер
	const slider = () => {
		const slide = document.querySelectorAll('.portfolio-item'),
			slider = document.querySelector('.portfolio-content'),
			dotsWraper = document.querySelector('.portfolio-dots');
		let currentSlide = 0,
			interval,
			dots;

		// создание точек по количеству слайдов
		const newDots = () => {
			slide.forEach(() => {
				const newElem = document.createElement('li');
				newElem.classList.add('dot');
				dotsWraper.append(newElem);
			});
			dots = document.querySelectorAll('.dot');
			dots[currentSlide].classList.add('dot-active');
		};
		newDots();

		const prevSlide = (elem, index, strClass) => {
			elem[index].classList.remove(strClass);
		};

		const nextSlide = (elem, index, strClass) => {
			elem[index].classList.add(strClass);
		};

		const autoPlaySlide = () => {
			prevSlide(slide, currentSlide, 'portfolio-item-active');
			prevSlide(dots, currentSlide, 'dot-active');
			currentSlide++;
			if (currentSlide >= slide.length) {
				currentSlide = 0;
			}
			nextSlide(slide, currentSlide, 'portfolio-item-active');
			nextSlide(dots, currentSlide, 'dot-active');
		};

		const startSlide = (time = 3000) => {
			interval = setInterval(autoPlaySlide, time);
		};

		const stopSlide = () => {
			clearInterval(interval);
		};

		slider.addEventListener('click', event => {
			event.preventDefault();

			const target = event.target;

			if (!target.matches('.portfolio-btn, .dot')) {
				return;
			}

			prevSlide(slide, currentSlide, 'portfolio-item-active');
			prevSlide(dots, currentSlide, 'dot-active');

			if (target.matches('#arrow-right')) {
				currentSlide++;
			} else if (target.matches('#arrow-left')) {
				currentSlide--;
			} else if (target.matches('.dot')) {
				dots.forEach((element, index) => {
					if (element === target) {
						currentSlide = index;
					}
				});
			}

			if (currentSlide >= slide.length) {
				currentSlide = 0;
			} else if (currentSlide < 0) {
				currentSlide = slide.length - 1;
			}

			nextSlide(slide, currentSlide, 'portfolio-item-active');
			nextSlide(dots, currentSlide, 'dot-active');
		});

		slider.addEventListener('mouseover', event => {
			if (event.target.matches('.portfolio-btn, .dot')) {
				stopSlide();
			}
		});

		slider.addEventListener('mouseout', event => {
			if (event.target.matches('.portfolio-btn, .dot')) {
				startSlide();
			}
		});

		startSlide(1500);
	};

	slider();

	// изменнение картинок в блоке наша команда

	const changeImage = () => {
		const comandElem = document.querySelectorAll('.command__photo');

		comandElem.forEach(item => {
			item.addEventListener('mouseover', event => {
				[ event.target.src, event.target.dataset.img ] = [ event.target.dataset.img, event.target.src ];
			});
		});

		comandElem.forEach(item => {
			item.addEventListener('mouseout', event => {
				[ event.target.dataset.img, event.target.src ] = [ event.target.src, event.target.dataset.img ];
			});
		});
	};

	changeImage();

	// калькулятор

	const calculator = (price = 100) => {
		const calcBlock = document.querySelector('.calc-block'),
			calcType = document.querySelector('.calc-type'),
			calcSquare = document.querySelector('.calc-square'),
			calcDay = document.querySelector('.calc-day'),
			calcCount = document.querySelector('.calc-count'),
			totlalValue = document.getElementById('total');

		calcBlock.addEventListener('input', e => {
			const target = e.target;

			if (target.matches('[type="text"]')) {
				target.value = target.value.replace(/\D/g, '');
			}
		});

		const countSum = () => {
			let total = 0,
				countValue = 1,
				dayValue = 1;
			const typeValue = calcType.options[calcType.selectedIndex].value,
				squareValue = +calcSquare.value;

			if (calcCount.value > 1) {
				countValue += (calcCount.value - 1) / 10;
			}

			if (+calcDay.value !== 0) {
				if (calcDay.value && +calcDay.value < 5) {
					dayValue *= 2;
				} else if (calcDay.value && +calcDay.value < 10) {
					dayValue *= 1.5;
				}
			}

			if (typeValue && squareValue) {
				total = price * typeValue * squareValue * countValue * dayValue;
			}

			animate({
				duration: 300,
				timing(timeFraction) {
					return timeFraction;
				},
				draw(progress) {
					totlalValue.textContent = Math.floor(progress * total);
				}
			});
		};

		calcBlock.addEventListener('change', e => {
			const target = e.target;

			if (target.matches('select') || target.matches('input')) {
				countSum();
			}
		});
	};

	calculator(100);

	// Ajax отправка на сервер

	const sendForm = form => {
		const errorMessage = 'Что то пошло не так...',
			succesMessge = 'Спасибо! Мы скоро с Вами свяжемся';

		const statusMessage = document.createElement('div'); // создаем еэлемент для оповещения хода загрузки
		statusMessage.classList.add('preload-container');
		statusMessage.style.cssText = `
			font-size: 1.6rem;
			color: #fff;
		`;

		// валидация success
		const successValidation = elem => {
			if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
				elem.nextElementSibling.remove();
			}
			elem.style.border = 'none';
		};

		//  Валидация error
		const errorValidation = elem => {
			if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
				return;
			}
			elem.style.cssText = 'border: 1px solid tomato';
			const errorValid = document.createElement('div');
			errorValid.classList.add('validator-error');

			if (elem.type === 'tel') {
				errorValid.textContent = 'Введите номер в формате +79998888888';
			} else if (elem.type === 'email') {
				errorValid.textContent = 'Введите email в формате email@domain.ru';
			}

			errorValid.style.cssText = `
					color: tomato;
					font-size: 1.2rem;
				`;
			elem.insertAdjacentElement('afterend', errorValid);
		};

		// функция обработки запроса на сервер
		const postData = body =>
			new Promise((resolve, reject) => {
				const request = new XMLHttpRequest();
				// слушатель на статус отправки запроса
				request.addEventListener('readystatechange', () => {
					if (request.readyState !== 4) return;

					if (request.status === 200) {
						resolve();
					} else {
						reject();
					}
				});

				request.open('POST', 'server.php');
				//!! вариант с JSON
				request.setRequestHeader('Content-Type', 'application/json');
				request.send(JSON.stringify(body));

				//!! вариант с FormData
				// request.setRequestHeader('Content-Type', 'multipart/form-data');

				// request.send(formData);
			});

		// слушатель на отправку формы
		form.addEventListener('submit', event => {
			const telInput = form.querySelector('[type="tel"]'),
				emailInput = form.querySelector('[type="email"]'),
				telPatern = /^(\+7)?8?([-()]*\d){10}$/,
				emailPatern = /^\w+@\w+\.\w{2,}$/;

			event.preventDefault();
			form.append(statusMessage);

			const formData = new FormData(form);

			//!! вариант с JSON
			const body = {};

			formData.forEach((val, key) => {
				body[key] = val;
			});

			// проверка валидации поля телефона
			if (telPatern.test(telInput.value)) {
				successValidation(telInput);
			} else {
				errorValidation(telInput);
			}
			if (emailPatern.test(emailInput.value)) {
				successValidation(emailInput);
			} else {
				errorValidation(emailInput);
			}
			if (telPatern.test(telInput.value) && emailPatern.test(emailInput.value)) {
				statusMessage.innerHTML = `
					<div class="bubbles">
						<div class="bubble">
							<div class="circle"></div>
						</div>
						<div class="bubble">
							<div class="circle"></div>
						</div><div class="bubble">
							<div class="circle"></div>
						</div><div class="bubble">
							<div class="circle"></div>
						</div><div class="bubble">
							<div class="circle"></div>
						</div><div class="bubble">
							<div class="circle"></div>
						</div>
					</div>

				`;

				postData(body)
					.then(() => {
						form.reset();
						statusMessage.innerHTML = succesMessge;
					})
					.catch(() => {
						statusMessage.innerHTML = errorMessage;
					});
			}
		});

		//  запрет ввода символов в поля ввода
		const validate = form => {
			const tel = form.querySelector('[type="tel"]'),
				email = form.querySelector('[type="email"]'),
				name = form.querySelector('[type="text"]'),
				text = form.querySelector('[placeholder="Ваше сообщение"]');

			tel.addEventListener('input', e => {
				const target = e.target;
				target.value = target.value.replace(/[^+0-9]/g, '');
			});

			email.addEventListener('input', e => {
				const target = e.target;
				target.value = target.value.replace(/[^@a-zA-Z0-9.-_]/g, '');
			});

			name.addEventListener('input', e => {
				const target = e.target;
				target.value = target.value.replace(/[^а-яА-Я ]/g, '');
			});

			if (text) {
				text.addEventListener('input', e => {
					const target = e.target;
					target.value = target.value.replace(/[^а-яА-Я ,.!]/g, '');
				});
			}
		};

		validate(form);
	};

	const forms = document.querySelectorAll('form');

	forms.forEach(item => {
		sendForm(item);
	});
});
