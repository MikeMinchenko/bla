const formValidate = () => {
	const inputs = document.querySelectorAll('[name="name"]');

	inputs.forEach(item => {
		item.addEventListener('input', () => {
			item.value = item.value.replace(/[^а-яА-ЯёЁ]/g, '');
		});
	});
};

export default formValidate;
