import dayjs from 'dayjs';

const convertTimeDifference = (ms) => {
  let days = Math.floor(ms / (24*60*60*1000));
  const daysms=ms % (24*60*60*1000);
  let hours = Math.floor((daysms)/(60*60*1000));
  const hoursms=ms % (60*60*1000);
  let minutes = Math.floor((hoursms)/(60*1000));
  if (hours < 10) {
    hours = `0${hours}H `;
  } else {
    hours = `${hours}H `;
  }
  if (minutes < 10) {
    minutes = `0${minutes}M `;
  } else {
    minutes = `${minutes}M `;
  }
  if ((days > 1) && (days < 10)) {
    days = `0${days}D `;
  } else if (days <= 1) {
    days = '';
    if (hours < 1) {
      hours = '';
    }
  } else {
    days = `${days}D `;
  }
  return `${days}${hours}${minutes}`;
};


const renderDuration = (startDate, endDate) => {
  const daifferenceMs = dayjs(endDate).diff(dayjs(startDate));
  const differenceDate = convertTimeDifference(daifferenceMs);
  return `<p class="event__duration">${differenceDate}</p>`;
};

const renderOffers = (offers = []) => `<h4 class="visually-hidden">Offers:</h4>
  <ul class="event__selected-offers">
  ${offers.map(({title, price}) => (`<li class="event__offer">
  <span class="event__offer-title">${title}</span>
    &plus;&euro;&nbsp;
  <span class="event__offer-price">${price}</span>
  </li>`))}
  </ul>`;

export const createSiteTripPointTemplate = (data) => (
  `<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="2019-03-18">${dayjs(data.startDate).format('DD MMM')}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/taxi.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${data.type} ${data.point}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="2019-03-18T10:30">${dayjs(data.startDate).format('HH:mm')}</time>
        &mdash;
        <time class="event__end-time" datetime="2019-03-18T11:00">${dayjs(data.endDate).format('HH:mm')}</time>
      </p>
      ${renderDuration(data.startDate, data.endDate)}
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${data.basePrice}</span>
    </p>
  ${renderOffers(data.offers)}
  <button
    class="event__favorite-btn ${(isFavourite) ?  'event__favorite-btn--active': ''}" type="button">
    <span class="visually-hidden">Add to favorite</span>
    <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
      <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
    </svg>
  </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
  </li>`
);
