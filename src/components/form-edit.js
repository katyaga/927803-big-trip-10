import flatpickr from 'flatpickr';
import moment from 'moment';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/light.css';
import {EVENT_TYPES, TRANSFER_NAMES} from "../const";
import {capitalize, formatDateTime} from "../utils/common";
import AbstractSmartComponent from "./abstract-smart-component";

export const getDestination = (destinationName, allDestinations) => {
  return allDestinations.find((destination) => destination.name === destinationName);
};

const getOptions = (optionType, allOptions) => {
  return allOptions.find((option) => option.type === optionType);
};

const defaultData = {
  deleteButtonText: `Delete`,
  cancelButtonText: `Cancel`,
  saveButtonText: `Save`,
};

export default class FormEdit extends AbstractSmartComponent {
  constructor(formEdit, destinationsList, optionsList, mode) {
    super();

    this._formEdit = formEdit;
    this._eventType = this._formEdit.type;
    this._options = this._formEdit.options;
    this._destination = this._formEdit.destination;

    this._destinationsList = destinationsList;
    this._optionsList = optionsList;
    this._mode = mode;

    this._externalData = defaultData;

    this._dateStart = this._formEdit.dateStart;
    this._dateEnd = this._formEdit.dateEnd;
    this._price = this._formEdit.price;

    this._submitHandler = null;
    this._resetHandler = null;
    this._flatpickr = null;

    this._applyFlatpickr();
    this._subscribeOnEvents();
  }

  _createEventTypeItem(types, group) {
    return types
      .filter((item) => item.group === group)
      .map((eventType) => {
        return (
          `<div class="event__type-item">
              <input id="event-type-${eventType.name}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${eventType.name}"
              ${this._eventType === eventType.name ? `checked` : ``}>
              <label class="event__type-label  event__type-label--${eventType.name}" for="event-type-${eventType.name}-1">${eventType.title}</label>
           </div>`
        );
      })
      .join(`\n`);
  }

  _createDestinationList() {
    return this._destinationsList.map((destination) => {
      return `<option value="${destination.name}"></option>`;
    }).join(`\n`);
  }

  _createOptionsList() {
    const options = this._options;

    return options.map((option) => {
      return (
        `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${option.title}-1" type="checkbox" name="event-offer-${option.title}"
          ${option.checked ? `checked` : ``}>
          <label class="event__offer-label" for="event-offer-${option.title}-1">
            <span class="event__offer-title">${option.title}</span>
            +
            €&nbsp;<span class="event__offer-price">${option.price}</span>
          </label>
        </div>`
      );
    }).join(`\n`);
  }

  _createPhotoList() {
    const destinationPhotos = Array.from(this._destination.pictures);
    return destinationPhotos.map((destinationPhoto) => {
      return `<img class="event__photo" src=${destinationPhoto.src} alt="${destinationPhoto.description}">`;
    }).join(`\n`);
  }

  _createFormEditTemplate(externalData) {
    const isBlockSaveButton = (this._dateStart >= this._dateEnd) || (this._price <= 0);

    const deleteButtonText = externalData.deleteButtonText;
    const saveButtonText = externalData.saveButtonText;
    const cancelButtonText = externalData.cancelButtonText;

    return (
      `<li class="trip-events__item">
      <form class="trip-events__item  event  event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${this._eventType}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Transfer</legend>
                ${this._createEventTypeItem(EVENT_TYPES, `transfer`)}
              </fieldset>

              <fieldset class="event__type-group">
                <legend class="visually-hidden">Activity</legend>
                ${this._createEventTypeItem(EVENT_TYPES, `activity`)}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${capitalize(this._eventType)} ${TRANSFER_NAMES.includes(this._eventType) ? `to` : `in`}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${this._destination ? this._destination.name : ``}" list="destination-list-1" required>
            <datalist id="destination-list-1">
              ${this._createDestinationList()}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">
              From
            </label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatDateTime(this._dateStart)}">
            —
            <label class="visually-hidden" for="event-end-time-1">
              To
            </label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatDateTime(this._dateEnd)}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              €
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${this._price}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit" ${isBlockSaveButton ? `disabled` : ``}>${saveButtonText}</button>
          <button class="event__reset-btn" type="reset">${this._mode === `adding` ? `${cancelButtonText}` : `${deleteButtonText}`}</button>

          <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite"
          ${this._formEdit.isFavorite ? `checked` : ``}>
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
              ${this._createOptionsList()}
          </section>
          ${this._destination ?

        `<section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${this._destination.description}</p>

            <div class="event__photos-container">
              <div class="event__photos-tape">
              ${this._createPhotoList()}
              </div>
            </div>
          </section>)`
        : ``
      }
        </section>
      </form>
    </li>`
    );
  }

  getTemplate() {
    return this._createFormEditTemplate(this._externalData);
  }

  setData(data) {
    this._externalData = Object.assign({}, defaultData, data);
    this.rerender();
  }

  setAnimation(style = ``) {
    this.getElement().style.animation = style;
  }

  setSubmitHandler(handler) {
    if (!this._submitHandler) {
      this._submitHandler = handler;
    }

    this.getElement().querySelector(`form`).addEventListener(`submit`, this._submitHandler);
  }

  setDeleteButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__reset-btn`)
      .addEventListener(`click`, handler);

    this._deleteButtonClickHandler = handler;
  }

  // setCloseButtonClickHandler(handler) {
  //   if (!this._resetHandler) {
  //     this._resetHandler = handler;
  //   }
  //   this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._resetHandler);
  // }

  _applyFlatpickr() {
    if (this._flatpickr) {
      // При своем создании `flatpickr` дополнительно создает вспомогательные DOM-элементы.
      // Что бы их удалять, нужно вызывать метод `destroy` у созданного инстанса `flatpickr`.
      this._flatpickr.destroy();
      this._flatpickr = null;
    }

    const dateStartElement = this.getElement().querySelector(`#event-start-time-1`);
    this._flatpickr = flatpickr(dateStartElement, {
      allowInput: true,
      enableTime: true,
      dateFormat: `d/m/Y H:i`,
      defaultDate: this._dateStart,
    });

    const dateEndElement = this.getElement().querySelector(`#event-end-time-1`);
    this._flatpickr = flatpickr(dateEndElement, {
      allowInput: true,
      enableTime: true,
      dateFormat: `d/m/Y H:i`,
      minDate: this._dateStart,
      defaultDate: this._dateEnd,
    });
  }

  recoveryListeners() {
    this.setSubmitHandler(this._submitHandler);
    this.setDeleteButtonClickHandler(this._deleteButtonClickHandler);
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
    this._applyFlatpickr();
  }

  reset() {
    const formEdit = this._formEdit;
    this._eventType = formEdit.type;
    this._options = formEdit.options;
    this._destination = formEdit.destination;
    this._dateStart = formEdit.dateStart;
    this._dateEnd = formEdit.dateEnd;

    this.rerender();
  }

  removeElement() {
    if (this._flatpickr) {
      this._flatpickr.destroy();
      this._flatpickr = null;
    }

    super.removeElement();
  }

  getData() {
    const form = this.getElement().querySelector(`.trip-events__item`);
    return new FormData(form);
  }

  getOptions() {
    return this._options;
  }

  _subscribeOnEvents() {
    const element = this.getElement();
    const dateFormat = `DD/MM/YYYY HH:mm`;

    const saveButton = this.getElement().querySelector(`.event__save-btn`);
    const isBlockSaveButton = () => {
      return (this._dateStart >= this._dateEnd) || (this._destination.name === `` || this._destination.name === undefined) ||
        (isNaN(this._price) || (this._price <= 0));
    };

    element.querySelector(`#event-start-time-1`)
      .addEventListener(`change`, (evt) => {
        this._dateStart = moment(evt.target.value, dateFormat);

        saveButton.disabled = isBlockSaveButton();
      });

    element.querySelector(`#event-end-time-1`)
      .addEventListener(`change`, (evt) => {
        this._dateEnd = moment(evt.target.value, dateFormat);

        saveButton.disabled = isBlockSaveButton();
      });

    element.querySelector(`.event__favorite-checkbox`).addEventListener(`change`, () => {
      this._formEdit = Object.assign({}, this._formEdit, {isFavorite: !this._formEdit.isFavorite});

    });

    element.querySelector(`.event__type-list`).addEventListener(`change`, (evt) => {
      this._eventType = EVENT_TYPES.find((eventType) => eventType.name === evt.target.value).name;
      this._options = (getOptions(evt.target.value, this._optionsList))[`offers`];

      this.rerender();
    });

    element.querySelector(`.event__input--destination`).addEventListener(`change`, (evt) => {

      if (this._destinationsList.some((destination) => destination.name === evt.target.value)) {
        this._destination = getDestination(evt.target.value, this._destinationsList);
      }

      saveButton.disabled = isBlockSaveButton();

      this.rerender();
    });

    element.querySelector(`.event__input--price`)
      .addEventListener(`change`, (evt) => {
        if (!isNaN(+evt.target.value)) {
          this._price = +evt.target.value;

          saveButton.disabled = isBlockSaveButton();
          return;
        }

        saveButton.disabled = true;
      });

    const offerCheckboxes = element.querySelectorAll(`.event__offer-checkbox`);
    if (offerCheckboxes) {

      offerCheckboxes.forEach((offerCheckbox) => {
        offerCheckbox.addEventListener(`change`, () => {
          const inputName = offerCheckbox.name;
          const changedOption = this._options.find((option) => {
            return `event-offer-${option.title}` === inputName;
          });
          changedOption.checked = !changedOption.checked;
        });
      });
    }
  }
}


