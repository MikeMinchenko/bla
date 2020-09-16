import animate from './animate';

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

export default tooglePopup;
