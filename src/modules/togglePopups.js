const togglePopups = () => {
	const popupMenu = document.querySelector('.popup-menu');

	document.addEventListener('click', event => {
		const target = event.target;

		if (target.matches('.menu__icon')) {
			popupMenu.style.visibility = 'visible';
			popupMenu.querySelector('.popup-dialog-menu').classList.add('showHide-menu');
		} else if (!target.closest('.popup-dialog-menu') || target.matches('.close-menu, .menu-link')) {
			popupMenu.querySelector('.popup-dialog-menu').classList.remove('showHide-menu');
			popupMenu.style.visibility = `hidden`;
		}
	});
};

export default togglePopups;
