import {createElement} from '../utils.js';

const createSiteTripCostTemplate = (dataArray) => {
  const totalPrice = dataArray.reduce(
    (accumulator, currentValue) => accumulator + Number(currentValue.basePrice)
    , 0);
  return `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
    </p>`;
};

export default class TripCost {
  constructor(points) {
    this._points = points;
    this._element = null;
  }

  getTemplate() {
    return createSiteTripCostTemplate(this._points);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
