import {MonthNames} from "../const";
import {createElement} from '../utils.js';

const createRouteTemplate = (tripDays) => {
  let tripCards = tripDays.flat();
  const getRouteDays = () => {
    const dateStart = tripCards[0].dateStart;
    const dateEnd = tripCards[tripCards.length - 1].dateEnd;
    const monthStart = MonthNames[dateStart.getMonth()];
    const dayStart = dateStart.getDate();
    const monthEnd = MonthNames[dateEnd.getMonth()];
    const dayEnd = dateEnd.getDate();
    return `${monthStart} ${dayStart} - ${monthStart === monthEnd ? `` : monthEnd} ${dayEnd}`;
  };
  const getRouteCities = () => {
    let routeCityList = [];
    tripCards.forEach((tripCard) => {
      routeCityList.push(tripCard.city);
    });
    let routeCityCount = routeCityList.length;
    if (routeCityCount <= 3) {
      return routeCityList.join(` - `);
    } else {
      return `${routeCityList[0]} - ... - ${routeCityList[routeCityCount - 1]}`;
    }
  };

  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${getRouteCities()}</h1>

      <p class="trip-info__dates">${getRouteDays()}</p>
    </div>`
  );
};

export default class Route {
  constructor(tripDays) {
    this._tripDays = tripDays;
    this._element = null;
  }

  getTemplate() {
    return createRouteTemplate(this._tripDays);
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


