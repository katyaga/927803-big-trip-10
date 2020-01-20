import {MonthNames} from "../const";
import AbstractComponent from "./abstarct-component";

export default class TripDay extends AbstractComponent {
  constructor(day, index) {
    super();

    this._tripDay = day;
    this._index = index;
  }

  _getTripDaysDay(day) {
    const dayDate = day[0].dateStart;
    return `${MonthNames[dayDate.getMonth()]} ${dayDate.getDate()}`;
  }

  _createTripDayWithDay() {
    return (
      `<li class="trip-days__item day">
        <div class="day__info">
          <span class="day__counter">${this._index + 1}</span>
          <time class="day__date" datetime="">${this._getTripDaysDay(this._tripDay)}</time>
        </div>
        <ul class="trip-events__list"></ul>
      </li>`
    );
  }

  _createTripDayWithOutDay() {
    return (
      `<li class="trip-days__item day">
        <div class="day__info">
          <span class="day__counter"></span>
          <time class="day__date" datetime=""></time>
        </div>
            <ul class="trip-events__list"></ul>
          </li>`
    );
  }

  getTemplate() {
    if (this._tripDay !== undefined && this._index !== undefined) {
      return this._createTripDayWithDay();
    }
    return this._createTripDayWithOutDay();
  }
}
