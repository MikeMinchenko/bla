'use strict';
// Переменные
const select = document.getElementById('select-cities'),
	dropDefault = document.querySelector('.dropdown-lists__list--default'),
	dropSelect = document.querySelector('.dropdown-lists__list--select'),
	dropAutocomplete = document.querySelector('.dropdown-lists__list--autocomplete'),
	label = document.querySelector('label'),
	btn = document.querySelector('.button'),
	closeBtn = document.querySelector('.close-button');

btn.style.pointerEvents = 'none';

dropDefault.style.display = 'none';

// Получаем данные
let data = [];
const getData = () => {
	return fetch('./db_cities.json')
		.then(response => {
			if (response.status !== 200) {
				throw new Error('status not 200');
			}
			return response.json();
		})
		.then(response => {
			data = response;
		})
		.catch(err => console.log(err));
};
getData();

// Функции
const renderdropDefault = () => {
		const block = clearBlock(dropDefault);

		data['RU'].forEach(item => {
			const countryBlock = createCounrtyBlock();
			item.cities.sort((a, b) => {
				return b.count - a.count;
			});
			countryBlock.insertAdjacentHTML(
				'beforeend',
				`
            <div class="dropdown-lists__total-line">
                <div class="dropdown-lists__country">${item.country}</div>
                <div class="dropdown-lists__count">${item.count}</div>
            </div>
        `
			);

			item.cities.forEach((city, i) => {
				if (i < 3) {
					countryBlock.insertAdjacentHTML(
						'beforeend',
						`
                        <div class="dropdown-lists__line" data-link="${city.link}">
                            <div class="dropdown-lists__city${i === 0 ? ' dropdown-lists__city--ip' : ''}">
                                ${city.name}
                            </div>
                            <div class="dropdown-lists__count">${city.count}</div>
                        </div>
                    `
					);
				}
			});

			block.append(countryBlock);
		});
	},
	renderdropSelect = country => {
		const block = clearBlock(dropSelect);

		data['RU'].forEach(item => {
			if (item.country === country) {
				const countryBlock = createCounrtyBlock();

				countryBlock.insertAdjacentHTML(
					'beforeend',
					`
                <div class="dropdown-lists__total-line">
                    <div class="dropdown-lists__country">${item.country}</div>
                    <div class="dropdown-lists__count">${item.count}</div>
                </div>
            `
				);

				item.cities.forEach((city, i) => {
					countryBlock.insertAdjacentHTML(
						'beforeend',
						`
                    <div class="dropdown-lists__line" data-link="${city.link}">
                        <div class="dropdown-lists__city${i === 0 ? ' dropdown-lists__city--ip' : ''}">
                            ${city.name}
                        </div>
                        <div class="dropdown-lists__count">${city.count}</div>
                    </div>
                `
					);
				});

				block.append(countryBlock);
			}
		});
	},
	showCity = value => {
		const block = clearBlock(dropAutocomplete);
		const countryBlock = createCounrtyBlock();
		block.append(countryBlock);
		data['RU'].forEach(item => {
			item.cities.forEach(city => {
				const fixItem = city.name.toLowerCase();

				block.append(countryBlock);
				if (fixItem.startsWith(value.toLowerCase())) {
					countryBlock.insertAdjacentHTML(
						'beforeend',
						`
                        <div class="dropdown-lists__line" data-link="${city.link}">
                            <div class="dropdown-lists__city" >${city.name}</div>
                            <div class="dropdown-lists__count">${item.country}</div>
                        </div>
                    `
					);
				}
			});
		});

		if (countryBlock.innerHTML === '') {
			countryBlock.innerHTML = `
                <div class="dropdown-lists__line">
                    <div class="dropdown-lists__city">Ничего не найдено</div>
                </div>
            `;
		}
	},
	clearBlock = select => {
		const block = select.querySelector('.dropdown-lists__col');
		block.textContent = '';
		return block;
	},
	createCounrtyBlock = () => {
		const countryBlock = document.createElement('div');
		countryBlock.classList.add('dropdown-lists__countryBlock');

		return countryBlock;
	},
	changeLabel = () => {
		label.style.top = '-25px';
		label.style.left = '0';
		label.style.color = '#00416A';
	},
	resetSelect = () => {
		closeSelect();
		label.style.top = '';
		label.style.left = '';
		label.style.color = '';
		closeBtn.style.display = '';
		btn.style.pointerEvents = 'none';
		select.value = '';
	},
	closeSelect = () => {
		dropDefault.style.display = 'none';
		dropAutocomplete.style.display = '';
		dropSelect.style.display = '';
	};

// Обработчики событий
select.addEventListener('click', () => {
	dropDefault.style.display = '';
	dropSelect.style.display = '';
	dropAutocomplete.style.display = '';
	renderdropDefault();
});

dropDefault.addEventListener('click', event => {
	let target = event.target;
	if (target.closest('.dropdown-lists__total-line')) {
		let country = target.closest('.dropdown-lists__total-line').querySelector('.dropdown-lists__country')
			.textContent;
		select.value = country;
		dropDefault.style.display = 'none';
		renderdropSelect(country);
		dropSelect.style.display = 'flex';
		dropAutocomplete.style.display = '';
	}
});

dropSelect.addEventListener('click', event => {
	let target = event.target;
	if (target.closest('.dropdown-lists__total-line')) {
		dropDefault.style.display = '';
		dropSelect.style.display = '';
	}
});

select.addEventListener('input', () => {
	if (select.value.trim() !== '') {
		dropDefault.style.display = 'none';
		dropSelect.style.display = '';
		showCity(select.value);
		dropAutocomplete.style.display = 'flex';
		closeBtn.style.display = 'block';
		changeLabel();
	} else {
		resetSelect();
		dropDefault.style.display = '';
	}
});

document.body.addEventListener('click', event => {
	const target = event.target;
	if (target.closest('.dropdown-lists__total-line')) {
		const parent = target.closest('.dropdown-lists__total-line'),
			country = parent.querySelector('.dropdown-lists__country').textContent.trim();
		select.value = country;
		changeLabel();
		closeBtn.style.display = 'block';
		btn.style.pointerEvents = 'none';
	}

	if (target.closest('.dropdown-lists__line')) {
		const parent = target.closest('.dropdown-lists__line'),
			city = parent.querySelector('.dropdown-lists__city').textContent.trim();

		if (city !== 'Ничего не найдено') {
			select.value = city;
			changeLabel();
			btn.href = parent.dataset.link;
			btn.style.pointerEvents = '';
			closeBtn.style.display = 'block';
		} else {
			resetSelect();
		}
	}

	if (!target.closest('.dropdown-lists__total-line') && target !== select) {
		closeSelect();
	}
});

closeBtn.addEventListener('click', resetSelect);
