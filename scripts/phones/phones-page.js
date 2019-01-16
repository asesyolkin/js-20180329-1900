'use strict';

import PhonesService from './services/phones-service.js';
import PhonesCatalogue from './components/phones-catalog.js';
import Search from './components/search.js';
import Sorting from './components/sorting.js';
import Basket from './components/basket.js';
import PhoneViewer from './components/phone-viewer.js';

export default class PhonesPage {
  constructor({ element }) {
    this._element = element;
    this._phones = [];
    this._phonesFilter = null;
    this._phonesCatalog = this._element.querySelector('[data-component="phones-catalog"]');

    this._catalogue = new PhonesCatalogue({
      element: this._phonesCatalog,
      phones: this._phones,
    });

    PhonesService.loadPhones((phones) => {
      this._phones = phones;
      this._catalogue.setPhones(phones);
    });

    this._catalogue.on('phoneSelected', (event) => {
      let phoneId = event.detail;

      PhonesService.loadPhone(phoneId, (phone) => {
        this._viewer.show(phone);
        this._catalogue.hide();
      });
    });

    this._catalogue.on('addToBasket', (event) => {
      this._basket.addToBasket(event);
    });

    this._viewer = new PhoneViewer({
      element: this._element.querySelector('[data-component="phone-viewer"]')
    })

    this._viewer.on('back', () => {
      this._viewer.hide();
      this._catalogue.show();
    });

    this._viewer.on('addToBasket', (event) => {
      this._basket.addToBasket(event);
    });

    this._search = new Search({
      element: this._element.querySelector('[data-component="search"]')
    });

    this._search.on('search', (event) => {
      let searchQuery = event.detail.toLowerCase();

      PhonesService.loadPhones((phones) => {
          this._phonesFilter = phones.filter(getFilteredPhones);
          
          this._phonesFilter = this._phonesFilter.map((phone) => {
            if (phone.name.toLowerCase().includes(searchQuery)) {
              phone.nameHTML = selectionSearchResults(phone.name);
            }
            if (phone.snippet.toLowerCase().includes(searchQuery)) {
              phone.snippet = selectionSearchResults(phone.snippet);
            }
            return phone;
          });
          
          this._catalogue.setPhones(this._phonesFilter);
          
          this._sorting.eventStart();
        })
        
      function getFilteredPhones(phone) {
        return phone.name.toLowerCase().includes(searchQuery) || phone.snippet.toLowerCase().includes(searchQuery);
      }
        
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

      this._catalogue.setPhones(phones);

      function sortName(phoneA, phoneB) {
        if (phoneA.name.toLowerCase() > phoneB.name.toLowerCase()) return 1;
        if (phoneA.name.toLowerCase() < phoneB.name.toLowerCase()) return -1;
      }

      function sortAge(phoneA, phoneB) {
        return phoneA.age - phoneB.age;
      }
    });

    this._basket = new Basket({
      element: this._element.querySelector('[data-component="basket"]'),
      listPhones: this._phonesCatalog.getElementsByTagName('LI'),
      listPhonesContainer: this._phonesCatalog
    })
  }
}
