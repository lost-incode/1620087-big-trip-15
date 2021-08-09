import dayjs from 'dayjs';

const COUNT_OF_DESTINATIONS = 5;
const DATE_FORMAT= 'YYYY-MM-DDTHH:mm:ss.ms[Z]';

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
};

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateType = () => {
  const pointTypes = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];
  const randomIndex = getRandomInteger(0, pointTypes.length - 1);

  return pointTypes[randomIndex];
};

const generateDate = (firstDate = null) => {
  if (firstDate) {
    const index = getRandomInteger(1, 7);
    return dayjs(firstDate).add(index, 'day');
  }
  const maxDaysGap = 7;
  const daysCount = getRandomInteger(-maxDaysGap, maxDaysGap);

  return dayjs().add(daysCount, 'day').toDate();
};

const generatePoint = () => {
  const pointCities = ['Tokio', 'New York', 'Volgograd', 'Kiev', 'Moscow'];
  const randomIndex = getRandomInteger(0, pointCities.length - 1);

  return pointCities[randomIndex];
};

const generateOffers = (type) => {
  if (!(type in pointOffers)) {
    return null;
  } else {
    const randomCount = getRandomInteger(1, pointOffers[type].length - 1);
    const randomOffers = [];
    for (let i = 0; i < randomCount; i++) {
      const offer = {
        title: pointOffers[type][i].title,
        price: pointOffers[type][i].price,
      };
      randomOffers.push(offer);
    }
    return randomOffers;
  }
};

const generateDescription = () => {
  const textDestinations = [
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

  const randomCountDestinations = getRandomInteger(1, COUNT_OF_DESTINATIONS);

  let i = 0;
  const textDestination = [];
  while (i < randomCountDestinations) {
    const randomIndex = getRandomInteger(0, textDestinations.length - 1);
    textDestination.push(textDestinations[randomIndex]);
    i++;
  }
  return textDestination;
};

const generateImages = () => {
  const randomCountImages = getRandomInteger(1, COUNT_OF_DESTINATIONS);
  const imagesLinks = [];
  for (let i = 0; i < randomCountImages; i++) {
    imagesLinks.push(`http://picsum.photos/248/152?r=${Math.random()}`);
  }
  return imagesLinks;
};

const generateTask = () => {
  const taskType = generateType();
  const startDate = generateDate();
  return {
    type: taskType,
    startDate: dayjs(startDate).format(DATE_FORMAT),
    endDate: dayjs(generateDate(startDate)).format(DATE_FORMAT),
    point: generatePoint(),
    offers: generateOffers(taskType),
    destination: {
      description: [generateDescription().join(' ')],
      images:  generateImages(),
    },
    basePrice: getRandomInteger(10, 3000),
    isFavourite: Boolean(getRandomInteger(0, 1)),
  };
};

export {pointOffers, generateTask};
