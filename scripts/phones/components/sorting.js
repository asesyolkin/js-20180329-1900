'use strict';

export default class Sorting{
  constructor({ element }){
    this._element = element;
    this._sorting = this._sorting.bind(this);

    this._render();

    this._element.addEventListener('change', this._sorting);
  }

  on(eventName, callback) {
    this._element.addEventListener(eventName, callback);
  }

  _sorting(e) {
    let customEvent = new CustomEvent('sorting', {
      detail: e.target.value
    })

    this._element.dispatchEvent(customEvent);
  }

  _render() {
    this._element.innerHTML = `
      Sort by:
      <select data-component="sorting-select">
        <option value="name">Alphabetical</option>
        <option value="age" selected="selected">Newest</option>
      </select>
    `;
  }
}