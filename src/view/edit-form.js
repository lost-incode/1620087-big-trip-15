import dayjs from 'dayjs';
import flatpickr from 'flatpickr';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';

import SmartView from './smart.js';
import {pointOffers, POINT_TYPES, DATE_FORMAT, POINT_CITIES, MIN_PRICE, DESCRITPTION, IMAGES} from '../mock/point.js';

const DEFAULT_POINT = {
  type: POINT_TYPES[0],
  startDate: dayjs().format(DATE_FORMAT),
  endDate: dayjs().format(DATE_FORMAT),
  point: POINT_CITIES[0],
  offers: pointOffers[POINT_TYPES[0]],
  destination: {
    description: [],
    images:  [],
  },
  basePrice: MIN_PRICE,
  isFavorite: false,
};

// const renderCheckboxDiv = (offer, offers, isDisabled) => {
//   const checkedOffer = (offers.find((option) => option.title === offer.title)) ? 'checked' : '';

//   return `<div class="event__offer-selector">
//     <input class="event__offer-checkbox  visually-hidden" id="${offer.id}  ${isDisabled ? 'disabled' : ''}"
//     type="checkbox" name="${offer.name}" ${checkedOffer}>
//     <label class="event__offer-label" for="${offer.id}">
//         <span class="event__offer-title">${offer.title}</span>
//         &plus;&euro;&nbsp;
//         <span class="event__offer-price">${offer.price}</span>
//       </label>
//     </div>`;
// };

// const renderOffers = (type, offers = []) => {
//   const offerSection = pointOffers[type].map((offer) => renderCheckboxDiv(offer, offers));

//   return (pointOffers[type].length !== 0) ? `<section class="event__section  event__section--offers">
//     <h3 class="event__section-title  event__section-title--offers">Offers</h3>
//     <div class="event__available-offers">${offerSection.join('')}</div></section>` : '';
// };

const renderPictures = (pictures, isPictures) => {
  const imagesMarkup = pictures.map(({src, description}) => `<img class="event__photo" src="${src}" alt="${description}"></img>`);
  return (isPictures) ? `<div class="event__photos-container">
  <div class="event__photos-tape">
  ${imagesMarkup.join(' ')}
    </div>
  </div>` : '';
};

const renderDescription = (description, isDescription) => (isDescription) ? `<h3 class="event__section-title  event__section-title--destination">
  Destination
  </h3>
  <p class="event__destination-description">
  ${description}
  </p>` : '';

const renderDestination = (description, isDescription, pictures, isPictures) => (isDescription || isPictures) ? `<section class="event__section  event__section--destination">
    ${renderDescription(description, isDescription)}
    ${renderPictures(pictures, isPictures)}
    </section>` : '';

const renderTypeSelects = (type, isDisabled) => {
  const typeSelects = POINT_TYPES.map((defaultType) => `<div class="event__type-item">
    <input id="event-type-${defaultType.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${defaultType.toLowerCase()}" ${(defaultType === type)? 'checked' : '' }  ${isDisabled ? 'disabled' : ''}>
    <label class="event__type-label  event__type-label--${defaultType.toLowerCase()}" for="event-type-${defaultType}-1">${defaultType}</label>
  </div>`);
  return typeSelects.join(' ');
};

const renderDatalistCities = (cities) => {
  const datalistCities = cities.map((city) => `<option value="${city}"></option>`);

  return `<datalist id="destination-list-1">
    ${datalistCities.join('')}
    </datalist>`;
};

const createSiteEditFormTemplate = ({type, startDate, endDate, offers, destination, basePrice, isDescription, isPictures,  isSaving, isDeleting,isDisabled}) => `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox"  ${isDisabled ? 'disabled' : ''}>

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${renderTypeSelects(type, isDisabled)}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}"  ${isDisabled ? 'disabled' : ''} list="destination-list-1">
          ${renderDatalistCities(POINT_CITIES)}
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dayjs(startDate).format('DD/MM/YY HH:MM')}"  ${isDisabled ? 'disabled' : ''}>
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dayjs(endDate).format('DD/MM/YY HH:MM')}"  ${isDisabled ? 'disabled' : ''}>
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" pattern="[0-9]*" title="Доступны для ввода только числовые символы" value="${basePrice}"  ${isDisabled ? 'disabled' : ''}>
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit"  ${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
        <button class="event__reset-btn" type="reset"  ${isDisabled ? 'disabled' : ''}>${isDeleting ? 'Deleting...' : 'Delete'}</button>
        <button class="event__rollup-btn" type="button"  ${isDisabled ? 'disabled' : ''}>
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
      ${offers}
      ${renderDestination(destination.description, isDescription, destination.pictures, isPictures)}
      </section>
    </form>
  </li>`;

export default class EditingForm extends SmartView {
  constructor(point = DEFAULT_POINT) {
    super();

    this._data = EditingForm.parsePointToData(point);
    this._datepickerStartDate = null;
    this._datepickerEndDate = null;

    this._pointClickHandler = this._pointClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._startDateChangeHandler = this._startDateChangeHandler.bind(this);
    this._endDateChangeHandler = this._endDateChangeHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._typeChangeHandler = this._typeChangeHandler.bind(this);
    this._cityChangeHandler = this._cityChangeHandler.bind(this);
    this._priceChangeHandler = this._priceChangeHandler.bind(this);


    // this._offersChangeHandler = this._offersChangeHandler.bind(this);

    this._setInnerHandlers();
    this._setDatepickers();
  }

  // Перегружаем метод родителя removeElement,
  // чтобы при удалении удалялся более ненужный календарь
  removeElement() {
    super.removeElement();

    if (this._datepickerStartDate) {
      this._datepickerStartDate.destroy();
      this._datepickerStartDate = null;
    }

    if (this._datepickerEndDate) {
      this._datepickerEndDate.destroy();
      this._datepickerEndDate = null;
    }
  }

  reset(point) {
    this.updateData(
      EditingForm.parsePointToData(point),
    );
  }

  getTemplate() {
    return createSiteEditFormTemplate(this._data);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setDatepickers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setPointClickHandler(this._callback.click);
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  _setDatepickers() {
    if (this._datepickerStartDate) {
      // В случае обновления компонента удаляем вспомогательные DOM-элементы,
      // которые создает flatpickr при инициализации
      this._datepickerStartDate.destroy();
      this._datepickerStartDate = null;
    }

    if (this._datepickerEndDate) {
      // В случае обновления компонента удаляем вспомогательные DOM-элементы,
      // которые создает flatpickr при инициализации
      this._datepickerEndDate.destroy();
      this._datepickerEndDate = null;
    }

    this._datepickerStartDate = flatpickr(
      this.getElement().querySelector('#event-start-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        defaultDate: this._data.startDate,
        onChange: this._startDateChangeHandler, // На событие flatpickr передаём наш колбэк
      },
    );

    this._datepickerEndDate = flatpickr(
      this.getElement().querySelector('#event-end-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        minDate: this._data.startDate,
        enableTime: true,
        defaultDate: this._data.endDate,
        onChange: this._endDateChangeHandler, // На событие flatpickr передаём наш колбэк
      },
    );
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector('.event__type-group')
      .addEventListener('click', this._typeChangeHandler);
    this.getElement()
      .querySelector('.event__input--destination')
      .addEventListener('change', this._cityChangeHandler);
    this.getElement()
      .querySelector('.event__input--price')
      .addEventListener('change', this._priceChangeHandler);
    // this.getElement()
    //   .querySelectorAll('.event__available-offers')
    //   .forEach((checkbox) => {
    //     checkbox.addEventListener('change', this._offersChangeHandler);
    //   });
  }

  _typeChangeHandler(evt) {
    this.updateData({
      type: evt.target.textContent,
    });
  }

  _cityChangeHandler() {
    const newPointInput = this.getElement().querySelector('.event__input--destination');
    const newPoint = newPointInput.value;

    if (POINT_CITIES.indexOf(newPoint) === -1 ) {
      newPointInput.setCustomValidity('Select a city from the list');
    } else {
      this.updateData({
        destination: {
          name: newPoint,
          description: DESCRITPTION[newPoint],
          pictures: IMAGES[newPoint],
        },
      });
    }
  }

  _startDateChangeHandler([userStartDate]) {
    if (dayjs(this._data.endDate).diff(dayjs(userStartDate)) < 0) {
      userStartDate = this._data.endDate;
    }
    this.updateData({
      startDate: userStartDate,
    });
  }

  _endDateChangeHandler([userEndDate]) {
    this.updateData({
      endDate: userEndDate,
    });
  }

  _priceChangeHandler() {
    this.updateData({
      basePrice: this.getElement().querySelector('.event__input--price').value,
    });
  }

  // _offersChangeHandler() {
  //   this.updateData({
  //     offers: Array.from(this.getElement().querySelectorAll('.event__offer-checkbox checked'))
  //       .map((checkbox) => checkbox.value),
  //   });
  // }

  _pointClickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setPointClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._pointClickHandler);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(EditingForm.parseDataToPoint(this._data));
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(EditingForm.parseDataToPoint(this._data));
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._formDeleteClickHandler);
  }

  static parsePointToData(point) {
    return Object.assign(
      {},
      point,
      {
        isDescription: point.destination.description !== null,
        isPictures: point.destination.pictures !== null,
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      },
    );
  }

  static parseDataToPoint(data) {
    data = Object.assign({}, data);

    if (!data.isDescription) {
      data.destination.description = null;
    }

    if(!data.isPictures) {
      data.destination.pictures = null;
    }

    delete data.isDescription;
    delete data.isPictures;
    delete data.isDisabled;
    delete data.isSaving;
    delete data.isDeleting;

    return data;
  }
}
