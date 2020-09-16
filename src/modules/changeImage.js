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

export default changeImage;
