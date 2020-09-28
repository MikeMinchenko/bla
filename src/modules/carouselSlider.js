export default class CarouselSlider {
	constructor({
		main,
		wrap,
		next,
		prev,
		position = 0,
		slidesToShow = 3,
		infinity = false,
		responsive = [],
		styles,
		stylesId,
		styleClasses,
		noAdaptiveStyles,
		buttons = true
	}) {
		this.main = document.querySelector(main);
		this.wrap = document.querySelector(wrap);
		this.slides = [ ...this.wrap.children ];
		this.prev = document.querySelector(prev);
		this.next = document.querySelector(next);
		this.slidesToShow = slidesToShow;
		this.responsive = responsive;
		this.stylesId = stylesId;
		this.noAdaptiveStyles = noAdaptiveStyles;
		this.styles = styles;
		this.buttons = buttons;
		this.options = {
			position,
			widthSlide: Math.floor(100 / this.slidesToShow),
			infinity,
			maxPosition: this.slides.length - this.slidesToShow,
			styleClasses
		};
	}

	init() {
		this.addCrackClass();
		this.addStyle();
		if (!this.prev && !this.next && this.buttons) this.addArrow();
		if (this.buttons) {
			this.controlSlider();
			this.prev.style.visibility = 'hidden';
		}

		if (this.responsive.length) this.responseInit();
	}

	responseInit() {
		const slidesToShowDefault = this.slidesToShow;
		this.responsive.sort((a, b) => b.breakpoint - a.breakpoint);
		const allResponse = this.responsive.map(item => item.breakpoint);
		const maxResponse = Math.max(...allResponse);

		const checkResponse = () => {
			const widthWindow = document.documentElement.clientWidth;
			if (widthWindow < maxResponse) {
				this.responsive.forEach((response, index) => {
					if (widthWindow < response.breakpoint) {
						this.slidesToShow = this.responsive[index].slideToShow;
						this.options.widthSlide = Math.floor(100 / this.slidesToShow);
						this.options.maxPosition = this.slides.length - this.slidesToShow;
						this.addStyle();
					}
				});
			} else {
				this.slidesToShow = slidesToShowDefault;
				this.options.widthSlide = Math.floor(100 / this.slidesToShow);
				this.options.maxPosition = this.slides.length - this.slidesToShow;
				this.addStyle();
			}
		};

		checkResponse();

		window.addEventListener('resize', checkResponse);
	}

	addCrackClass() {
		const styleClasses = this.options.styleClasses;
		this.main.classList.add(styleClasses.main);
		this.wrap.classList.add(styleClasses.wrap);
		this.slides.forEach(slide => slide.classList.add(styleClasses.item));
	}

	addStyle() {
		let style = document.getElementById(this.stylesId);
		const styleClasses = this.options.styleClasses;
		if (!style) {
			style = document.createElement('style');
			style.id = this.stylesId;
		}

		if (this.noAdaptiveStyles) {
			style.textContent = this.noAdaptiveStyles;
		} else {
			style.textContent = `
			.${styleClasses.main} {
				overflow: hidden !important;
			}

			.${styleClasses.wrap} {
				display: flex !important;
				transition: transform 0.5s !important;
				height: 100%
			}

			.${styleClasses.item} {
				display: flex !important;
				align-items: center !important;
				justify-content: center !important;
				margin: 0 auto !important;
				flex: 0 0 ${this.options.widthSlide}% !important;
			}

			${this.styles ? this.styles : ''}
			`;
		}

		document.head.append(style);
	}

	controlSlider() {
		if (!this.added) {
			this.added = true;
			this.prev.addEventListener('click', this.prevSlider.bind(this));
			this.next.addEventListener('click', this.nextSlider.bind(this));
		}
	}

	prevSlider() {
		const infinityType = this.options.infinity;
		if (infinityType) {
			if (infinityType === 'return') {
				if (this.options.position > 0) {
					--this.options.position;
					this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
				} else {
					this.options.position = this.options.maxPosition;
					this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
				}
				return;
			}

			return;
		}

		if (this.options.position > 0) {
			--this.options.position;
			this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
			this.next.style.visibility = '';
			if (this.options.position === 0) this.prev.style.visibility = 'hidden';
		}
	}

	nextSlider() {
		const infinityType = this.options.infinity;
		if (infinityType) {
			if (infinityType === 'return') {
				if (this.options.position < this.options.maxPosition) {
					++this.options.position;
					this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
				} else {
					this.options.position = 0;
					this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
				}
				return;
			}

			return;
		}

		if (this.options.position < this.options.maxPosition) {
			++this.options.position;
			this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
			this.prev.style.visibility = '';
			if (this.options.position === this.options.maxPosition) this.next.style.visibility = 'hidden';
		}
	}

	addArrow() {
		const styleClasses = this.options.styleClasses;

		this.prev = document.createElement('button');
		this.next = document.createElement('button');

		this.next.className = styleClasses.prev;
		this.prev.className = styleClasses.next;

		const style = document.createElement('style');
		style.textContent = `
        .${styleClasses.prev},
        .${styleClasses.next} {
          margin: 0 10px !important;
          border: 20px solid transparent !important;
          background: transparent !important;
        }

        .${styleClasses.prev} {
          border-right-color: #19bbfe !important;
        }

        .${styleClasses.next} {
          border-left-color: #19bbfe !important;
        }

        .${styleClasses.prev}:hover,
        .${styleClasses.next}:hover,
        .${styleClasses.prev}:focus,
        .${styleClasses.next}:focus {
          background: transparent !important;
          outline: transparent !important;
        }

      `;

		this.main.append(this.prev);
		this.main.append(this.next);
		document.head.append(style);
	}
}
