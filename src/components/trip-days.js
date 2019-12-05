import {createTripCardTemplate} from "../components/trip-card";
import {createElement} from '../utils.js';
import {MonthNames} from "../const";

const createTripDaysTemplate = (tripDays) => {

  return (
    `<ul class="trip-days">
      ${tripDays.map((day, i) => {

      const getTripDaysDay = () => {
        const dayDate = day[0].dateStart;
        return `${MonthNames[dayDate.getMonth()]} ${dayDate.getDate()}`;
      };

      return (
        `<li class="trip-days__item day">
        <div class="day__info">
          <span class="day__counter">${i + 1}</span>
          <time class="day__date" datetime="">${getTripDaysDay()}</time>
        </div>

        <ul class="trip-events__list">
        ${day.map((tripCard) => createTripCardTemplate(tripCard)).join(`\n`)}
        </ul>
      </li>`
      );
    }).join(`\n`)}
    </ul>`
  );
};

export default class TripDays {
  constructor(tripDays) {
    this._tripDays = tripDays;
    this._element = null;
  }

  getTemplate() {
    return createTripDaysTemplate(this._tripDays);
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

