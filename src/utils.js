export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

const RenderMethod = {
  [RenderPosition.AFTERBEGIN]: 'prepend',
  [RenderPosition.BEFOREEND]: 'append',
};

export const render = (container, element, place = RenderPosition.BEFOREEND) => {
  container[RenderMethod[place]](element);
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};
