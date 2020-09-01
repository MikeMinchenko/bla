'use strict';

let idAnimation;
const firstBall = document.querySelector('.first'),
  lastBall = document.querySelector('.last'),
  startBtn = document.getElementById('start'),
  resetBtn = document.getElementById('reset');
let count = 0,
  lastLeft = parseInt(window.getComputedStyle(lastBall).getPropertyValue("left")),
  firstRight = parseInt(window.getComputedStyle(firstBall).getPropertyValue("right")),
  lastBallPosition = false,
  firstBallPosition = false,
  rightStart = true,
  leftStart = false;


let animation = () => {
  lastLeft = parseInt(window.getComputedStyle(lastBall).getPropertyValue("left"));
  firstRight = parseInt(window.getComputedStyle(firstBall).getPropertyValue("right"));
  idAnimation = requestAnimationFrame(animation);

  if (!leftStart && rightStart) {

    if (lastLeft < 100 && rightStart) {
      count++;
      lastBall.style.left = `${count*2}px`;
    } else {
      rightStart = false;
      firstBallPosition = true;
    }
  } else if (firstBallPosition && !leftStart) {

    if (lastLeft > 0 && firstBallPosition) {
      count--;
      lastBall.style.left = `${(count*2)}px`;
    } else {
      count = 0;
      firstBallPosition = false;
      leftStart = true;

    }
  } else if (leftStart && !rightStart) {

    if (firstRight < 100 && leftStart) {
      count++;
      firstBall.style.right = `${count*2}px`;
    } else {
      leftStart = false;
      lastBallPosition = true;

    }
  } else if (lastBallPosition && !rightStart) {

    if (firstRight > 0 && !leftStart) {
      count--;
      firstBall.style.right = `${(count*2)}px`;
    } else {
      count = 0;
      lastBallPosition = false;
      rightStart = true;

    }
  }



};
let animate = false;

startBtn.addEventListener('click', () => {
  if (!animate) {
    idAnimation = requestAnimationFrame(animation);
    animate = true;
  } else {
    cancelAnimationFrame(idAnimation);
    animate = false;
  }
});

resetBtn.addEventListener('click', () => {
  cancelAnimationFrame(idAnimation);
  count = 0;
  firstBall.style.right = 0;
  lastBall.style.left = 0;
  animate = false;
});