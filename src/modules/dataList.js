const dataList = () => {
	const listContent = document.querySelector('.popup-repair-types-content-table__list'),
		listDate = document.querySelector('.popup-repair-types-content__head-date'),
		listHeader = document.querySelector('.popup-repair-types-content__head-title'),
		navList = document.querySelector('.nav-list-popup-repair');

	const getData = () => fetch('../../db/db.json');

	const renderDefault = data => {
			data.forEach((item, index) => {
				if (item.date) {
					listDate.textContent = item.date;
				} else {
					navList.insertAdjacentHTML(
						'beforeend',
						`
                    <button class="button_o popup-repair-types-nav__item ${index === 1
						? 'active'
						: ''}">${item.title}</button>
                `
					);
				}
			});
		},
		renderActive = data => {
			const navigationItem = navList.querySelector('.active').textContent;
			const newElem = document.createElement('tbody');
			const newData = data.filter(item => item.title);

			listHeader.textContent = navigationItem;
			listContent.innerHTML = '';

			newData.forEach(item => {
				if (item.title === navigationItem) {
					const { priceList, title } = item;

					priceList.forEach((item, index) => {
						newElem.insertAdjacentHTML(
							'beforeend',
							`
			            <tr class="mobile-row ${index === 0 ? 'showHide' : ''}">
			                <td class="repair-types-name">${item.typeService}</td>
			                <td class="mobile-col-title tablet-hide desktop-hide">Ед.измерения</td>
			                <td class="mobile-col-title tablet-hide desktop-hide">Цена за ед.</td>
			                <td class="repair-types-value">${item.units === 'м2'
								? `${item.units[0]}<sup>${item.units[1]}</sup>`
								: `${item.units}`}</td>
			                <td class="repair-types-value">${item.cost} руб.</td>
			            </tr>
			        `
						);
					});
				}
			});
			listContent.append(newElem);
		};

	navList.addEventListener('click', event => {
		const target = event.target.closest('button');

		navList.querySelector('.active').classList.remove('active');
		target.classList.add('active');
		getData()
			.then(response => {
				if (response.status !== 200) {
					throw new Error(`Status ${response.status}`);
				}

				return response.json();
			})
			.then(data => {
				renderActive(data);
			})
			.catch(error => console.error(error));
	});

	getData()
		.then(response => {
			if (response.status !== 200) {
				throw new Error(`Status ${response.status}`);
			}

			return response.json();
		})
		.then(data => {
			renderDefault(data);
			renderActive(data);
		})
		.catch(error => console.error(error));
};

export default dataList;
