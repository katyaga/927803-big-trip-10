import {createElement} from '../utils.js';
import {MonthNames} from "../const";

export default class TripDays {
  constructor(tripDays) {
    this._tripDays = tripDays;
    this._element = null;
  }

  _getTripDaysDay(day) {
    const dayDate = day[0].dateStart;
    return `${MonthNames[dayDate.getMonth()]} ${dayDate.getDate()}`;
  }

  _generateTripCards(index, day) {
    return (
      `<li class="trip-days__item day">
          <div class="day__info">
            <span class="day__counter">${index + 1}</span>
            <time class="day__date" datetime="">${this._getTripDaysDay(day)}</time>
          </div>
          <ul class="trip-events__list"></ul>
        </li>`
    );
  }

  _createTripDaysTemplate() {
    const getTripCards = this._tripDays.map((day, i) => this._generateTripCards(i, day)).join(`\n`);

    return `<ul class="trip-days">${getTripCards}</ul>`;
  }

  getTemplate() {
    return this._createTripDaysTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
