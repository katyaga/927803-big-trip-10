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
    this._onFilterChange = this._onFilterChange.bind(this);

    this._pointsModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {
    this._tripDays = this._pointsModel.getTripDays();
    this._tripPoints = this._pointsModel.getPoints();

    const isTripPoints = this._tripPoints.length > 0;

    if (!isTripPoints) {
      render(this._container, this._noPointsComponent, RenderPosition.BEFOREEND);
    } else {
      render(this._container, this._sortComponent, RenderPosition.BEFOREEND);
      render(this._container, this._tripDaysComponent, RenderPosition.BEFOREEND);
      const showedCards = this.renderEventsWithDays(this._tripDays, this._onDataChange, this._onViewChange);
      this._tripCardsControllers = this._tripCardsControllers.concat(showedCards);

      this._sortComponent.setSortTypeChangeHandler((sortType) => {
        this._tripDaysComponent.clearElement();
        let sortedCards = [];
        let renderedCard;

        switch (sortType) {

          case SortType.TIME:
            sortedCards = this._tripPoints.slice().sort((a, b) => b.duration - a.duration);
            renderedCard = this.renderEventsWithoutDays(sortedCards, this._onDataChange, this._onViewChange);
            this._tripCardsControllers = this._tripCardsControllers.concat(renderedCard);
            break;
          case SortType.PRICE:
            sortedCards = this._tripPoints.slice().sort((a, b) => b.price - a.price);
            renderedCard = this.renderEventsWithoutDays(sortedCards, this._onDataChange, this._onViewChange);
            this._tripCardsControllers = this._tripCardsControllers.concat(renderedCard);
            break;
          case SortType.DEFAULT:
            renderedCard = this.renderEventsWithDays(this._tripDays, this._onDataChange, this._onViewChange);
            this._tripCardsControllers = this._tripCardsControllers.concat(renderedCard);
            break;
        }
      });
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
        pointController.render(newData, PointControllerMode.DEFAULT);

        const destroyedPoint = this._tripCardsControllers.pop();
        destroyedPoint.destroy();

        this._showedTaskControllers = [].concat(taskController, this._showedTaskControllers);
        this._showingTasksCount = this._showedTaskControllers.length;
      }
    } else if (newData === null) {
      this._pointsModel.removePoint(oldData.id);
      this._updatePoints();
    } else {
      const isSuccess = this._pointsModel.updateTask(oldData.id, newData);

      if (isSuccess) {
        pointController.render(newData, PointControllerMode.DEFAULT);
      }
    }

    // const isSuccess = this._pointsModel.updateTask(oldData.id, newData);

    // if (isSuccess) {
    //   pointController.render(newData);
    // }
  }

  _onViewChange() {
    this._tripCardsControllers.forEach((it) => it.setDefaultView());
  }

  _renderPoints(points) {
    const eventPoints = [];

  }

  createTask() {
    if (this._creatingPoint) {
      return;
    }

    const taskListElement = this._tripDaysComponent.getElement();
    this._creatingPoint = new PointController(taskListElement, this._onDataChange, this._onViewChange);
    this._creatingPoint.render(EmptyPoint, PointControllerMode.ADDING);
  }

  _removeTasks() {
    this._tripCardsControllers.forEach((tripController) => tripController.destroy());
    this._tripCardsControllers = [];
  }

  _updatePoints() {
    this._removeTasks();
    this._renderTasks(this._tasksModel.getTasks().slice(0, count));
  }

  renderEventsWithDays(tripDaysArray, onDataChange, onViewChange) {
    const eventPoints = [];
    tripDaysArray.forEach((tripDay, i) => {
      let tripDayComponent = new TripDayComponent(tripDay, i);
      render(this._tripDaysComponent.getElement(), tripDayComponent, RenderPosition.BEFOREEND);
      const tripEventsListElement = document.querySelectorAll(`.trip-events__list`);

      tripDay.forEach((tripCard) => {
        const pointController = new PointController(tripEventsListElement[i], onDataChange, onViewChange);
        pointController.render(tripCard, PointControllerMode.DEFAULT);
        eventPoints.push(pointController);
      });
    });
    return eventPoints;
  }

  renderEventsWithoutDays(tripCardsArray, onDataChange, onViewChange) {
    const eventPointsDays = [];
    tripCardsArray.forEach((tripCard) => {
      let tripDayComponent = new TripDayComponent();
      render(this._tripDaysComponent.getElement(), tripDayComponent, RenderPosition.BEFOREEND);
      const tripEventsListElement = document.querySelector(`.trip-events__list`);

      const pointController = new PointController(tripEventsListElement, onDataChange, onViewChange);
      pointController.render(tripCard, PointControllerMode.DEFAULT);
      eventPointsDays.push(pointController);
    });
    return eventPointsDays;
  }

  _onFilterChange() {
    this._removePoints();

    this._renderTasks(this._tasksModel.getTasks().slice(0, SHOWING_TASKS_COUNT_ON_START));
  }
}


