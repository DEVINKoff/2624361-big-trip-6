const AUTH_KEY = 'Basic bigtrip123456';
const BASE_URL = 'https://24.objects.htmlacademy.pro/big-trip';

export default class Api {
  constructor(baseUrl = BASE_URL, authKey = AUTH_KEY) {
    this._baseUrl = baseUrl;
    this._authKey = authKey;
  }

  async getPoints() {
    const response = await this._sendRequest({urlPath: 'points'});
    const data = await response.json();
    return data.map(this._convertFromServer);
  }

  async getDestinations() {
    const response = await this._sendRequest({urlPath: 'destinations'});
    return await response.json();
  }

  async getOffers() {
    const response = await this._sendRequest({urlPath: 'offers'});
    return await response.json();
  }

  async updatePoint(point) {
    const response = await this._sendRequest({
      urlPath: `points/${point.id}`,
      methodType: 'PUT',
      payload: JSON.stringify(this._convertToParameters(point)),
      customHeaders: new Headers({'Content-Type': 'application/json'})
    });

    const result = await response.json();
    return this._convertFromServer(result);
  }

  async addPoint(point) {
    const response = await this._sendRequest({
      urlPath: 'points',
      methodType: 'POST',
      payload: JSON.stringify(this._convertToParameters(point)),
      customHeaders: new Headers({'Content-Type': 'application/json'})
    });

    const result = await response.json();
    return this._convertFromServer(result);
  }

  async deletePoint(pointId) {
    await this._sendRequest({
      urlPath: `points/${pointId}`,
      methodType: 'DELETE'
    });
  }

  async _sendRequest({urlPath, methodType = 'GET', payload = null, customHeaders = new Headers()}) {
    customHeaders.set('Authorization', this._authKey);

    const result = await fetch(`${this._baseUrl}/${urlPath}`, {
      method: methodType,
      body: payload,
      headers: customHeaders
    });

    if (!result.ok) {
      throw new Error(`${result.status}: ${result.statusText}`);
    }

    return result;
  }

  _convertToParameters(point) {
    return {
      'base_price': point.basePrice,
      'date_from': point.dateFrom,
      'date_to': point.dateTo,
      'destination': point.destinationId,
      'id': point.id,
      'is_favorite': point.isFavorite,
      'offers': point.offersIds,
      'type': point.type
    };
  }

  _convertFromServer(point) {
    return {
      id: point['id'],
      type: point['type'],
      basePrice: point['base_price'],
      dateFrom: point['date_from'],
      dateTo: point['date_to'],
      destinationId: point['destination'],
      isFavorite: point['is_favorite'],
      offersIds: point['offers']
    };
  }
}