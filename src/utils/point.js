import dayjs from 'dayjs';
import {DEFAULT_FORMAT, WITHOUT_DAYS_FORMAT, WITHOUT_HOURS_FORMAT} from '../const.js';

export const isFuturePoint = (pointA) => (dayjs().diff(dayjs(pointA.startDate)) <= 0);

export const isPastPoint = (pointA) => (dayjs().diff(dayjs(pointA.endDate)) > 0);

export const sortDefault = (pointA, pointB) => dayjs(pointA.startDate).diff(dayjs(pointB.startDate));

export const sortTime = (pointA, pointB) => {
  const durationPointA = dayjs(pointA.endDate).diff(dayjs(pointA.startDate));
  const durationPointB = dayjs(pointB.endDate).diff(dayjs(pointB.startDate));

  return (durationPointA >= durationPointB)? -1 : 1;
};

export const sortPrice = (pointA, pointB) => (pointA.basePrice >= pointB.basePrice)? -1 : 1;

export const formatDuration = (startDate, endDate) => {
  const diff = (endDate) ? dayjs(dayjs(endDate).diff(dayjs(startDate))) : startDate;

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
