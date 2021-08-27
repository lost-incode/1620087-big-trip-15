import TripFiltersView from '../view/filters.js';
import {render} from '../utils/render.js';

export default class Filter {
  constructor(filterContainer) {
    this._filterContainer = filterContainer;

    this._filterComponent = new TripFiltersView();
  }

  init() {
    render(this._filterContainer, this._filterComponent);
  }
}
