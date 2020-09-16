'use strict';
window.addEventListener('load', () => {
	// загрузка начальной анимации

	const preLoader = () => {
		const loaderMiddle = document.querySelector('#preloader-wapper .loader-middle'),
			loadWraper = document.querySelector('#preloader-wapper');

		setTimeout(() => {
			loaderMiddle.classList.add('loaded');
			setTimeout(() => {
				loadWraper.classList.add('loaded');
				setTimeout(() => {
					loadWraper.remove();
				}, 500);
			}, 700);
		}, 1900);
	};
	preLoader();
});

window.addEventListener('DOMContentLoaded', () => {
	// запрос на сервер
	const getData = () => fetch('./dbHeroes.json');

	// показываем развернутое описание карточки
	const showCard = data => {
		const cards = document.querySelectorAll('.card'),
			cardDescription = document.querySelector('.card__description'),
			cardBlock = cardDescription.querySelector('.card__block'),
			cardPhoto = document.querySelector('.card__photo');

		cards.forEach(item => {
			item.addEventListener('click', event => {
				const target = event.target,
					header = target.querySelector('.card__title').textContent;

				event.preventDefault();
				cardBlock.innerHTML = '';

				const heroData = data.filter(item => item.name === header);
				const [ heroElem ] = heroData;

				for (const key in heroElem) {
					if (key !== 'photo') {
						cardBlock.insertAdjacentHTML(
							'beforeend',
							`
							<p>${key}: <span class="text__bold">${heroElem[key]}</span></p>
							`
						);
					} else {
						cardPhoto.style.cssText = `background-image: url("${heroElem[key]}")`;
					}
				}

				cardDescription.classList.add('card__active');
			});
		});
	};

	// добавление карточек
	const addCard = data => {
		const selectCurrent = document.querySelector('.select__current'),
			cardWraper = document.querySelector('.card__wraper');

		cardWraper.innerHTML = '';

		const newData = data.filter(item => {
			if (item.movies && item.movies.includes(selectCurrent.textContent)) {
				return item;
			}
		});

		const addCardFun = elem => {
			elem.forEach(item => {
				cardWraper.insertAdjacentHTML(
					'afterbegin',
					`
			    <a href="#" class="card" style="background-image: url('${item.photo}')">
			        <h3 class="card__title">${item.name}</h3>
			    </a>
			`
				);
			});
		};

		if (selectCurrent.textContent !== 'Список фильмов') {
			addCardFun(newData);
		} else {
			addCardFun(data);
		}
		showCard(data);
	};

	// кастомный селект
	const customSelect = () => {
		const selectHeader = document.querySelector('.select__header'),
			selectItem = document.querySelectorAll('.select__item'),
			selectBtn = document.querySelector('.select__btn'),
			select = document.querySelector('.select');

		const remove = () => {
			select.classList.remove('is-active');
			selectBtn.classList.remove('select__btn_active');
		};

		const selectToggle = () => {
			select.classList.toggle('is-active');
			selectBtn.classList.toggle('select__btn_active');
		};

		const selectChoose = event => {
			const target = event.target;
			const text = target.textContent,
				currentText = select.querySelector('.select__current');
			currentText.textContent = text;
			remove();
			getData()
				.then(response => response.json())
				.then(data => {
					addCard(data);
					console.log(data);
				})
				.catch(err => console.log(err));
		};

		selectHeader.addEventListener('click', selectToggle);

		document.addEventListener('click', event => {
			const target = event.target;

			if (!target.closest('.select') && select.classList.contains('is-active')) {
				remove();
			}
		});
		selectItem.forEach(item => {
			item.addEventListener('click', selectChoose);
		});
	};
	// добавление из data в селект
	const addToSelect = data => {
		const selectBody = document.querySelector('.select__body');
		const moviesData = [];

		data.filter(item => {
			if (item.movies) {
				moviesData.push(...item.movies);
			}
		});

		const allMovies = [ ...new Set(moviesData) ];

		allMovies.forEach(item => {
			selectBody.insertAdjacentHTML(
				'afterbegin',
				`
                <div class="select__item">${item}</div>
            `
			);
		});
	};

	// функция закрытия карточки
	const closeCard = () => {
		const card = document.querySelector('.card__description');

		card.addEventListener('click', event => {
			const target = event.target;

			if (target.matches('.card__close') || target.matches('.card__description')) {
				card.classList.remove('card__active');
			}
		});
		window.addEventListener('keyup', event => {
			if (event.key === 'Escape') {
				card.classList.remove('card__active');
			}
		});
	};

	closeCard();

	// скролл
	const scroll = () => {
		const anchor = document.querySelector('.to_down');

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
	};

	scroll();

	getData()
		.then(response => response.json())
		.then(data => {
			addToSelect(data);
			customSelect();
			addCard(data);
		})
		.catch(err => console.log(err));
});
