'use strict';

let books = document.querySelectorAll('.book'),
  adv = document.querySelector('.adv'),
  linkText = books[4].querySelector('[target="_blank"]'),
  book2Elems = books[0].querySelectorAll('li'),
  book5Elems = books[5].querySelectorAll('li'),
  book6Elems = books[2].querySelectorAll('li'),
  newElem = document.createElement('li');


books[0].before(books[1]);
books[5].after(books[2]);
books[4].after(books[3]);
document.body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';
linkText.textContent = 'Книга 3. this и Прототипы Объектов';
adv.remove();
book2Elems[9].after(book2Elems[2]);
book2Elems[3].after(book2Elems[6]);
book2Elems[6].after(book2Elems[8]);
book5Elems[1].after(book5Elems[9]);
book5Elems[7].after(book5Elems[5]);
book5Elems[4].after(book5Elems[2]);
newElem.textContent = 'Глава 8: За пределами ES6';
book6Elems[8].after(newElem);