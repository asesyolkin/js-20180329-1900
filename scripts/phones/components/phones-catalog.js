'use strict';

export default class PhonesCatalogue {
  constructor({ element, phones }) {
    this._element = element;
    this._phones = phones;

    this._onPhoneClick = this._onPhoneClick.bind(this);

    this._render();

    this._element.addEventListener('click', this._onPhoneClick);
  }

  on(eventName, callback) {
    this._element.addEventListener(eventName, callback);
  }

  _onPhoneClick(event) {
    let phoneElement = event.target.closest('[data-element="phone"]');

    if (!phoneElement) {
      return;
    }

    let customEvent = new CustomEvent('phoneSelected', {
      detail: phoneElement.dataset.phoneId
    });

    this._element.dispatchEvent(customEvent);
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
              </li> 
            `)
            .join('')
        }
             
      </ul>    
    `;
  }
}