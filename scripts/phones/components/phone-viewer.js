'use strict';

import Component from '../../component.js';

export default class PhoneViewer extends Component{
  constructor({ element }) {
    super({ element });

    this._element.addEventListener('click', this._onBackButtonClick.bind(this));
    this._element.addEventListener('click', this._onChangeImage.bind(this));
    this._element.addEventListener('click', this._onAddToBasket.bind(this));
  }
  
  show(phone) {
    this._phone = phone;
    this._render();

    super.show();
  }

  _onBackButtonClick(event) {
    let backButton = event.target.closest('[data-element="back-button"]');

    if (!backButton) {
      return;
    }

    this._trigger('back');
  }

  _onChangeImage(event) {
    let smallImage = event.target.closest('[data-element_small-image-numb]');

    if (!smallImage) {
      return;
    }

    let mainImage = this._element.querySelector('[data-element="main-image"]');
    let smallImageNumb = +smallImage.dataset.element_smallImageNumb;

    mainImage.setAttribute('src', this._phone.images[smallImageNumb]);
  }

  _onAddToBasket(event) {
    let trigger = event.target.closest('[data-element="add-to-basket"]');

    if (!trigger) {
      return;
    }

    let phoneName = this._element.querySelector('[data-element="phone-name"]').textContent;

    this._trigger('addToBasket', phoneName);
  }

  _render() {
    let phone = this._phone;

    this._element.innerHTML = `
      <h2>Phone details</h2>

      <div>
        <img class="phone" 
          data-element="main-image"
          src="${ phone.images[0] }"
        >

        <button data-element="back-button">Back to list</button>
        <button data-element="add-to-basket">Add to basket</button>
    
        <h1 data-element="phone-name">${ phone.name }</h1>
    
        <p>${ phone.description }</p>
        
        <ul class="phone-thumbs">
          ${phone.images.map((imageUrl, imageNumb) => `
            <li>
              <img 
                data-element_small-image-numb=" ${ imageNumb } "
                src="${ imageUrl }"
              >
            </li>
          `).join('')}
        </ul>
      </div>
    `;
  }
}