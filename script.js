'use strict';

let changeBtn = document.querySelector('#change-btn'),
  header = document.querySelector('#header');

changeBtn.addEventListener('click', function () {
  let
    r = Math.floor(Math.random() * (256)),
    g = Math.floor(Math.random() * (256)),
    b = Math.floor(Math.random() * (256)),
    color = '#' + r.toString(16) + g.toString(16) + b.toString(16);


  document.body.style.background = color;
  header.textContent = color;
  changeBtn.style.color = color;
});