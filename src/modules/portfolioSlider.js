import CarouselSlider from './carouselSlider.js';
import nextFun from './nextFun.js';
import prevFun from './prevFun.js';

const portfolioSlider = () => {
	const desktopSlider = new CarouselSlider({
		main: '.main-wrapper-for-portfolio-slider',
		wrap: '.portfolio-slider',
		prev: '#portfolio-arrow_left',
		next: '#portfolio-arrow_right',
		slidesToShow: 3,
		responsive: [
			{
				breakpoint: 1024,
				slideToShow: 2
			},
			{
				breakpoint: 901,
				slideToShow: 1
			}
		],
		stylesId: 'js-portfolio-desktop-slider-style',
		styleClasses: {
			main: 'js-portfolio-desktop-main-slider',
			wrap: 'js-portfolio-desktop-wrap-slider',
			item: 'js-portfolio-desktop_item-slider'
		}
	});

	desktopSlider.addStyle = function() {
		let style = document.getElementById(this.stylesId);
		const styleClasses = this.options.styleClasses;

		if (!style) {
			style = document.createElement('style');
			style.id = this.stylesId;
		}

		style.textContent = `
		@media (min-width: 576px) {
			.${styleClasses.main} {
				overflow: hidden !important;
			}
			.${styleClasses.wrap} {
				display: flex !important;
				transition: transform 0.5s !important;
				 !important;
				overflow: visible !important;
			}
			.${styleClasses.item} {
				display: flex !important;
				align-items: center !important;
				justify-content: center !important;
				margin: 0 auto !important;
				flex: 0 0 ${this.options.widthSlide}% !important;
			}
			#portfolio-arrow_left {
				display: flex;
			}
		}
		`;

		document.head.append(style);
	};

	desktopSlider.prevSlider = function() {
		if (this.options.position > 0) {
			--this.options.position;
			if (this.options.widthSlide <= 35) {
				this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide * 1.04}%)`;
			} else if (this.options.widthSlide <= 50) {
				this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide * 1.05}%)`;
			} else {
				this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
			}
			this.next.style.visibility = '';
			if (this.options.position === 0) this.prev.style.visibility = 'hidden';
		}
	};

	desktopSlider.nextSlider = function() {
		if (this.options.position < this.options.maxPosition) {
			++this.options.position;
			if (this.options.widthSlide <= 35) {
				this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide * 1.04}%)`;
			} else if (this.options.widthSlide <= 50) {
				this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide * 1.05}%)`;
			} else {
				this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
			}
			this.prev.style.visibility = '';
			if (this.options.position === this.options.maxPosition) this.next.style.visibility = 'hidden';
		}
	};

	desktopSlider.init();

	const current = document.querySelector('#portfolio-counter .slider-counter-content__current'),
		total = document.querySelector('#portfolio-counter .slider-counter-content__total');

	const mobileSlider = new CarouselSlider({
		main: '.portfolio-slider-wrap',
		wrap: '.portfolio-slider-mobile',
		prev: '#portfolio-arrow-mobile_left',
		next: '#portfolio-arrow-mobile_right',
		slidesToShow: 1,
		stylesId: 'js-portfolio-mobile-slider-style',
		styleClasses: {
			main: 'js-portfolio-mobile-main-slider',
			wrap: 'js-portfolio-mobile-wrap-slider',
			item: 'js-portfolio-mobile_item-slider'
		},
		noAdaptiveStyles: `
			@media (max-width: 575px) {
				.js-portfolio-mobile-main-slider {
					overflow: hidden !important;
				}
				.js-portfolio-mobile-wrap-slider {
					display: flex !important;
					transition: transform 0.5s !important;
					overflow: visible !important;
				}
				.js-portfolio-mobile__item-slider {
					display: flex !important;
					align-items: center !important;
					justify-content: center !important;
					margin: 0 auto !important;
					flex: 0 0 120% !important;
				}

				.slider-counter-responsive {
					bottom: 17px;
			  }
			}
		`
	});

	mobileSlider.prevSlider = function() {
		if (this.options.position > 0) {
			const prev = prevFun.bind(this);
			prev();
			current.textContent = this.options.position + 1;
		}
	};

	mobileSlider.nextSlider = function() {
		if (this.options.position < this.options.maxPosition) {
			const next = nextFun.bind(this);
			next();
			current.textContent = this.options.position + 1;
		}
	};

	mobileSlider.options.widthSlide = 122;

	total.textContent = mobileSlider.slides.length;
	mobileSlider.init();
};

export default portfolioSlider;
