import CarouselSlider from './carouselSlider.js';

const designSliderContent = () => {
	const buttons = document.querySelectorAll('#designs-list .designs-nav__item'),
		buttonHolder = document.querySelector('#designs-list');

	const slider = new CarouselSlider({
		buttons: false,
		main: '.designs-slider',
		wrap: '.wrapper-for-design-slider',
		stylesId: 'js-designs-slider-wrap-style',
		styleClasses: {
			main: 'js-designs-slider-main-slider',
			wrap: 'js-designs-slider-wrap-slider',
			item: 'js-designs-slider__item-slider'
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
				display: flex !important;
        display: -ms-flexbox !important;
				flex-direction: column !important;
				-ms-flex-direction: column !important;
				transition: transform 0.5s !important;
			}

			.${styleClasses.item} {
				display: flex !important;
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

	slider.previewBlocks = document.querySelectorAll('#designs .preview-block');

	slider.toggleContent = function(index) {
		this.slides.forEach((slide, i) => {
			if (i === index) {
				this.previewBlocks[i].classList.add('visible');
				this.wrap.style.transform = `translateY(-${this.options.widthSlide / 5 * i}%)`;
			} else {
				this.previewBlocks[i].classList.remove('visible');
			}
		});
	};

	slider.init();

	const current = document.querySelector('#designs-counter .slider-counter-content__current'),
		total = document.querySelector('#designs-counter .slider-counter-content__total');

	const allSliders = document.querySelectorAll('.js-designs-slider__item-slider');

	const mobileSlider = new CarouselSlider({
		main: '.nav.nav-designs',
		wrap: '.designs-slider__style1',
		prev: '#design_left',
		next: '#design_right',
		stylesId: 'js-designs-slider__style1-styles',
		styleClasses: {
			main: 'js-nav-designs-item--main--slider',
			wrap: 'js-nav-designs-item-wrap-slider',
			item: 'js-nav-designs-item__item-slider'
		},
		slidesToShow: 1
	});

	total.textContent = mobileSlider.slides.length;

	mobileSlider.addStyle = function() {};

	mobileSlider.prevSlider = function() {
		if (this.options.position > 0) {
			--this.options.position;
			this.wrap.style.transform = `translateX(-${this.options.position *
				(this.options.widthSlide / this.slides.length)}%)`;
			this.next.style.visibility = '';
			if (this.options.position === 0) this.prev.style.visibility = 'hidden';
			current.textContent = this.options.position + 1;
		}
	};

	mobileSlider.nextSlider = function() {
		if (this.options.position < this.options.maxPosition) {
			++this.options.position;
			this.wrap.style.transform = `translateX(-${this.options.position *
				(this.options.widthSlide / this.slides.length)}%)`;
			this.prev.style.visibility = '';
			if (this.options.position === this.options.maxPosition) this.next.style.visibility = 'hidden';
			current.textContent = this.options.position + 1;
		}
	};

	mobileSlider.update = function({ wrap }) {
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
		else this.next.style.visibility = 'visible';

		if (this.options.position === 0) this.prev.style.visibility = 'hidden';
		else this.prev.style.visibility = 'visible';

		current.textContent = 1;
	};

	mobileSlider.init();

	buttonHolder.addEventListener('click', event => {
		const target = event.target.closest('#designs .designs-nav__item');
		if (!target) return;

		buttons.forEach((button, index) => {
			if (button === target) {
				slider.toggleContent(index);
				button.classList.add('active');
				const wrap = allSliders[index].classList[0];

				mobileSlider.update({ wrap });
			} else button.classList.remove('active');
		});
	});

	// пагинация
	const designs = document.querySelector('#designs'),
		sliders = document.querySelectorAll('.js-designs-slider__item-slider'),
		paginations = document.querySelectorAll('.preview-block');

	designs.addEventListener('click', event => {
		const target = event.target.closest('.preview-block__item');
		if (!target) return;
		const paginationHolder = target.closest('.preview-block');

		paginations.forEach((item, index) => {
			if (item === paginationHolder) {
				item = [ ...item.children ];

				item.forEach((block, i) => {
					if (block === target) {
						block.querySelector('.preview-block__item-inner').classList.add('preview_active');
						const slider = sliders[index];
						const length = item.length;
						slider.style.transform = `translateX(-${100 / length * i}%)`;
						current.textContent = i;
					} else {
						block.querySelector('.preview-block__item-inner').classList.remove('preview_active');
					}
				});
			}
		});
	});
};

export default designSliderContent;
