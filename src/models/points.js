import {getPointsByFilter} from '../utils/filter.js';
import {FilterType} from '../const.js';
import {generateTripDays} from "../utils/common.js";

export default class Points {
  constructor() {
    this._tripDays = [];
    this._points = [];

    this._destinations = [];
    this._offers = [];

    this._activeFilterType = FilterType.EVERYTHING;

    this._filterChangeHandlers = [];
    this._dataChangeHandlers = [];
  }

  getPointsAll() {
    return this._points;
  }

  getFilteredPoints() {
    return getPointsByFilter(this._points, this._activeFilterType);
  }

  getFilteredDays() {
    const filteredPoints = getPointsByFilter(this._points, this._activeFilterType);
    return generateTripDays(filteredPoints);
  }

  getTripDays() {
    this._getTripDays();
    return this._tripDays;
  }

  _getTripDays() {
    this._tripDays = generateTripDays(this._points);
  }

  setTripPoints(tripPoints) {
    this._points = Array.from(tripPoints);
    this._callHandlers(this._dataChangeHandlers);
  }

  setDestinations(destinations) {
    this._destinations = destinations;
  }

  getDestinations() {
    return this._destinations;
  }

  setOffers(offers) {
    this._offers = offers;
  }

  getOffers() {
    return this._offers;
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  removePoint(id) {
    const index = this._points.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._points = [].concat(this._points.slice(0, index), this._points.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  updatePoint(id, point) {
    const index = this._points.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._points = [].concat(this._points.slice(0, index), point, this._points.slice(index + 1));

    // this._dataChangeHandlers.forEach((handler) => handler());
    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  addPoint(point) {
    this._points = [].concat(point, this._points);
    this._callHandlers(this._dataChangeHandlers);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
