import TripCardComponent from "../components/trip-card";
import FormEditComponent from "../components/form-edit";
import {render, RenderPosition, replace} from "../utils/render";

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
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

  render(card) {
    const oldTaskComponent = this._cardComponent;
    const oldTaskEditComponent = this._editCardComponent;

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

    this._editCardComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      this._replaceEditToCard();
    });

    this._editCardComponent.setCloseButtonClickHandler(() => {
      this._replaceEditToCard();
    });

    if (oldTaskEditComponent && oldTaskComponent) {
      replace(this._cardComponent, oldTaskComponent);
      replace(this._editCardComponent, oldTaskEditComponent);
    } else {
      render(this._container, this._cardComponent, RenderPosition.BEFOREEND);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToCard();
    }
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
      this._replaceEditToCard();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
