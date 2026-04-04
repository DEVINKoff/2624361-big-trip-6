import {DESTINATIONS, DESCRIPTIONS} from './const.js';
import {getRandomInteger, getRandomArrayElement} from './utils.js';

function generateDestination(id) {
  const name = DESTINATIONS[id % DESTINATIONS.length];
  const descriptionSentences = Array.from(
    {length: getRandomInteger(1, 5)},
    () => getRandomArrayElement(DESCRIPTIONS)
  ).join(' ');

  const photos = Array.from({length: getRandomInteger(1, 5)}, () => ({
    src: `https://loremflickr.com/248/152?random=${getRandomInteger(1, 100)}`,
    description: `${name} photo`,
  }));

  return {
    id: id + 1,
    description: descriptionSentences,
    name,
    pictures: photos,
  };
}

function generateDestinations() {
  return DESTINATIONS.map((_, index) => generateDestination(index));
}

export {generateDestinations};