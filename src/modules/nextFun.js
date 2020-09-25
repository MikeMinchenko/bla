const nextFun = function(value) {
	++this.options.position;
	this.wrap.style.transform = `translateX(-${this.options.position *
		(value ? this.options.widthSlide / this.slides.length : this.options.widthSlide)}%)`;
	this.prev.style.visibility = '';
	if (this.options.position === this.options.maxPosition) this.next.style.visibility = 'hidden';
};

export default nextFun;
// const next = nextFun.bind(this);
// next();
