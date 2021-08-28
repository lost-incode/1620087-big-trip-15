import dayjs from 'dayjs';

export const sortDefault = (pointA, pointB) => dayjs(pointA.startDate).diff(dayjs(pointB.startDate));

export const sortTime = (pointA, pointB) => {
  const durationPointA = dayjs(pointA.endDate).diff(dayjs(pointA.startDate));
  const durationPointB = dayjs(pointB.endDate).diff(dayjs(pointB.startDate));

  return (durationPointA >= durationPointB)? durationPointA : durationPointB;
};

export const sortPrice = (pointA, pointB) => (pointA.basePrice >= pointB.basePrice)? pointA : pointB;
