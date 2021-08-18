import AbstractView from './abstract.js';

const createSiteTripEventsListTemplate = () => (
  `<ul class="trip-events__list">

  </ul>`
);

export default class EventsList extends AbstractView {
  getTemplate() {
    return createSiteTripEventsListTemplate();
  }
}
