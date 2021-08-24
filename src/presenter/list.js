import EventsListView from '../view/events-list.js';
import {render} from '../utils/render.js';

export default class List {
  constructor(pointsContainer) {
    this._pointsContainer = pointsContainer;

    this._listComponent = new EventsListView();
  }

  init() {
    render(this._pointsContainer, this._listComponent);
  }
}
