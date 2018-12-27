'use strict';

export default class Search{
  constructor({ element }){
    this._element = element;
    this._search = this._search.bind(this);

    this._render();

    this._element.querySelector('[data-component="search-field"]').addEventListener('input', this._search);
  }

  on(eventName, callback) {
    this._element.addEventListener(eventName, callback);
  }

  _search(e) {
    let customEvent = new CustomEvent('search', {
      detail: e.target.value
    })

    this._element.dispatchEvent(customEvent);
  }

  _render() {
    this._element.innerHTML = `
      Search:
      <input data-component="search-field">
    `
  }
}