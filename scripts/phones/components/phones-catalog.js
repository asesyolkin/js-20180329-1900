'use strict';

import Component from '../../component.js';

export default class PhonesCatalogue extends Component {
  constructor({ element, phones }) {
    super({ element });
    this._phones = phones;

    if (this._phones) this._render();

    this._element.addEventListener('click', this._onDetailsTriggerClick.bind(this));
  }

  setPhones(phones) {
    this._phones = phones;
    this._render();
  }

  _onDetailsTriggerClick(event) {
    let trigger = event.target.closest('[data-element="details-trigger"]');

    if (!trigger) {
      return;
    }

    let phoneElement = event.target.closest('[data-element="phone"]');

    this._trigger('phoneSelected', phoneElement.dataset.phoneId);
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
                  data-element="details-trigger"
                  class="thumb">
                  <img alt="${ phone.name }"
                  src="${ phone.imageUrl }">
                </a>
                  
                <a href="#!/phones/${ phone.id }"
                  data-element="details-trigger">
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