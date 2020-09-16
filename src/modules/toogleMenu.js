const toogleMenu = () => {
	const menu = document.querySelector('menu'),
		closeBtn = document.querySelector('.close-btn');

	const handlerMenu = () => {
		menu.classList.toggle('active-menu');
	};

	document.addEventListener('click', event => {
		const target = event.target;
		if (target === closeBtn) {
			handlerMenu();
		} else if (target.closest('.menu') && !target.closest('li')) {
			handlerMenu();
		} else if (target !== menu && !target.closest('li')) {
			menu.classList.remove('active-menu');
			console.log(target);
		}
	});
};

export default toogleMenu;
