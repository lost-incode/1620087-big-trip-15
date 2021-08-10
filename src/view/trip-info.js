import dayjs from 'dayjs';

const FIRST_INDEX = 0;
const SECOND_INDEX = 1;
const MAX_LENGTH_VALUE = 3;

const formatEndDate = (startDate, endDate) => {
  if (dayjs(startDate).format('MM') === dayjs(endDate).format('MM')) {
    return dayjs(endDate).format('DD');
  }
  return dayjs(endDate).format('MMM DD');
};

export const createSiteTripInfoTemplate = (dataArray) => {
  const lastIndex = dataArray.length - 1;

  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">
      ${dataArray[FIRST_INDEX].point} &mdash;
      ${(dataArray.length <= MAX_LENGTH_VALUE) ? dataArray[SECOND_INDEX].point : '...'}
      &mdash; ${dataArray[lastIndex].point}
    </h1>
      <p class="trip-info__dates">
      ${dayjs(dataArray[FIRST_INDEX].startDate).format('MMM DD')}
      &nbsp;&mdash;&nbsp;
      ${formatEndDate(dataArray[FIRST_INDEX].startDate, dataArray[lastIndex].endDate)}
      </p>
    </div>
  </section>`;
};
