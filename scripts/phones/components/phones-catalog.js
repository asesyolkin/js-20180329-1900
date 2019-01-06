'use strict';

import Component from '../../component.js';

export default class PhonesCatalogue extends Component {
  constructor({ element, phones }) {
    super({ element });
    this._phones = phones;

    this._onPhoneClick = this._onPhoneClick.bind(this);

    this._render();

    this._element.addEventListener('click', this._onPhoneClick);
  }

  _onPhoneClick(event) {
    let phoneElement = event.target.closest('[data-element="phone"]');

    if (!phoneElement) {
      return;
    }

    this._trigger('phoneSelected', phoneElement.dataset.phoneId)
  }

  _render() {
    this._element.innerHTML = `
      <ul class="phones">
      
        ${
          this._phones
            .map((phone) => `
              <li class="thumbnail"
                  data-element="phone"
                  data-phone-id="${ phone.id }"
                  data-phone-name="${ phone.name }">
                  
                <a href="#!/phones/${ phone.id }"
                   class="thumb">
                  <img alt="${ phone.name }"
                       src="${ phone.imageUrl }">
                </a>
                
                <a href="#!/phones/${ phone.id }">
                ${ phone.nameHTML || phone.name }
                </a>
                
                <p>${ phone.snippet }</p>

                <span class="button_add-to-basket">
                  <a>Add</a>
                </span>
              </li> 
            `)
            .join('')
        }
             
      </ul>    
    `;
  }
}