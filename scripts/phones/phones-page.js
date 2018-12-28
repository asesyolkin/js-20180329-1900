'use strict';

import PhonesService from './services/phones-service.js';
import PhonesCatalogue from './components/phones-catalog.js';
import Search from './components/search.js';
import Sorting from './components/sorting.js';

export default class PhonesPage {
  constructor({ element }) {
    this._element = element;
    this._phones = PhonesService.getPhones();
    this._phonesFilter = null;

    this._catalogue = new PhonesCatalogue({
      element: this._element.querySelector('[data-component="phones-catalog"]'),
      phones: this._phones,
    });

    this._search = new Search({
      element: this._element.querySelector('[data-component="search"]')
    });

    this._search.on('search', (event) => {
      let searchQuery = event.detail.toLowerCase();

      this._phonesFilter = [];

      for (let i = 0; i < this._phones.length; ++i) {
        this._phonesFilter[i] = Object.assign({}, this._phones[i])
      }

      this._phonesFilter = this._phonesFilter.filter(function (phone) {
        return phone.name.toLowerCase().includes(searchQuery) || phone.snippet.toLowerCase().includes(searchQuery);
      })
      
      this._phonesFilter = this._phonesFilter.map((phone) => {
        if (phone.name.toLowerCase().includes(searchQuery)) {
          phone.nameHTML = selectionSearchResults(phone.name);
        }

        if (phone.snippet.toLowerCase().includes(searchQuery)) {
          phone.snippet = selectionSearchResults(phone.snippet);
        }
        return phone;
      });
      
      this._catalogue = new PhonesCatalogue({
        element: this._element.querySelector('[data-component="phones-catalog"]'),
        phones: this._phonesFilter
      })

      this._sorting.eventStart();

      function selectionSearchResults(value) {
        let strForSearch = value.toLowerCase();
        
        outer: for (let i = 0; i < strForSearch.length; ++i) {
          if (strForSearch[i] === searchQuery[0]) {
            let a = i;
            let b = 0;
            for (; b < searchQuery.length;) {
              if (strForSearch[a] === searchQuery[b]) ++a, ++b;
              else continue outer;
            }

            let newPartValue = '<span class="matches">' + value.slice(i, i + searchQuery.length) + '</span>';

            strForSearch = strForSearch.slice(0, i) + newPartValue + strForSearch.slice(i + searchQuery.length);

            value = value.slice(0, i) + newPartValue + value.slice(i + searchQuery.length);

            i += newPartValue.length - 1;
          }
        }

        return value;
      }
    });
        
    this._sorting = new Sorting({
      element: this._element.querySelector('[data-component="sorting"]')
    });

    this._sorting.on('sorting', (event) => {
      let typeSorting = event.detail;
      let phones = this._phonesFilter || this._phones;
      
      if (typeSorting === 'name') {
        phones.sort(sortName);
      } else {
        phones.sort(sortAge);
      }

      this._catalogue = new PhonesCatalogue({
        element: this._element.querySelector('[data-component="phones-catalog"]'),
        phones: phones
      })

      function sortName(phoneA, phoneB) {
        if (phoneA.name.toLowerCase() > phoneB.name.toLowerCase()) return 1;
        if (phoneA.name.toLowerCase() < phoneB.name.toLowerCase()) return -1;
      }

      function sortAge(phoneA, phoneB) {
        return phoneA.age - phoneB.age;
      }
    });
  }
}
