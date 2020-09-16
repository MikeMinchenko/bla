const slider = () => {
	const slide = document.querySelectorAll('.portfolio-item'),
		slider = document.querySelector('.portfolio-content'),
		dotsWraper = document.querySelector('.portfolio-dots');
	let currentSlide = 0,
		interval,
		dots;

	// создание точек по количеству слайдов
	const newDots = () => {
		slide.forEach(() => {
			const newElem = document.createElement('li');
			newElem.classList.add('dot');
			dotsWraper.append(newElem);
		});
		dots = document.querySelectorAll('.dot');
		dots[currentSlide].classList.add('dot-active');
	};
	newDots();

	const prevSlide = (elem, index, strClass) => {
		elem[index].classList.remove(strClass);
	};

	const nextSlide = (elem, index, strClass) => {
		elem[index].classList.add(strClass);
	};

	const autoPlaySlide = () => {
		prevSlide(slide, currentSlide, 'portfolio-item-active');
		prevSlide(dots, currentSlide, 'dot-active');
		currentSlide++;
		if (currentSlide >= slide.length) {
			currentSlide = 0;
		}
		nextSlide(slide, currentSlide, 'portfolio-item-active');
		nextSlide(dots, currentSlide, 'dot-active');
	};

	const startSlide = (time = 3000) => {
		interval = setInterval(autoPlaySlide, time);
	};

	const stopSlide = () => {
		clearInterval(interval);
	};

	slider.addEventListener('click', event => {
		event.preventDefault();

		const target = event.target;

		if (!target.matches('.portfolio-btn, .dot')) {
			return;
		}

		prevSlide(slide, currentSlide, 'portfolio-item-active');
		prevSlide(dots, currentSlide, 'dot-active');

		if (target.matches('#arrow-right')) {
			currentSlide++;
		} else if (target.matches('#arrow-left')) {
			currentSlide--;
		} else if (target.matches('.dot')) {
			dots.forEach((element, index) => {
				if (element === target) {
					currentSlide = index;
				}
			});
		}

		if (currentSlide >= slide.length) {
			currentSlide = 0;
		} else if (currentSlide < 0) {
			currentSlide = slide.length - 1;
		}

		nextSlide(slide, currentSlide, 'portfolio-item-active');
		nextSlide(dots, currentSlide, 'dot-active');
	});

	slider.addEventListener('mouseover', event => {
		if (event.target.matches('.portfolio-btn, .dot')) {
			stopSlide();
		}
	});

	slider.addEventListener('mouseout', event => {
		if (event.target.matches('.portfolio-btn, .dot')) {
			startSlide();
		}
	});

	startSlide(1500);
};

export default slider;
