import CarouselSlider from './carouselSlider.js';

const transparencySlider = () => {
	const current = document.querySelector('#transparency-popup-counter .slider-counter-content__current');
	const total = document.querySelector('#transparency-popup-counter .slider-counter-content__total');

	const sliderDoc = new CarouselSlider({
		main: '.transparency-slider-wrap',
		wrap: '.transparency-slider',
		prev: '#transparency-arrow_left',
		next: '#transparency-arrow_right',
		stylesId: 'js-transparency-slider-styles',
		slidesToShow: 1,
		styleClasses: {
			main: 'js-transparency-main-slider',
			wrap: 'js-transparency-wrap-slider',
			item: 'js-transparency-slider__item'
		},
		noAdaptiveStyles: `
			@media (max-width: 1090px) {

				.transparency .transparency-slider {
					all: unset;
				}

				.transparency .row {
					all: unset;
				}
				.js-transparency-main-slider {
					position: relative;
					overflow: hidden !important;
				}

				.js-transparency-wrap-slider {
					display: flex !important;
					transition: transform 0.5s !important;
				}

				.js-transparency-slider__item {
					display: flex !important;
					align-items: center !important;
					justify-content: center !important;
					margin: 0 auto !important;
					flex: 0 0 100% !important;
					margin-top: 150px !important;
					max-width: 100% !important;
					min-width: 100% !important;
				}
			}
			@media (min-width: 1090px) {
				.js-transparency-wrap-slider {
					transform: translateX(0%) !important;
				}
			}
		`
	});

	sliderDoc.init();

	const carousel = new CarouselSlider({
		main: '.popup-transparency-slider',
		wrap: '.wrapper-for-popup-transparency-slider',
		prev: '#transparency_left',
		next: '#transparency_right',
		stylesId: 'js-popup-transparency-slider-styles',
		slidesToShow: 1,
		styleClasses: {
			main: 'js-popup-transparency-main-slider',
			wrap: 'js-popup-transparency-wrap-slider',
			item: 'js-popup-transparency-slider__item'
		}
	});

	carousel.prevSlider = function() {
		this.options.position = this.wrap.dataset.currentIndex;

		if (this.options.position > 0) {
			this.wrap.dataset.currentIndex = --this.options.position;
			this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
			this.next.style.visibility = '';
			if (this.options.position === 0) this.prev.style.visibility = 'hidden';
			current.textContent = this.options.position + 1;
		}
	};

	carousel.nextSlider = function() {
		this.options.position = +this.wrap.dataset.currentIndex;

		if (this.options.position < this.options.maxPosition) {
			this.wrap.dataset.currentIndex = ++this.options.position;
			this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
			this.prev.style.visibility = '';
			current.textContent = this.options.position + 1;
			if (this.options.position === this.options.maxPosition) this.next.style.visibility = 'hidden';
		}
	};

	carousel.init();
	total.innerText = carousel.slides.length;
};

export default transparencySlider;
