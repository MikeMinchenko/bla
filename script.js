'use strict';

class DomElement {
  constructor(selector, height, width, bg, fontSize) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
  }
  createElem() {
    let elem;
    if (this.selector[0] === '.') {
      elem = document.createElement('div');
      elem.classList.add(this.selector);
    } else if (this.selector[0] === '#') {
      elem = document.createElement('p');
      elem.classList.add(this.selector);
    }
    elem.style.cssText = `height: ${this.height}; width:${this.width}; background:${this.bg}; font-Size:${this.fontSize};`;
    elem.textContent = prompt('Введите Ваш текст сюда');
    document.body.append(elem);
  }
}

let domElement = new DomElement('.block', '150px', '150px', 'grey', '16px');
domElement.createElem();