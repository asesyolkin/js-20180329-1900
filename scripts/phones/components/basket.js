'use strict';

import Component from '../../component.js';

export default class Basket extends Component {
  constructor({ element, listPhonesContainer }){
    super({ element });

    this._listPhonesContainer = listPhonesContainer;

    this._render();

    this._element.addEventListener('click', this._removeButton);
  }

  addToBasket(event) {
    let listOfGoods = this._element.querySelector('ul');
    let phoneName = event.detail;
    let removeButton = document.createElement('span');

    removeButton.textContent = 'X';
    removeButton.dataset.element = 'remove-button';

    if (listOfGoods.children[0].textContent === 'нет товаров') {
      listOfGoods.children[0].textContent = phoneName;
      listOfGoods.children[0].classList.add('product');
      listOfGoods.children[0].appendChild(removeButton);
    } else {
      let newProduct = document.createElement('li');
      newProduct.textContent = phoneName;
      newProduct.classList.add('product');
      listOfGoods.appendChild(newProduct);
      newProduct.appendChild(removeButton);
    }
  }

  _removeButton(event) {
    let removeButton = event.target.closest('[data-element="remove-button"]');

    if (!removeButton) {
      return;
    }
    
    let listOfGoods = removeButton.closest('ul');

    if (listOfGoods.children.length === 1) {
      listOfGoods.children[0].textContent = 'нет товаров';
    } else {
      removeButton.parentElement.remove();
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