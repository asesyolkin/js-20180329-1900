'use strict';

import Component from '../../component.js';

export default class Sorting extends Component {
  constructor({ element }){
    super({ element });
    this._sorting = this._sorting.bind(this);

    this._render();
    this._elementEvent = this._element.querySelector('[data-component="sorting-select"]');

    this._element.addEventListener('change', this._sorting);
  }
  
  eventStart() {
    let event = new Event('change', {
      bubbles: true
    });
    this._elementEvent.dispatchEvent(event);
  }
  
  _sorting(e) {
    this._trigger('sorting', e.target.value);
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