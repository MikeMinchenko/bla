'use strict';

class DomElement {
  constructor(selector, height, width, bg, position) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.position = position;

  }
  createElem() {
    let elem;
    if (this.selector[0] === '.') {
      elem = document.createElement('div');
      elem.classList.add(this.selector.slice(1));
    } else if (this.selector[0] === '#') {
      elem = document.createElement('p');
      elem.setAttribute('id', `${this.selector.slice(1)}`);
    }
    elem.style.cssText = `height: ${this.height}; width:${this.width}; background:${this.bg}; position:${this.position}; top: 0; left: 0`;
    document.body.append(elem);
  }
  eventListeners() {
    let _this = this;
    document.addEventListener("DOMContentLoaded", function () {
      _this.createElem();
    });
    window.addEventListener("keydown", function (event) {
      let elem = document.querySelector('.block');
      let elemStyle = getComputedStyle(elem);
      if (event.key === 'ArrowUp') {
        elem.style.top = (parseFloat(elemStyle.top) - 10) + 'px';
      } else if (event.key === 'ArrowDown') {
        elem.style.top = (parseFloat(elemStyle.top) + 10) + 'px';
      } else if (event.key === 'ArrowRight') {
        elem.style.left = (parseFloat(elemStyle.left) + 10) + 'px';
      } else if (event.key === 'ArrowLeft') {
        elem.style.left = (parseFloat(elemStyle.left) - 10) + 'px';
      }
    });
  }

}

let domElement = new DomElement('.block', '150px', '150px', 'grey', 'absolute');
domElement.eventListeners();