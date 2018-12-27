'use strict';

import PhonesService from './services/phones-service.js';
import PhonesCatalogue from './components/phones-catalog.js';
import Search from './components/search.js';

export default class PhonesPage {
  constructor({ element }) {
    this._element = element;
    this._phones = PhonesService.getPhones();

    this._catalogue = new PhonesCatalogue({
      element: this._element.querySelector('[data-component="phones-catalog"]'),
      phones: PhonesService.getPhones(),
    });

    this._search = new Search({
      element: this._element.querySelector('[data-component="search"]')
    });

    this._search.on('search', (event) => {
      let searchQuery = event.detail.toLowerCase();
      let phones = this._phones.filter((phone) => {
        let strForSearch = phone.name + phone.snippet;
        return strForSearch.toLowerCase().includes(searchQuery);
      })

      this._catalogue = new PhonesCatalogue({
        element: this._element.querySelector('[data-component="phones-catalog"]'),
        phones: phones
      })
    });
  }
}
