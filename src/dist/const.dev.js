"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WITHOUT_HOURS_FORMAT = exports.WITHOUT_DAYS_FORMAT = exports.DEFAULT_FORMAT = exports.MenuItem = exports.FilterType = exports.UpdateType = exports.UserAction = exports.SortType = void 0;
var SortType = {
  DEFAULT: 'default',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
};
exports.SortType = SortType;
var UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT'
};
exports.UserAction = UserAction;
var UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR'
};
exports.UpdateType = UpdateType;
var FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past'
};
exports.FilterType = FilterType;
var MenuItem = {
  NEW_EVENT: 'NEW_EVENT',
  TABLE: 'TABLE',
  STATS: 'STATS'
};
exports.MenuItem = MenuItem;
var DEFAULT_FORMAT = 'DD[D] HH[H] mm[M]';
exports.DEFAULT_FORMAT = DEFAULT_FORMAT;
var WITHOUT_DAYS_FORMAT = 'HH[H] mm[M]';
exports.WITHOUT_DAYS_FORMAT = WITHOUT_DAYS_FORMAT;
var WITHOUT_HOURS_FORMAT = 'mm[M]';
exports.WITHOUT_HOURS_FORMAT = WITHOUT_HOURS_FORMAT;