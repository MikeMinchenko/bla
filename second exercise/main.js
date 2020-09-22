const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const color = document.getElementById('color');
const select = document.getElementById('select');

canvas.addEventListener('mousemove', event => {
	const x = event.offsetX,
		y = event.offsetY,
		mx = event.movementX,
		my = event.movementY;

	if (event.buttons > 0) {
		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.lineTo(x - mx, y - my);
		ctx.stroke();
		ctx.closePath();
	}
});

color.addEventListener('input', () => (ctx.strokeStyle = color.value));
select.addEventListener('change', () => (ctx.lineWidth = select.value));
