'use strict';

const canvas = document.getElementById('canvas').getContext('2d');
const radius = 50;
const degrees = deg => Math.PI / 180 * deg;

const circles = [
	{
		color: 'blue',
		x: 2 * radius - radius / 2,
		y: 2 * radius
	},
	{
		color: 'black',
		x: 4 * radius,
		y: 2 * radius
	},
	{
		color: 'red',
		x: 6 * radius + radius / 2,
		y: 2 * radius
	},
	{
		color: 'yellow',
		x: 3 * radius - radius / 4,
		y: 3 * radius
	},
	{
		color: 'green',
		x: 5 * radius + radius / 4,
		y: 3 * radius
	}
];

const drawArc = (canvas, color, x, y, start, end) => {
	if (color !== 'white') drawArc(canvas, 'white', x, y, start + degrees(1), end - degrees(1));

	canvas.lineWidth = color === 'white' ? 11 : 10;
	canvas.strokeStyle = color;

	canvas.beginPath();
	canvas.arc(x, y, radius, start, end, false);
	canvas.stroke();
};

circles.forEach(circle => {
	drawArc(canvas, circle.color, circle.x, circle.y, 0, degrees(360));
});

circles.forEach(circle => {
	if (circle.color === 'blue') {
		drawArc(canvas, circle.color, circle.x, circle.y, 0, degrees(60));
		drawArc(canvas, circle.color, circle.x, circle.y, degrees(120), degrees(60));
	}
	if (circle.color === 'red') {
		drawArc(canvas, circle.color, circle.x, circle.y, degrees(60), degrees(120));
	}
	if (circle.color === 'black') {
		drawArc(canvas, circle.color, circle.x, circle.y, degrees(90), degrees(120));
		drawArc(canvas, circle.color, circle.x, circle.y, degrees(340), degrees(30));
	}
});
