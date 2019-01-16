'use strict';

import Component from '../../component.js';

export default class Basket extends Component {
  constructor({ element, listPhonesContainer }){
    super({ element });

    this._listPhonesContainer = listPhonesContainer;

    this._render();
  }

  addToBasket(event) {
    let listOfGoods = this._element.querySelector('ul');
    let phoneName = event.detail;

    if (listOfGoods.children[0].textContent === 'нет товаров') {
      listOfGoods.children[0].textContent = phoneName;
    } else {
      let newGoods = document.createElement('li');
      newGoods.textContent = phoneName;
      listOfGoods.appendChild(newGoods);
    }
  }

  _render() {
    this._element.innerHTML = `
      <p>Shopping Cart</p>
      <ul>
        <li>нет товаров</li>
      </ul>
    `
  }
}