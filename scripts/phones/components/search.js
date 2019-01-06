'use strict';

import Component from '../../component.js';

export default class Search extends Component {
  constructor({ element }){
    super({ element });

    this._search = this._search.bind(this);

    this._render();

    this._element.querySelector('[data-component="search-field"]').addEventListener('input', this._search);
  }

  _search(e) {
    this._trigger('search', e.target.value);
  }

  _render() {
    this._element.innerHTML = `
      Search:
      <input data-component="search-field">
    `
  }
}