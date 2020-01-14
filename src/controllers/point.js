import TripCardComponent from "../components/trip-card";
import FormEditComponent from "../components/form-edit";
import Point from '../models/point.js';
import {render, RenderPosition, remove, replace} from "../utils/render";
import {getDestination} from "../components/form-edit";
import moment from "moment";

export const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
  EDIT: `edit`,
};

export const EmptyPoint = {
  type: `taxi`,
  destinations: {
    name: ``,
    description: ``,
    pictures: [],
  },
  dateStart: Date.now(),
  dateEnd: Date.now(),
  price: 0,
  options: [],
  isFavorite: false,
};

const parseFormData = (formData, destinationsList, pointOptions) => {
  const dateFormat = `DD/MM/YYYY HH:mm`;
  // console.log(Boolean(formData.get(`event-favorite`) === `on`));

  return new Point({
    // description: formData.get(`text`),
    'type': formData.get(`event-type`),
    'destination': getDestination(formData.get(`event-destination`), destinationsList),
    'offers': pointOptions,
    'base_price': +formData.get(`event-price`),
    'date_from': moment(formData.get(`event-start-time`), dateFormat).toDate().toISOString(),
    'date_to': moment(formData.get(`event-end-time`), dateFormat).toDate().toISOString(),
    'is_favorite': Boolean(formData.get(`event-favorite`) === `on`),
    // dateStart: (formData.get(`event-start-time`)).toISOString(),
    // dateEnd: (formData.get(`event-end-time`)).toISOString(),
  });
};

export default class PointController {
  constructor(container, onDataChange, onViewChange, pointsModel) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._pointsModel = pointsModel;

    this._mode = Mode.DEFAULT;

    this._cardComponent = null;
    this._editCardComponent = null;

    this._replaceEditToCard = this._replaceEditToCard.bind(this);
    this._replaceCardToEdit = this._replaceCardToEdit.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(card, mode) {
    const oldPointComponent = this._cardComponent;
    const oldPointEditComponent = this._editCardComponent;
    this._mode = mode;

    const destinations = this._pointsModel.getDestinations();
    const offers = this._pointsModel.getOffers();
    const pointOffers = card.options;

    // console.log(`card`, card);
    this._cardComponent = new TripCardComponent(card);
    this._editCardComponent = new FormEditComponent(card, destinations, offers);

    this._cardComponent.setEditButtonClickHandler(() => {
      this._replaceCardToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._editCardComponent.setFavoritesButtonClickHandler(() => {
      // this._onDataChange(this, card, Object.assign({}, card, {
      //   isFavorite: !card.isFavorite,
      // }));

      const newPoint = Point.clone(card);
      newPoint.isFavorite = !newPoint.isFavorite;

      // this._onDataChange(this, card, newPoint);
    });

    // this._editCardComponent.setSubmitHandler((evt) => {
    //   evt.preventDefault();
    //   this._replaceEditToCard();
    // });

    // this._editCardComponent.setCloseButtonClickHandler(() => {
    //   this._replaceEditToCard();
    // });

    // if (oldPointEditComponent && oldPointComponent) {
    //   replace(this._cardComponent, oldPointComponent);
    //   replace(this._editCardComponent, oldPointEditComponent);
    // } else {
    //   render(this._container, this._cardComponent, RenderPosition.BEFOREEND);
    // }

    this._editCardComponent.setSubmitHandler((evt) => {
      evt.preventDefault();

      const formData = this._editCardComponent.getData();
      const data = parseFormData(formData, destinations, pointOffers);

      console.log(data);


      // const data = this._editCardComponent.getData();
      this._onDataChange(this, card, data);
    });

    this._editCardComponent.setDeleteButtonClickHandler(() => this._onDataChange(this, card, null));

    switch (mode) {
      case Mode.DEFAULT:
        if (oldPointEditComponent && oldPointComponent) {
          replace(this._cardComponent, oldPointComponent);
          replace(this._editCardComponent, oldPointEditComponent);
          this._replaceEditToCard();
        } else {
          render(this._container, this._cardComponent, RenderPosition.BEFOREEND);
        }
        break;
      case Mode.ADDING:
        if (oldPointEditComponent && oldPointComponent) {
          remove(oldPointComponent);
          remove(oldPointEditComponent);
        }
        document.addEventListener(`keydown`, this._onEscKeyDown);
        render(this._container, this._editCardComponent, RenderPosition.AFTERBEGIN);
        break;
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToCard();
    }
  }

  destroy() {
    remove(this._editCardComponent);
    remove(this._cardComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _replaceEditToCard() {
    this._editCardComponent.reset();

    // replace(this._cardComponent, this._editCardComponent);
    if (document.contains(this._editCardComponent.getElement())) {
      replace(this._cardComponent, this._editCardComponent);
    }
    this._mode = Mode.DEFAULT;
  }

  _replaceCardToEdit() {
    this._onViewChange();

    replace(this._editCardComponent, this._cardComponent);
    this._mode = Mode.EDIT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      if (this._mode === Mode.ADDING) {
        this._onDataChange(this, EmptyPoint, null);
      }

      this._replaceEditToCard();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
