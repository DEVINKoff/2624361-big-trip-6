import PointPresenter from './point-presenter.js';
import PointListView from '../view/point-list-view.js';
import SortView from '../view/sort-view.js';
import {render} from '../framework/render.js';
import {SortType} from '../const.js';

const sortByDay = (pointA, pointB) =>
  new Date(pointA.dateFrom) - new Date(pointB.dateFrom);

const sortByPrice = (pointA, pointB) =>
  pointB.basePrice - pointA.basePrice;

const sortByTime = (pointA, pointB) => {
  const durationA =
    new Date(pointA.dateTo) - new Date(pointA.dateFrom);

  const durationB =
    new Date(pointB.dateTo) - new Date(pointB.dateFrom);

  return durationB - durationA;
};

export default class TripPresenter {
  #tripContainer = null;
  #pointsModel = null;

  #pointListComponent = new PointListView();
  #sortComponent = null;

  #pointPresenters = new Map();

  #currentSortType = SortType.DAY;

  constructor({tripContainer, pointsModel}) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
  }

  get points() {
    const points = [...this.#pointsModel.points];

    switch (this.#currentSortType) {
      case SortType.TIME:
        return points.sort(sortByTime);

      case SortType.PRICE:
        return points.sort(sortByPrice);

      case SortType.DAY:
      default:
        return points.sort(sortByDay);
    }
  }

  init() {
    this.#renderTrip();
  }

  #renderTrip() {
    render(this.#pointListComponent, this.#tripContainer);

    this.#renderSort();

    this.#renderPoints();
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#tripContainer);
  }

  #renderPoints() {
    this.points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointListComponent.element
    });

    pointPresenter.init(point);

    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;

    this.#clearPointList();
    this.#renderPoints();
  };
}
