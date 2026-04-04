import FilterView from './view/filter-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import {render} from './render.js';

const filtersContainer = document.querySelector('.trip-controls__filters');
const tripEventsSection = document.querySelector('.trip-events');

render(new FilterView(), filtersContainer);

const boardPresenter = new BoardPresenter({boardContainer: tripEventsSection});
boardPresenter.init();