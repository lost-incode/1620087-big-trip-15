import dayjs from 'dayjs';

export const countSpentMoney = (currentType, points) =>
  points.reduce((counter, {type, basePrice}) => (type === currentType)? counter + basePrice : counter, 0);

export const countTypes = (currentType, points) =>
  points.reduce((counter, {type}) => (type === currentType)? ++counter : counter, 0);

export const durationTypes = (currentType, points) =>
  points.reduce((counter, {type, startDate, endDate}) => (type === currentType)? counter + dayjs(endDate).diff(startDate) : counter, 0);
