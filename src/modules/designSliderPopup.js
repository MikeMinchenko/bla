import CarouselSlider from './carouselSlider.js';

const designSliderPopup = () => {
	const buttonHolder = document.querySelector('#nav-list-popup-designs'),
		buttons = buttonHolder.querySelectorAll('.designs-nav__item');

	const tabSlider = new CarouselSlider({
		main: '.nav.nav-designs.nav-popup',
		wrap: '#nav-list-popup-designs',
		prev: '#nav-arrow-popup-designs_left',
		next: '#nav-arrow-popup-designs_right',
		stylesId: 'js-nav-designs-popup-slider-styles',
		styleClasses: {
			main: 'js-nav-designs-popup-main--slider',
			wrap: 'js-nav-designs-popup-wrap-slider',
			item: 'js-nav-designs-popup__item-slider'
		},
		slidesToShow: 3,
		responsive: [
			{
				breakpoint: 1025,
				slideToShow: 2
			},
			{
				breakpoint: 755,
				slideToShow: 1
			}
		]
	});

	tabSlider.addStyle = function() {
		let style = document.getElementById(this.stylesId);
		const styleClasses = this.options.styleClasses;
		if (!style) {
			style = document.createElement('style');
			style.id = this.stylesId;
		}

		style.textContent = `
			@media (max-width: 1134px) {
				.${styleClasses.main} {
					overflow: hidden !important;
				}

				.${styleClasses.wrap} {
					display: flex !important;
          display: -ms-flexbox !important;
					transition: transform 0.5s !important;
				}

				.${styleClasses.item} {
					display: flex !important;
          display: -ms-flexbox !important;
					align-items: center !important;
					margin: 0 auto !important;
					justify-content: center !important;
					flex: 0 0 ${this.options.widthSlide}% !important;
				}
				.${styleClasses.item} svg {
					left: unset;
				}
				#nav-list-popup-designs {
					min-width: 100%;
				}
			}
			@media (min-width: 1135px) {
				.${styleClasses.wrap} {
					transform: translateX(-0%) !important;
				}
			}
		`;

		document.head.append(style);
	};

	tabSlider.init();

	const slider = new CarouselSlider({
		buttons: false,
		main: '.popup-design-slider-wrap',
		wrap: '.popup-design-slider',
		stylesId: 'js-designs-popup-slider-wrap-style',
		styleClasses: {
			main: 'js-designs-popup-slider-main-slider',
			wrap: 'js-designs-popup-slider-wrap-slider',
			item: 'js-designs-popup-slider__item-slider'
		},
		slidesToShow: 1
	});

	slider.addStyle = function() {
		let style = document.getElementById(this.stylesId);
		const styleClasses = this.options.styleClasses;

		if (!style) {
			style = document.createElement('style');
			style.id = this.stylesId;
		}

		style.textContent = `
			.${styleClasses.main} {
				overflow: hidden !important;
			}

			.${styleClasses.wrap} {
        display: -webkit-box !important;
				display: -ms-flexbox !important;
				display: flex !important;
				-webkit-box-orient: vertical !important;
				-webkit-box-direction: normal !important;
				-ms-flex-direction: column !important;
				        flex-direction: column !important;
				-webkit-transition: -webkit-transform 0.5s !important;
				transition: -webkit-transform 0.5s !important;
				-o-transition: transform 0.5s !important;
				transition: transform 0.5s !important;
				transition: transform 0.5s, -webkit-transform 0.5s !important;
			}

			.${styleClasses.item} {
        display: flex !important;
        display: -ms-flexbox !important;
				margin: 0 auto !important;
				flex: 0 0 ${this.options.widthSlide}% !important;
				height: 100%;
				transition: 0.5s;
			}
			.js-designs-slider-wrap-slider {
				overflow: visible;
			}
		`;

		document.head.append(style);
	};

	slider.previewBlocks = document.querySelectorAll('.popup-design-text');

	slider.toggleContent = function(index) {
		this.slides.forEach((slide, i) => {
			if (i === index) {
				this.previewBlocks[i].classList.add('visible-content-block');
				this.wrap.style.transform = `translateY(-${this.options.widthSlide / 5 * i}%)`;
			} else {
				this.previewBlocks[i].classList.remove('visible-content-block');
			}
		});
	};

	slider.init();

	const current = document.querySelector('#popup-designs-counter .slider-counter-content__current'),
		total = document.querySelector('#popup-designs-counter .slider-counter-content__total');

	const allInnerSlides = document.querySelectorAll('.js-designs-popup-slider__item-slider');

	const innerSlider = new CarouselSlider({
		main: '.nav.nav-designs',
		wrap: '.popup-designs-slider__style1',
		prev: '#popup_design_left',
		next: '#popup_design_right',
		stylesId: 'js-popup-designs-slider__style1-styles',
		styleClasses: {
			main: 'js-popup-designs-item--main--slider',
			wrap: 'js-popup-designs-item-wrap-slider',
			item: 'js-popup-designs-item__item-slider'
		},
		slidesToShow: 1
	});

	total.textContent = innerSlider.slides.length;

	innerSlider.addStyle = function() {};

	innerSlider.prevSlider = function() {
		if (this.options.position > 0) {
			--this.options.position;
			this.wrap.style.transform = `translateX(-${this.options.position *
				(this.options.widthSlide / this.slides.length)}%)`;
			this.next.style.visibility = '';
			if (this.options.position === 0) this.prev.style.visibility = 'hidden';
			current.textContent = this.options.position + 1;
		}
	};

	innerSlider.nextSlider = function() {
		if (this.options.position < this.options.maxPosition) {
			++this.options.position;
			this.wrap.style.transform = `translateX(-${this.options.position *
				(this.options.widthSlide / this.slides.length)}%)`;
			this.prev.style.visibility = '';
			if (this.options.position === this.options.maxPosition) this.next.style.visibility = 'hidden';
			current.textContent = this.options.position + 1;
		}
	};

	innerSlider.update = function({ wrap }) {
		const classNames = this.options.styleClasses;
		this.wrap.style.transform = '';
		this.wrap.classList.remove(classNames.wrap);
		this.slides.forEach(slide => slide.classList.remove(classNames.item));

		(this.wrap = document.querySelector('.' + wrap)), (this.slides = [ ...this.wrap.children ]);
		this.options.maxPosition = this.slides.length - this.slidesToShow;
		this.options.position = 0;

		this.init();

		total.textContent = this.slides.length;

		if (this.options.position === this.options.maxPosition) this.next.style.visibility = 'hidden';
		else this.next.style.visibility = '';

		if (this.options.position === 0) this.prev.style.visibility = 'hidden';
		else this.prev.style.visibility = '';

		current.textContent = 1;
	};

	buttonHolder.addEventListener('click', event => {
		const target = event.target.closest('#nav-list-popup-designs .designs-nav__item');
		if (!target) return;

		buttons.forEach((button, index) => {
			if (button === target) {
				slider.toggleContent(index);
				button.classList.add('active');
				const wrap = allInnerSlides[index].classList[0];

				innerSlider.update({
					wrap
				});
			} else button.classList.remove('active');
		});
	});

	innerSlider.init();
};

export default designSliderPopup;
