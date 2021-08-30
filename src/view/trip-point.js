import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import AbstractView from './abstract.js';

dayjs.extend(duration);

const DEFAULT_FORMAT = 'DD[D] HH[H] mm[M]';
const WITHOUT_DAYS_FORMAT = 'HH[H] mm[M]';
const WITHOUT_HOURS_FORMAT = 'mm[M]';

const formatDuration = (startDate, endDate) => {
  const diff = dayjs(dayjs(endDate).diff(dayjs(startDate)));
  const durationMs = dayjs.duration(diff, 'ms');
  const durationObject = durationMs.$d;
  let durationFormat = DEFAULT_FORMAT;

  if (!durationObject.days && !durationObject.hours) {
    durationFormat = WITHOUT_HOURS_FORMAT;
  } else if (!durationObject.days) {
    durationFormat = WITHOUT_DAYS_FORMAT;
  }

  return durationMs.format(durationFormat);
};

const renderDuration = (startDate, endDate) => `<p class="event__duration">
    ${formatDuration(startDate, endDate)}
    </p>`;

const renderOffers = (offers = []) => `<h4 class="visually-hidden">Offers:</h4>
  <ul class="event__selected-offers">
  ${offers.map(({title, price}) => (`<li class="event__offer">
  <span class="event__offer-title">${title}
  </span>&plus;&euro;&nbsp;
  <span class="event__offer-price">${price}</span>
  </li>`)).join('')}
  </ul>`;

const createSiteTripPointTemplate = ({type, startDate, endDate, point, offers, basePrice, isFavorite}) => `<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="2019-03-18">${dayjs(startDate).format('DD MMM')}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/taxi.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type} ${point}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="2019-03-18T10:30">${dayjs(startDate).format('HH:mm')}</time>
        &mdash;
        <time class="event__end-time" datetime="2019-03-18T11:00">${dayjs(endDate).format('HH:mm')}</time>
      </p>
      ${renderDuration(startDate, endDate)}
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
    </p>
  ${renderOffers(offers)}
  <button
    class="event__favorite-btn ${(isFavorite) ?  'event__favorite-btn--active': ''}" type="button">
    <span class="visually-hidden">Add to favorite</span>
    <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
      <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
    </svg>
  </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
  </li>`;

export default class TripPoint extends AbstractView {
  constructor(point) {
    super();
    this._point = point;

    this._editClickHandler = this._editClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createSiteTripPointTemplate(this._point);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setEditClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._editClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.event__favorite-btn').addEventListener('click', this._favoriteClickHandler);
  }
}
