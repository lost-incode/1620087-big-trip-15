import dayjs from 'dayjs';

const formatEndDate = (startDate, endDate) => {
  if (dayjs(startDate).format('MM') === dayjs(endDate).format('MM')) {
    return dayjs(endDate).format('DD');
  }
  return dayjs(endDate).format('MMM DD');
};

export const createSiteTripInfoTemplate = (dataArray) => {
  const FIRST_INDEX = 0;
  const SECOND_INDEX = 1;
  const LAST_INDEX = dataArray.length - 1;
  if (dataArray.length <= 3) {
    return   `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">
      ${dataArray[FIRST_INDEX].point} &mdash; ${dataArray[SECOND_INDEX].point} &mdash; ${dataArray[LAST_INDEX].point}
    </h1>
      <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
    </div>
  </section>`;
  }
  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">
      ${dataArray[FIRST_INDEX].point} &mdash; ... &mdash; ${dataArray[LAST_INDEX].point}
    </h1>
      <p class="trip-info__dates">
      ${dayjs(dataArray[FIRST_INDEX].startDate).format('MMM DD')}
      &nbsp;&mdash;&nbsp;
      ${formatEndDate(dataArray[FIRST_INDEX].startDate, dataArray[LAST_INDEX].endDate)}
      </p>
    </div>
  </section>`;
};
