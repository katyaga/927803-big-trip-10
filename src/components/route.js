import {MONTH_NAMES} from "../const";
import AbstractComponent from "./abstarct-component";

export default class Route extends AbstractComponent {
  constructor(tripDays) {
    super();

    this._tripDays = tripDays;
    this._tripCards = this._tripDays.flat();
  }

  _getRouteDays() {
    const dateStart = this._tripCards[0].dateStart;
    const dateEnd = this._tripCards[this._tripCards.length - 1].dateEnd;
    const monthStart = MONTH_NAMES[dateStart.getMonth()];
    const dayStart = dateStart.getDate();
    const monthEnd = MONTH_NAMES[dateEnd.getMonth()];
    const dayEnd = dateEnd.getDate();
    return `${monthStart} ${dayStart} - ${monthStart === monthEnd ? `` : monthEnd} ${dayEnd}`;
  }

  _getRouteCities() {
    let routeCityList = [];
    this._tripCards.forEach((tripCard) => {
      routeCityList.push(tripCard.destination.name);
    });
    let routeCityCount = routeCityList.length;
    if (routeCityCount <= 3) {
      return routeCityList.join(` - `);
    }
    return `${routeCityList[0]} - ... - ${routeCityList[routeCityCount - 1]}`;
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
}


