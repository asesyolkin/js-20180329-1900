'use strict';

import Component from '../../component.js';

export default class Basket extends Component {
  constructor({ element, listPhonesContainer }){
    super({ element });

    this._listPhonesContainer = listPhonesContainer;
    this._addToBasket = this._addToBasket.bind(this);

    this._render();

    this._listPhonesContainer.addEventListener('click', this._addToBasket)
  }

  _addToBasket(event) {
    if (!event.target.closest('.button_add-to-basket')) return;

    event.target.onmousedown = () => false;

    let listOfGoods = this._element.querySelector('ul');
    let phoneName = event.target.closest('[data-element="phone"]').dataset.phoneName;

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