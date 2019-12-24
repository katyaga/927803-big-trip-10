import TripCardComponent from "../components/trip-card";
import FormEditComponent from "../components/form-edit";
import {render, RenderPosition, remove, replace} from "../utils/render";
// import {getRandomElement} from "../utils/common";
// import {cities, eventTypes} from "../const";
// import {generateDescriptionText, generateOptionsList} from "../mock/trip-card";

export const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
  EDIT: `edit`,
};

export const EmptyPoint = {
  type: {
    name: `taxi`,
    title: `Taxi`,
    group: `transfer`,
  },
  city: ``,
  dateStart: Date.now(),
  dateEnd: Date.now(),
  price: 0,
  options: [],
  photos: [],
  text: ``,
  isFavorite: false,
};

export default class PointController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

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

    this._cardComponent = new TripCardComponent(card);
    this._editCardComponent = new FormEditComponent(card);

    this._cardComponent.setEditButtonClickHandler(() => {
      this._replaceCardToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._editCardComponent.setFavoritesButtonClickHandler(() => {
      this._onDataChange(this, card, Object.assign({}, card, {
        isFavorite: !card.isFavorite,
      }));
    });

    // this._editCardComponent.setSubmitHandler((evt) => {
    //   evt.preventDefault();
    //   this._replaceEditToCard();
    // });

    this._editCardComponent.setCloseButtonClickHandler(() => {
      this._replaceEditToCard();
    });

    // if (oldPointEditComponent && oldPointComponent) {
    //   replace(this._cardComponent, oldPointComponent);
    //   replace(this._editCardComponent, oldPointEditComponent);
    // } else {
    //   render(this._container, this._cardComponent, RenderPosition.BEFOREEND);
    // }

    this._editCardComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      const data = this._editCardComponent.getData();
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
    // console.log(this._editCardComponent);
    remove(this._editCardComponent);
    remove(this._cardComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _replaceEditToCard() {
    this._editCardComponent.reset();

    replace(this._cardComponent, this._editCardComponent);
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
