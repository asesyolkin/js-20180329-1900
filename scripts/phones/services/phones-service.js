'use strict';

let BASE_API_URL = 'https://asesyolkin.github.io/js-20180329-1900/api';

const PhonesService = {
  loadPhones(callback) {
    this._sendRequest('/phones', callback);
  },

  loadPhone(phoneId, callback) {
    this._sendRequest(`/phones/${ phoneId }`, callback);
  },

  _sendRequest(url, callback, { method = 'GET' } = {}) {
    let xhr = new XMLHttpRequest();
    let fullUrl = BASE_API_URL + url + '.json';

    xhr.open(method, fullUrl, true);

    xhr.send();

    xhr.onload = () => {
      let data = JSON.parse(xhr.responseText);

      callback(data);
    };
  }
};

export default PhonesService;