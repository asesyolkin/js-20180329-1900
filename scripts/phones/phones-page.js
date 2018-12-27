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

      selectionSearchResults.call(this._catalogue);

      function selectionSearchResults() {
        let allHTMLforSearch = this._element.children[0].innerHTML.toLowerCase().trim();
        let allHTMLforInsert = this._element.children[0].innerHTML.trim();
        
        outer: for (let i = 0; i < allHTMLforSearch.length; ++i) {
          
          if (allHTMLforSearch[i] === '<') {
            i = allHTMLforSearch.indexOf('>', i);
            continue outer;
          };

          if (allHTMLforSearch[i] === searchQuery[0]) {
            let a = i;
            let b = 0;
            for (; b < searchQuery.length;) {
              if (allHTMLforSearch[a] === searchQuery[b]) {
                ++a;
                ++b;
              }
              else {
                i = a;
                continue outer;
              }
            }

            let newPartValue = '<span class="matches">' + allHTMLforInsert.slice(i, i + searchQuery.length) + '</span>';

            allHTMLforSearch = allHTMLforSearch.slice(0, i) + newPartValue + allHTMLforSearch.slice(i + searchQuery.length);

            allHTMLforInsert = allHTMLforInsert.slice(0, i) + newPartValue + allHTMLforInsert.slice(i + searchQuery.length);

            i += newPartValue.length - 1;
          }
        }

        this._element.children[0].innerHTML = allHTMLforInsert;
      };
    });
  }
}
