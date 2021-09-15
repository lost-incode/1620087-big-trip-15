import dayjs from 'dayjs';
import AbstractView from './abstract.js';

const FIRST_POINT_INDEX = 0;
const SECOND_POINT_INDEX = 1;
const MAX_LENGTH_VALUE = 3;

const formatEndDate = (startDate, endDate) => {
  if (dayjs(startDate).format('MM') === dayjs(endDate).format('MM')) {
    return dayjs(endDate).format('DD');
  }
  return dayjs(endDate).format('MMM DD');
};

const createSiteTripInfoTemplate = (dataArray) => {
  const lastPointIndex = dataArray.length - 1;
  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">
      ${dataArray[FIRST_POINT_INDEX].destination.name} &mdash;
      ${(dataArray.length <= MAX_LENGTH_VALUE) ? dataArray[SECOND_POINT_INDEX].destination.name : '...'}
      &mdash; ${dataArray[lastPointIndex].destination.name}
    </h1>
      <p class="trip-info__dates">
      ${dayjs(dataArray[FIRST_POINT_INDEX].startDate).format('MMM DD')}
      &nbsp;&mdash;&nbsp;
      ${formatEndDate(dataArray[FIRST_POINT_INDEX].startDate, dataArray[lastPointIndex].endDate)}
      </p>
    </div>
  </section>`;
};

export default class TripInfo extends AbstractView {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createSiteTripInfoTemplate(this._points);
  }
}
