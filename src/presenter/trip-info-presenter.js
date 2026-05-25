import {render, replace, remove} from '../framework/render.js';
import TripInfoView from '../view/trip-info-view.js';
import {UpdateType} from '../const.js';

export default class TripInfoPresenter {
  constructor({tripMainContainer, pointsModel}) {
    this._tripMainContainer = tripMainContainer;
    this._pointsModel = pointsModel;

    this._tripInfoComponent = null;

    this._pointsModel.addObserver(this._handleModelEvent);
  }

  init() {
    const previousTripInfoComponent = this._tripInfoComponent;

    this._tripInfoComponent = new TripInfoView({
      points: this._pointsModel.getPoints(),
      destinations: this._pointsModel.getDestinations(),
      offers: this._pointsModel.getOffers()
    });

    if (previousTripInfoComponent === null) {
      render(
        this._tripInfoComponent,
        this._tripMainContainer,
        'afterbegin'
      );

      return;
    }

    replace(this._tripInfoComponent, previousTripInfoComponent);
    remove(previousTripInfoComponent);
  }

  _handleModelEvent = (updateType) => {
    switch (updateType) {
      case UpdateType.PATCH:
      case UpdateType.MAJOR:
      case UpdateType.INIT:
        this.init();
        break;
    }
  };
}