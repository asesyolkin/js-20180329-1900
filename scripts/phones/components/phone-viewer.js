'use strict';

import Component from '../../component.js';

export default class PhoneViewer extends Component{
  constructor({ element }) {
    super({ element });

    this._element.addEventListener('click', this._onBackButtonClick.bind(this));
  }
  
  show(phone) {
    this._phone = phone;
    this._render();

    super.show();
  }

  _onBackButtonClick() {
    let backButton = event.target.closest('[data-element="back-button"]');

    if (!backButton) {
      return;
    }

    this._trigger('back');
  }

  _render() {
    let phone = this._phone;

    this._element.innerHTML = `
      <h2>Phone details</h2>

      <div>
        <img class="phone" src="${ phone.images[0] }">

        <button data-element="back-button">Back to list</button>
        <button>Add to basket</button>
    
        <h1>${ phone.name }</h1>
    
        <p>${ phone.description }</p>
        
        <ul class="phone-thumbs">
          ${phone.images.map((imageUrl) => `
            <li>
              <img src="${ imageUrl }">
            </li>
          `).join('')}
        </ul>
      </div>
    `;
  }
}