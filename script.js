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
	// кастомный селект

	let select = data => {
		let selectHeader = document.querySelectorAll('.select__header'),
			selectItem = document.querySelectorAll('.select__item');

		const selectToggle = event => {
			let target = event.target;
			target.parentElement.classList.toggle('is-active');
		};

		const selectChoose = event => {
			let target = event.target;
			let text = target.textContent,
				select = target.closest('.select'),
				currentText = select.querySelector('.select__current');
			currentText.textContent = text;
			select.classList.remove('is-active');
			addCard(data);
		};

		selectHeader.forEach(item => {
			item.addEventListener('click', selectToggle);
		});

		selectItem.forEach(item => {
			item.addEventListener('click', selectChoose);
		});
	};

	// запрос на сервер

	const addToSelect = data => {
		const selectBody = document.querySelector('.select__body');
		let moviesData = [];

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

	const getData = () => {
		return new Promise((resolve, reject) => {
			const request = new XMLHttpRequest();
			request.open('GET', './dbHeroes.json');
			request.setRequestHeader('Content-type', 'application/json');
			request.addEventListener('readystatechange', () => {
				if (request.readyState !== 4) {
					return;
				}

				if (request.status === 200) {
					const data = JSON.parse(request.responseText);
					resolve(data);
				} else {
					reject(request.status);
					// output.innerHTML = 'Произошла ошибка';
				}
			});
			request.send();
		});
	};

	const addCard = data => {
		const selectCurrent = document.querySelector('.select__current'),
			cardWraper = document.querySelector('.card__wraper');

		cardWraper.innerHTML = '';

		let newData = data.filter(item => {
			if (item.movies && item.movies.includes(selectCurrent.textContent)) {
				console.log(item);
				return item;
			}
		});

		newData.forEach(item => {
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

	const init = () => {
		getData()
			.then(data => {
				addToSelect(data);
				select(data);
				// change(data);
				console.log(data);
			})
			.catch(err => console.log(err));
	};

	init();
});
