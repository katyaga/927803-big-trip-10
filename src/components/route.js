import {MonthNames} from "../const";
import {createElement} from '../utils.js';

export default class Route {
  constructor(tripDays) {
    this._tripDays = tripDays;
    this._tripCards = this._tripDays.flat();
    this._element = null;
  }

  _getRouteDays() {
    const dateStart = this._tripCards[0].dateStart;
    const dateEnd = this._tripCards[this._tripCards.length - 1].dateEnd;
    const monthStart = MonthNames[dateStart.getMonth()];
    const dayStart = dateStart.getDate();
    const monthEnd = MonthNames[dateEnd.getMonth()];
    const dayEnd = dateEnd.getDate();
    return `${monthStart} ${dayStart} - ${monthStart === monthEnd ? `` : monthEnd} ${dayEnd}`;
  }

  _getRouteCities() {
    let routeCityList = [];
    this._tripCards.forEach((tripCard) => {
      routeCityList.push(tripCard.city);
    });
    let routeCityCount = routeCityList.length;
    if (routeCityCount <= 3) {
      return routeCityList.join(` - `);
    } else {
      return `${routeCityList[0]} - ... - ${routeCityList[routeCityCount - 1]}`;
    }
  }

  _createRouteTemplate() {
    return (
      `<div class="trip-info__main">
      <h1 class="trip-info__title">${this._getRouteCities()}</h1>

      <p class="trip-info__dates">${this._getRouteDays()}</p>
    </div>`
    );
  }

  getTemplate() {
    return this._createRouteTemplate();
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


