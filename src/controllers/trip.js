import SortComponent, {SortType} from "../components/sort";
import TripDaysComponent from "../components/trip-days";
import NoPointsComponent from "../components/no-points";
import {render, renderPosition} from "../utils/render";
import TripDayComponent from "../components/trip-day";
import PointController, {Mode as PointControllerMode, emptyPoint} from "./point";
import {HIDDEN_CLASS} from "../utils/common";

export default class TripController {
  constructor(container, pointsModel, api) {
    this._container = container;
    this._pointsModel = pointsModel;
    this._api = api;

    this._tripCardsControllers = [];
    this._sortComponent = new SortComponent();
    this._noPointsComponent = new NoPointsComponent();
    this._tripDaysComponent = new TripDaysComponent();

    this._creatingPoint = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._pointsModel.setFilterChangeHandler(this._onFilterChange);
  }

  show() {
    this._container.classList.remove(HIDDEN_CLASS);
  }

  hide() {
    this._container.classList.add(HIDDEN_CLASS);
  }

  render() {
    this._tripDays = this._pointsModel.getTripDays();
    this._tripPoints = this._pointsModel.getPointsAll();

    const isTripPoints = this._tripPoints.length > 0;

    if (!isTripPoints) {
      render(this._container, this._noPointsComponent, renderPosition.BEFOREEND);
    } else {
      render(this._container, this._sortComponent, renderPosition.BEFOREEND);
      render(this._container, this._tripDaysComponent, renderPosition.BEFOREEND);
      this._renderTripPoints(this._tripDays, this._tripPoints);
    }
  }

  _onDataChange(pointController, oldData, newData) {
    if (oldData === emptyPoint) {
      this._creatingPoint = null;

      if (newData === null) {
        pointController.destroy();
        this._updatePoints();
      } else {
        this._api.createPoint(newData)
          .then((pointModel) => {
            this._pointsModel.addPoint(pointModel);
            pointController.render(pointModel, PointControllerMode.DEFAULT);
            this._updatePoints();
            this._tripCardsControllers = [].concat(pointController, this._tripCardsControllers);
          })
          .catch(() => {
            pointController.shake();
          });
      }
    } else if (newData === null) {
      this._api.deletePoint(oldData.id)
        .then(() => {
          this._pointsModel.removePoint(oldData.id);
          this._updatePoints();
        })
        .catch(() => {
          pointController.shake();
        });
    } else {
      this._api.updatePoint(oldData.id, newData)
        .then((pointModel) => {
          const isSuccess = this._pointsModel.updatePoint(oldData.id, pointModel);

          if (isSuccess) {
            pointController.render(pointModel, PointControllerMode.DEFAULT);
            this._updatePoints();
          }
        })
        .catch(() => {
          pointController.shake();
        });
    }
  }

  _onSortTypeChange(sortType) {
    this._removePoints();
    let sortedCards = [];
    const tripPoints = this._pointsModel.getFilteredPoints();

    switch (sortType) {

      case SortType.TIME:
        sortedCards = tripPoints.slice().sort((a, b) => (b.dateEnd - b.dateStart) - (a.dateEnd - a.dateStart));
        break;
      case SortType.PRICE:
        sortedCards = tripPoints.slice().sort((a, b) => b.price - a.price);
        break;
      case SortType.DEFAULT:
        break;
    }

    this._renderTripPoints(this._pointsModel.getFilteredDays(), sortedCards);
  }

  _onViewChange() {
    this._tripCardsControllers.forEach((it) => it.setDefaultView());
  }

  createPoint() {
    if (this._creatingPoint) {
      return;
    }

    const taskListElement = this._tripDaysComponent.getElement();

    this._creatingPoint = new PointController(taskListElement, this._onDataChange, this._onViewChange, this._pointsModel);
    this._creatingPoint.render(emptyPoint, PointControllerMode.ADDING);
  }

  _removePoints() {
    this._tripDaysComponent.clearElement();
    this._tripCardsControllers.forEach((tripController) => tripController.destroy());
    this._tripCardsControllers = [];
  }

  _updatePoints() {
    this._removePoints();
    this._renderTripPoints(this._pointsModel.getFilteredDays(), this._pointsModel.getFilteredPoints());
  }

  renderPoints(pointsDays, points, onDataChange, onViewChange) {
    const eventPoints = [];

    if (this._sortComponent.getSortType() === `event`) {
      pointsDays.forEach((tripDay, i) => {
        const tripDayComponent = new TripDayComponent(tripDay, i);
        render(this._tripDaysComponent.getElement(), tripDayComponent, renderPosition.BEFOREEND);
        const tripEventsListElement = document.querySelectorAll(`.trip-events__list`);

        tripDay.forEach((tripCard) => {
          const pointController = new PointController(tripEventsListElement[i], onDataChange, onViewChange, this._pointsModel);
          pointController.render(tripCard, PointControllerMode.DEFAULT);
          eventPoints.push(pointController);
        });
      });
    } else {
      points.forEach((tripCard) => {
        let tripDayComponent = new TripDayComponent();
        render(this._tripDaysComponent.getElement(), tripDayComponent, renderPosition.BEFOREEND);
        const tripEventsListElement = document.querySelector(`.trip-events__list`);

        const pointController = new PointController(tripEventsListElement, onDataChange, onViewChange, this._pointsModel);
        pointController.render(tripCard, PointControllerMode.DEFAULT);
        eventPoints.push(pointController);
      });
    }

    return eventPoints;
  }

  _renderTripPoints(pointsDays, points) {
    const showedCards = this.renderPoints(pointsDays, points, this._onDataChange, this._onViewChange);
    this._tripCardsControllers = this._tripCardsControllers.concat(showedCards);
  }

  _onFilterChange() {
    this._updatePoints();
  }
}


