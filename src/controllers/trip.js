import SortComponent, {SortType} from "../components/sort";
import TripDaysComponent from "../components/trip-days";
import NoPointsComponent from "../components/no-points";
import {render, RenderPosition} from "../utils/render";
import {generateTripCards} from "../mock/trip-card";
import TripDayComponent from "../components/trip-day";
import PointController, {Mode as PointControllerMode, EmptyPoint} from "./point";

export const tripCards = generateTripCards();

export default class TripController {
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;

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

  render() {
    this._tripDays = this._pointsModel.getTripDays();
    this._tripPoints = this._pointsModel.getPointsAll();

    const isTripPoints = this._tripPoints.length > 0;

    if (!isTripPoints) {
      render(this._container, this._noPointsComponent, RenderPosition.BEFOREEND);
    } else {
      render(this._container, this._sortComponent, RenderPosition.BEFOREEND);
      render(this._container, this._tripDaysComponent, RenderPosition.BEFOREEND);
      this._renderTripPoints(this._tripDays, this._tripPoints);
    }
  }

  _onDataChange(pointController, oldData, newData) {
    if (oldData === EmptyPoint) {
      this._creatingPoint = null;

      if (newData === null) {
        pointController.destroy();
        this._updatePoints();
      } else {
        this._pointsModel.addPoint(newData);
        this._updatePoints();
        pointController.render(newData, PointControllerMode.DEFAULT);

        this._tripCardsControllers = [].concat(pointController, this._tripCardsControllers);
      }
    } else if (newData === null) {
      this._pointsModel.removePoint(oldData.id);
      this._updatePoints();
    } else {
      const isSuccess = this._pointsModel.updatePoints(oldData.id, newData);

      if (isSuccess) {
        pointController.render(newData, PointControllerMode.DEFAULT);
        this._updatePoints();
      }
    }
  }

  _onSortTypeChange(sortType) {
    this._removePoints();
    let sortedCards = [];
    const tripPoints = this._pointsModel.getFilteredPoints();

    switch (sortType) {

      case SortType.TIME:
        sortedCards = tripPoints.slice().sort((a, b) => b.duration - a.duration);
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

    this._creatingPoint = new PointController(taskListElement, this._onDataChange, this._onViewChange);
    this._creatingPoint.render(EmptyPoint, PointControllerMode.ADDING);
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
        let tripDayComponent = new TripDayComponent(tripDay, i);
        render(this._tripDaysComponent.getElement(), tripDayComponent, RenderPosition.BEFOREEND);
        const tripEventsListElement = document.querySelectorAll(`.trip-events__list`);

        tripDay.forEach((tripCard) => {
          const pointController = new PointController(tripEventsListElement[i], onDataChange, onViewChange);
          pointController.render(tripCard, PointControllerMode.DEFAULT);
          eventPoints.push(pointController);
        });
      });
    } else {
      points.forEach((tripCard) => {
        let tripDayComponent = new TripDayComponent();
        render(this._tripDaysComponent.getElement(), tripDayComponent, RenderPosition.BEFOREEND);
        const tripEventsListElement = document.querySelector(`.trip-events__list`);

        const pointController = new PointController(tripEventsListElement, onDataChange, onViewChange);
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


