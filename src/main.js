import TripInfoPresenter from './presenter/trip-info-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import PointsApiService from './points-api-service.js';

const API_TOKEN = 'Basic er883jdzbdw1234';
const SERVER_URL = 'https://24.objects.htmlacademy.pro/big-trip';

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.trip-main');
const filterContainer = siteHeaderElement.querySelector('.trip-controls__filters');
const boardContainer = document.querySelector('.trip-events');
const addNewPointBtn = siteMainElement.querySelector('.trip-main__event-add-btn');

const dataModel = new PointsModel({
  pointsApiService: new PointsApiService(SERVER_URL, API_TOKEN)
});
const filterStateModel = new FilterModel();

function onNewPointFormDestroy() {
  addNewPointBtn.disabled = false;
}

const tripSummaryPresenter = new TripInfoPresenter({
  tripInfoContainer: siteMainElement,
  pointsModel: dataModel
});

const mainBoardPresenter = new BoardPresenter({
  boardContainer: boardContainer,
  pointsModel: dataModel,
  filterModel: filterStateModel,
  onNewPointDestroy: onNewPointFormDestroy
});

const navigationPresenter = new FilterPresenter({
  filterContainer: filterContainer,
  filterModel: filterStateModel,
  pointsModel: dataModel
});

addNewPointBtn.addEventListener('click', (evt) => {
  evt.preventDefault();
  addNewPointBtn.disabled = true;
  mainBoardPresenter.createPoint();
});

tripSummaryPresenter.init();
navigationPresenter.init();
mainBoardPresenter.init();
dataModel.init();
