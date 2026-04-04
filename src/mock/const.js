const TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const DESTINATIONS = ['Amsterdam', 'Chamonix', 'Geneva', 'Helsinki', 'Oslo', 'Copenhagen'];

const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];

const OFFERS_BY_TYPE = {
  'taxi': [{id: 1, title: 'Order Uber', price: 20}, {id: 2, title: 'Order a car', price: 50}],
  'bus': [{id: 1, title: 'Choose seats', price: 5}],
  'train': [{id: 1, title: 'Book a ticket', price: 40}, {id: 2, title: 'Add meal', price: 15}],
  'ship': [{id: 1, title: 'Add luggage', price: 35}, {id: 2, title: 'Choose cabin', price: 100}],
  'drive': [{id: 1, title: 'Rent a car', price: 200}],
  'flight': [
    {id: 1, title: 'Add luggage', price: 50},
    {id: 2, title: 'Switch to comfort', price: 80},
    {id: 3, title: 'Add meal', price: 15},
    {id: 4, title: 'Choose seats', price: 5},
    {id: 5, title: 'Travel by train', price: 40},
  ],
  'check-in': [{id: 1, title: 'Add breakfast', price: 50}],
  'sightseeing': [{id: 1, title: 'Book tickets', price: 40}, {id: 2, title: 'Lunch in city', price: 30}],
  'restaurant': [{id: 1, title: 'Reserve a table', price: 20}],
};

export {TYPES, DESTINATIONS, DESCRIPTIONS, OFFERS_BY_TYPE};