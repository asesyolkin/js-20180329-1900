'use strict';

export default class Basket{
  constructor({ element, listPhones, listPhonesContainer }){
    this._element = element;
    this._listPhones = listPhones;
    this._listPhonesContainer = listPhonesContainer;
    this._addToBasket = this._addToBasket.bind(this);

    this._render();

    this._listPhonesContainer.addEventListener('click', this._addToBasket)
  }

  on(eventName, callback) {
    this._element.addEventListener(eventName, callback);
  }

  _addToBasket(event) {
    if (!event.target.closest('.button_add-to-basket')) return;

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
    `;
    
    for (let phone of this._listPhones) {
      let buttonAddToBasket = document.createElement('span');
      let linkInButton = document.createElement('a');

      linkInButton.textContent = 'Add';
      buttonAddToBasket.appendChild(linkInButton);
      buttonAddToBasket.classList.add('button_add-to-basket');

      phone.appendChild(buttonAddToBasket);
    }
  }
}