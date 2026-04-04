import {OFFERS_BY_TYPE} from './const.js';

function generateOffers() {
  return Object.entries(OFFERS_BY_TYPE).map(([type, offers]) => ({
    type,
    offers,
  }));
}

export {generateOffers};