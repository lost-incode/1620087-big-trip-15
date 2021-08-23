import dayjs from 'dayjs';
import {nanoid} from 'nanoid';
import {getRandomInteger} from '../utils/common.js';

const COUNT_OF_DESTINATIONS = 5;
const DATE_FORMAT= 'YYYY-MM-DDTHH:mm:ss.ms[Z]';
const MAX_DAYS_GAP = 7;
const MIN_DAYS_GAP = 1;
const MIN_PRICE = 10;
const MAX_PRICE = 3000;
const BOOLEAN_FALSE = 0;
const BOOLEAN_TRUE = 1;

const pointOffers = {
  'Flight': [
    {
      'title': 'Add luggage',
      'price': 30,
      'id': 'event-offer-luggage-1',
      'name': 'event-offer-luggage',
    },
    {
      'title': 'Switch to comfort class',
      'price': 100,
      'id': 'event-offer-comfort-1',
      'name': 'event-offer-comfort',
    },
    {
      'title': 'Add meal',
      'price': 15,
      'id': 'event-offer-meal-1',
      'name': 'event-offer-meal',
    },
    {
      'title': 'Choose seats',
      'price': 5,
      'id': 'event-offer-seats-1',
      'name': 'event-offer-seats',
    },
    {
      'title': 'Travel by train',
      'price': 40,
      'id': 'event-offer-train-1',
      'name': 'event-offer-train',
    },
  ],
  'Taxi': [
    {
      'title': 'Order Uber',
      'price': 20,
      'id': 'event-offer-uber-1',
      'name': 'event-offer-uber',
    },
  ],
  'Drive': [
    {
      'title': 'Rent a car',
      'price': 200,
      'id': 'event-offer-car-1',
      'name': 'event-offer-car',
    },
  ],
  'Check-in': [
    {
      'title': 'Add breakfast',
      'price': 50,
      'id': 'event-offer-breakfast-1',
      'name': 'event-offer-breakfast',
    },
  ],
  'Sightseeing': [
    {
      'title': 'Book tickets',
      'price': 40,
      'id': 'event-offer-tickets-1',
      'name': 'event-offer-tickets',
    },
    {
      'title': 'Lunch in city',
      'price': 30,
      'id': 'event-offer-lunch-1',
      'name': 'event-offer-lunch',
    },
  ],
  'Bus': [],
  'Train': [],
  'Ship': [],
  'Restaurant': [],
};

const POINT_CITIES = ['Tokio', 'New York', 'Volgograd', 'Kiev', 'Moscow'];
const POINT_TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];
const TEXT_DESTINATIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];

const generateType = (pointIndex) => POINT_TYPES[pointIndex];

const generateDate = (firstDate = null) => {
  if (firstDate) {
    const index = getRandomInteger(MIN_DAYS_GAP, MAX_DAYS_GAP);
    return dayjs(firstDate).add(index, 'day');
  }
  const daysCount = getRandomInteger(-MAX_DAYS_GAP, MAX_DAYS_GAP);

  return dayjs().add(daysCount, 'day').toDate();
};

const generateCity = (pointCityIndex) => POINT_CITIES[pointCityIndex];

const generateOffers = (type) => {
  if (!pointOffers[type].length) {
    return [];
  } else {
    const randomCount = getRandomInteger(1, pointOffers[type].length - 1);

    return pointOffers[type].slice(randomCount).map(({title, price}) => ({title, price}));
  }
};

const generateDescription = (sentencesCount) => {
  const textDestination = [];
  for (let i = 0; i < sentencesCount; i++) {
    const randomIndex = getRandomInteger(0, TEXT_DESTINATIONS.length - 1);
    textDestination.push(TEXT_DESTINATIONS[randomIndex]);
    i++;
  }

  return textDestination;
};

const generateImages = (imagesCount) => {
  const imagesLinks = [];
  for (let i = 0; i < imagesCount; i++) {
    imagesLinks.push(`http://picsum.photos/248/152?r=${Math.random()}`);
  }

  return imagesLinks;
};

const generatePoint = () => {
  const randomTypeIndex = getRandomInteger(0, POINT_TYPES.length - 1);
  const taskType = generateType(randomTypeIndex);
  const startDate = generateDate();
  const randomPointIndex = getRandomInteger(0, POINT_CITIES.length - 1);
  const randomCountDestinations = getRandomInteger(1, COUNT_OF_DESTINATIONS);
  const randomCountImages = getRandomInteger(1, COUNT_OF_DESTINATIONS);

  return {
    id: nanoid(),
    type: taskType,
    startDate: dayjs(startDate).format(DATE_FORMAT),
    endDate: dayjs(generateDate(startDate)).format(DATE_FORMAT),
    point: generateCity(randomPointIndex),
    offers: generateOffers(taskType),
    destination: {
      description: [generateDescription(randomCountDestinations).join(' ')],
      images:  generateImages(randomCountImages),
    },
    basePrice: getRandomInteger(MIN_PRICE, MAX_PRICE),
    isFavourite: Boolean(getRandomInteger(BOOLEAN_FALSE, BOOLEAN_TRUE)),
  };
};

export {pointOffers, POINT_TYPES, DATE_FORMAT, POINT_CITIES, MIN_PRICE, generatePoint};
