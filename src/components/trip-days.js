import AbstractComponent from "./abstarct-component";

export default class TripDays extends AbstractComponent {
  _createTripDaysTemplate() {
    return `<ul class="trip-days"></ul>`;
  }

  getTemplate() {
    return this._createTripDaysTemplate();
  }
}
