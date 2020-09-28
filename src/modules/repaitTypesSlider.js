import CarouselSlider from './carouselSlider.js';
import nextFun from './nextFun.js';
import prevFun from './prevFun.js';

const repaitTypesSlider = () => {
	const buttons = document.querySelectorAll('.repair-types-nav__item'),
		slidesBlocks = document.querySelector('.repair-types-slider').children,
		total = document.querySelector('#repair-counter .slider-counter-content__total'),
		current = document.querySelector('#repair-counter .slider-counter-content__current'),
		// основной слайдер
		slider = new CarouselSlider({
			main: '.repair-types-slider',
			wrap: `.types-repair1`,
			prev: '#repair-types-arrow_left',
			next: '#repair-types-arrow_right',
			stylesId: `js-types-repair1-slider`,
			slidesToShow: 1,
			styleClasses: {
				main: `js-types-repair1-main-slider`,
				wrap: `js-types-repair1-wrap-slider`,
				item: `js-types-repair1__item-slider`
			}
		}),
		// слайдер табов
		buttonSlider = new CarouselSlider({
			main: '.nav.repair-types-nav',
			wrap: '.nav-list.nav-list-repair',
			prev: '#nav-arrow-repair-left_base',
			next: '#nav-arrow-repair-right_base',
			stylesId: 'js-repair-types-nav-slider-style',
			slidesToShow: 3,
			styleClasses: {
				main: 'js-repair-types-nav-main-slider',
				wrap: 'js-repair-types-nav-wrap-slider',
				item: 'js-repair-types-nav__item-slider'
			},
			responsive: [
				{
					breakpoint: 769,
					slideToShow: 2
				},
				{
					breakpoint: 576,
					slideToShow: 1
				}
			]
		});

	buttonSlider.addStyle = function() {
		let style = document.getElementById(this.stylesId);
		const styleClasses = this.options.styleClasses;

		if (!style) {
			style = document.createElement('style');
			style.id = this.stylesId;
		}

		style.textContent = `
			@media (max-width: 1024px) {
				.${styleClasses.main} {
					overflow: hidden !important;
				}

				.${styleClasses.wrap} {
					display: flex !important;
					transition: transform 0.5s !important;
					flex-wrap: nowrap;
				}

				.${styleClasses.item} {
					display: flex !important;
					align-items: center !important;
					flex-direction: column;
					justify-content: center !important;

					flex: 0 0 ${this.options.widthSlide}% !important;
				}

				.nav-list-repair {
					min-width: 100%;
				}
			}

			@media (min-width: 1024px) {
				.${styleClasses.wrap} {
					transform: translateX(-0%) !important;
				}
			}
		`;

		document.head.append(style);
	};

	buttonSlider.init();

	total.textContent = slider.slides.length;

	slider.update = function({ wrap, stylesId, wrapClass, itemClass }) {
		const oldStyles = document.getElementById(this.stylesId);

		oldStyles.remove();
		const classNames = this.options.styleClasses;
		this.wrap.style.transform = '';
		this.wrap.classList.remove(classNames.wrap);
		this.slides.forEach(slide => slide.classList.remove(classNames.item));
		this.wrap = document.querySelector(wrap);
		this.stylesId = stylesId;
		this.slides = [ ...this.wrap.children ];
		this.options.styleClasses.wrap = wrapClass;
		this.options.styleClasses.item = itemClass;
		this.options.maxPosition = this.slides.length - this.slidesToShow;
		this.options.position = 0;

		this.init();

		total.textContent = this.slides.length;

		this.options.position === this.options.maxPosition
			? (this.next.style.visibility = 'hidden')
			: (this.next.style.visibility = 'visible');

		this.options.position === 0
			? (this.prev.style.visibility = 'hidden')
			: (this.prev.style.visibility = 'visible');

		current.textContent = this.options.position + 1;
	};

	slider.prevSlider = function() {
		if (this.options.position > 0) {
			const prev = prevFun.bind(this);
			prev();
			current.textContent = this.options.position + 1;
		}
	};

	slider.nextSlider = function() {
		if (this.options.position < this.options.maxPosition) {
			const next = nextFun.bind(this);
			next();
			current.textContent = this.options.position + 1;
		}
	};

	slider.init();

	buttons.forEach((item, index) =>
		item.addEventListener('click', () => {
			const slidesArr = [ ...slidesBlocks ];
			for (let i = 0; i < slidesArr.length; i += 1) {
				if (index !== i) {
					slidesArr[i].style.display = 'none';
					buttons[i].classList.remove('active');
				} else {
					slidesArr[i].style.display = '';
					buttons[i].classList.add('active');
					slider.update({
						wrap: `.${slidesArr[i].classList[0]}`,
						wrapClass: `js-${slidesArr[i].classList[0]}-wrap-slider`,
						itemClass: `js-${slidesArr[i].classList[0]}__item-slider`,
						stylesId: `js-${slidesArr[i].classList[0]}-slider`
					});
				}
			}
		})
	);
};

export default repaitTypesSlider;
