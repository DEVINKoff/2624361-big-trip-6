import {TYPES, DESTINATIONS} from './const.js';
import {getRandomInteger, getRandomArrayElement} from './utils.js';
import {OFFERS_BY_TYPE} from './const.js';

function generateEvent(id) {
  const type = getRandomArrayElement(TYPES);
  const destinationId = getRandomInteger(1, DESTINATIONS.length);

  const offersByType = OFFERS_BY_TYPE[type];
  const offerIds = offersByType
    .filter(() => Math.random() > 0.5)
    .map((offer) => offer.id);

  const startDay = getRandomInteger(18, 20);
  const startHour = getRandomInteger(0, 23);
  const startMinute = getRandomInteger(0, 59);
  const durationMinutes = getRandomInteger(30, 180);

  const dateFrom = new Date(2019, 2, startDay, startHour, startMinute);
  const dateTo = new Date(dateFrom.getTime() + durationMinutes * 60 * 1000);

  return {
    id: id + 1,
    basePrice: getRandomInteger(20, 600),
    dateFrom: dateFrom.toISOString(),
    dateTo: dateTo.toISOString(),
    destination: destinationId,
    isFavorite: Math.random() > 0.5,
    offers: offerIds,
    type,
  };
}

function generateEvents(count = 4) {
  return Array.from({length: count}, (_, index) => generateEvent(index));
}

export {generateEvents};