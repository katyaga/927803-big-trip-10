import {MonthNames} from "../const";
import AbstractComponent from "./abstarct-component";

export default class TripDays extends AbstractComponent {
  constructor(tripDays) {
    super();

    this._tripDays = tripDays;
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
}
