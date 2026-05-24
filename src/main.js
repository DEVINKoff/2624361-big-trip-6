import FilterView from './view/filter-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import EventsModel from './model/events-model.js';
import {render} from './render.js';

const filtersContainer = document.querySelector('.trip-controls__filters');
const tripEventsSection = document.querySelector('.trip-events');

render(new FilterView(), filtersContainer);

const eventsModel = new EventsModel();
const boardPresenter = new BoardPresenter({
  boardContainer: tripEventsSection,
  eventsModel,
});

boardPresenter.init();