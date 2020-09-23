const togglePopups = () => {
	const popupMenu = document.querySelector('.popup-menu'),
		popupRepairTypes = document.querySelector('.popup-repair-types'),
		popupPrivacy = document.querySelector('.popup-privacy'),
		popupConsultation = document.querySelector('.popup-consultation'),
		popupDesign = document.querySelector('.popup-design');

	document.addEventListener('click', event => {
		const target = event.target;

		if (target.matches('.menu__icon')) {
			popupMenu.style.visibility = 'visible';
			popupMenu.querySelector('.popup-dialog-menu').classList.add('showHide-menu');
		} else if (!target.closest('.popup-dialog-menu') || target.matches('.close-menu, .menu-link')) {
			popupMenu.querySelector('.popup-dialog-menu').classList.remove('showHide-menu');
			popupMenu.style.visibility = `hidden`;
		}

		if (target.matches('.link-list, .link-list a')) popupRepairTypes.style.visibility = `visible`;
		if (target.matches('.link-privacy')) popupPrivacy.style.visibility = `visible`;
		if (target.matches('.button_wide')) popupConsultation.style.visibility = `visible`;
		if (target.matches('.link-list-designs a')) popupDesign.style.visibility = `visible`;
		if (target.matches('.popup') || target.matches('.close')) target.closest('.popup').style.visibility = `hidden`;
	});
};

export default togglePopups;
