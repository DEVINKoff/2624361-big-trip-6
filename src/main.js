import FilterView from './view/filter-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import EventsModel from './model/events-model.js';
import {render} from './framework/render.js';
import {generateFilters, FilterType} from './mock/filter.js';

const filtersContainer = document.querySelector('.trip-controls__filters');
const tripEventsSection = document.querySelector('.trip-events');

const eventsModel = new EventsModel();
const filters = generateFilters(eventsModel.events);

render(new FilterView({filters, currentFilter: FilterType.EVERYTHING}), filtersContainer);

const boardPresenter = new BoardPresenter({
  boardContainer: tripEventsSection,
  eventsModel,
});

boardPresenter.init();