export const SortType = {
  DEFAULT: 'default',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};

export const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

export const MenuItem = {
  NEW_EVENT: 'NEW_EVENT',
  TABLE: 'TABLE',
  STATS: 'STATS',
};

export const DEFAULT_FORMAT = 'DD[D] HH[H] mm[M]';
export const WITHOUT_DAYS_FORMAT = 'HH[H] mm[M]';
export const WITHOUT_HOURS_FORMAT = 'mm[M]';
