import {eventTypes, cities} from "../const";
import {formatDateTime} from "../utils/common";
import AbstractSmartComponent from "./abstract-smart-component";

export default class FormEdit extends AbstractSmartComponent {
  constructor(formEdit) {
    super();

    this._formEdit = formEdit;
  }

  _createEventTypeItem(types, group) {
    return types
      .filter((item) => item.group === group)
      .map((eventType) => {
        return (
          `<div class="event__type-item">
              <input id="event-type-${eventType.name}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${eventType.name}">
              <label class="event__type-label  event__type-label--${eventType.name}" for="event-type-${eventType.name}-1">${eventType.title}</label>
           </div>`
        );
      })
      .join(`\n`);
  }

  _createDestinationList() {
    return cities.map((destinationCity) => {
      return `<option value="${destinationCity}"></option>`;
    }).join(`\n`);
  }

  _createOptionsList() {
    const options = this._formEdit.options;
    return options.map((option) => {
      return (
        `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${option.type}-1" type="checkbox" name="event-offer-${option.type}" checked="">
          <label class="event__offer-label" for="event-offer-${option.type}-1">
            <span class="event__offer-title">${option.name}</span>
            +
            €&nbsp;<span class="event__offer-price">${option.price}</span>
          </label>
        </div>`
      );
    }).join(`\n`);
  }

  _createPhotoList() {
    const photos = this._formEdit.photos;
    const destinationPhotos = Array.from(photos);
    return destinationPhotos.map((destinationPhoto) => {
      return `<img class="event__photo" src=${destinationPhoto} alt="Event photo">`;
    }).join(`\n`);
  }

  _createFormEditTemplate() {
    const {type, city, text, price, dateStart, dateEnd} = this._formEdit;

    return (
      `<li class="trip-events__item">
      <form class="trip-events__item  event  event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type.name}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Transfer</legend>
                ${this._createEventTypeItem(eventTypes, `transfer`)}

              </fieldset>

              <fieldset class="event__type-group">
                <legend class="visually-hidden">Activity</legend>

                ${this._createEventTypeItem(eventTypes, `activity`)}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type.title} at
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
            <datalist id="destination-list-1">
              ${this._createDestinationList()}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">
              From
            </label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatDateTime(dateStart)}">
            —
            <label class="visually-hidden" for="event-end-time-1">
              To
            </label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatDateTime(dateEnd)}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              ${price} €
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Cancel</button>
          <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite">
          <label class="event__favorite-btn" for="event-favorite-1">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
            </svg>
          </label>
        </header>
        <section class="event__details">

          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">
              ${type.group === `transfer` ? this._createOptionsList() : ``}
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${text}</p>

            <div class="event__photos-container">
              <div class="event__photos-tape">
              ${this._createPhotoList()}
              </div>
            </div>
          </section>
        </section>
      </form>
    </li>`
    );
  }

  getTemplate() {
    return this._createFormEditTemplate();
  }

  setSubmitHandler(handler) {
    this.getElement().querySelector(`form`)
      .addEventListener(`submit`, handler);
  }

  setFavoritesButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__favorite-checkbox`)
      .addEventListener(`change`, handler);
  }

  recoveryListeners() {
    // this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();

    // this._applyFlatpickr();
  }

  reset() {
    // const formEdit = this._formEdit;

    // this._isDateShowing = !!formEdit.dueDate;
    // this._isRepeatingTask = Object.values(formEdit.repeatingDays).some(Boolean);
    // this._activeRepeatingDays = Object.assign({}, formEdit.repeatingDays);

    this.rerender();
  }
}


