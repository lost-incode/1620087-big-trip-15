import dayjs from 'dayjs';

const COUNT_OF_DESTINATIONS = 5;
const DATE_FORMAT= 'YYYY-MM-DDTHH:mm:ss.ms[Z]';

const pointOffers = {
  'Flight': [
    {
      'title': 'Add luggage',
      'price': 30,
    },
    {
      'title': 'Switch to comfort class',
      'price': 100,
    },
    {
      'title': 'Add meal',
      'price': 15,
    },
    {
      'title': 'Choose seats',
      'price': 5,
    },
    {
      'title': 'Travel by train',
      'price': 40,
    },
  ],
  'Taxi': [
    {
      'title': 'Order Uber',
      'price': 20,
    },
  ],
  'Drive': [
    {
      'title': 'Rent a car',
      'price': 200,
    },
  ],
  'Check-in': [
    {
      'title': 'Add breakfast',
      'price': 50,
    },
  ],
  'Sightseeing': [
    {
      'title': 'Book tickets',
      'price': 40,
    },
    {
      'title': 'Lunch in city',
      'price': 30,
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
    return pointOffers[type];
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
  let textDestination = [];
  while (i < randomCountDestinations) {
    const randomIndex = getRandomInteger(0, textDestinations.length - 1);
    textDestination.push(textDestinations[randomIndex]);
    i++;
  }
  textDestination = textDestination.slice(); //строка, чтобы не ругался линтер

  return textDestination;
};

const generateImages = () => {
  const randomCountImages = getRandomInteger(1, COUNT_OF_DESTINATIONS);
  let imagesLinks = [];
  for (let i = 0; i < randomCountImages; i++) {
    imagesLinks.push(`http://picsum.photos/248/152?r=${Math.random()}`);
  }
  imagesLinks = imagesLinks.slice(); //строка, чтобы не ругался линтер

  return imagesLinks;
};

const taskType = generateType();
const startDate = generateDate();

export const generateTask = () => ({
  type: taskType,
  startDate: dayjs(startDate).format(DATE_FORMAT),
  endDate: dayjs(generateDate(startDate)).format(DATE_FORMAT),
  point: generatePoint(),
  offers: generateOffers(taskType),
  destination: {
    description: [generateDescription().join(' ')],
    images:  generateImages(),
  },
  isFavorite: false,
});
