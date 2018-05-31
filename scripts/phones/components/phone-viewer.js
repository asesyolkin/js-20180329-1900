'use strict';

import Component from '../../component.js';

export default class PhoneViewer extends Component {
  constructor({ element }) {
    super({ element });

    this._phone = null;

    this._element.addEventListener('click', this._onBackButtonClick.bind(this));
    this._element.addEventListener('click', this._onSmallPictureClick.bind(this));
  }

  show(phone) {
    this._phone = phone;
    this._render();

    super.show();
  }

  _onSmallPictureClick() {
    let picture = event.target.closest('[data-element="small-picture"]');

    if (!picture) {
      return;
    }

    let largePicture = this._element.querySelector('[data-element="large-picture"]');
    largePicture.src = picture.src;
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
        <img
          data-element="large-picture"
          class="phone"
          src="${ phone.images[0] }"
       />

        <button data-element="back-button">Back to list</button>
        <button>Add to basket</button>
    
        <h1>${ phone.name }</h1>
    
        <p>${ phone.description }</p>
        
        <ul class="phone-thumbs">
          ${phone.images.map((imageUrl) => `
            <li>
              <img data-element="small-picture" src="${ imageUrl }">
            </li>
          `).join('')}
        </ul>
      </div>
    `;
  }
}