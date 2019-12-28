import {cities, eventTypes} from "../const";
import {shuffleArray, getRandomRange, getRandomElement, getRandomBoolean} from "../utils/common";

const descriptionText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna,
  non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.
  Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae,
  sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.
   Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.
   In rutrum ac purus sit amet tempus.`;

export const generateDescriptionText = () => {
  let textSentences = new Array(...new Set(descriptionText.split(`.`)))
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence);

  textSentences = shuffleArray(textSentences);
  textSentences = textSentences.slice(0, getRandomRange(0, 3)).join(`. `);

  return textSentences ? `${textSentences}.` : ``;
};

const generateRandomDate = (targetDate, minDays = 0, maxDays) => {
  let targetDateCopy = new Date(targetDate.valueOf());
  const diffValue = getRandomRange(minDays, maxDays);

  targetDateCopy.setDate(targetDateCopy.getDate() + diffValue);
  targetDateCopy.setHours(getRandomRange(0, 23));
  targetDateCopy.setMinutes(getRandomRange(0, 59));
  return targetDateCopy;
};

const getPrice = (k, max) => {
  return getRandomRange(1, max) * k;
};

const options = [
  {
    type: `luggage`,
    name: `Add luggage`,
    price: getPrice(5, 15)
  },
  {
    type: `comfort`,
    name: `Switch to comfort class`,
    price: getPrice(100, 3)
  },
  {
    type: `meal`,
    name: `Add meal`,
    price: getPrice(5, 20)
  },
  {
    type: `seats`,
    name: `Choose seats`,
    price: getPrice(2, 10)
  },
  {
    type: `train`,
    name: `Travel by train`,
    price: getPrice(5, 20)
  },
];

const setCheckOptions = (optionsList) => {
  optionsList.forEach((option) => {
    option.checked = getRandomBoolean();
  });
};

setCheckOptions(options);

export const generateOptionsList = () => {
  return shuffleArray(options).slice(0, getRandomRange(0, options.length));
};

export const generatePhotos = () => {
  return new Array(5).fill(``).map(() =>
    `http://picsum.photos/300/150?r=${Math.random()}`
  );
};

const generateTripCard = () => {
  const currentDate = Date.now();
  const date = generateRandomDate(currentDate, 2, 10);

  return {
    id: String(new Date() + Math.random()),
    type: getRandomElement(eventTypes),
    city: getRandomElement(cities),
    photos: new Set(generatePhotos()),
    text: generateDescriptionText(),
    options: generateOptionsList(),
    price: getPrice(5, 40),
    dateStart: date,
    dateEnd: generateRandomDate(date, 1, 1),
    isFavorite: false,
  };
};

const generateOrderedDates = (card, index, cards) => {
  if (index > 0) {
    // предыдущий элемент
    let previousCard = cards[index - 1];
    let currentCard = cards[index];
    currentCard.dateStart = new Date(previousCard.dateEnd.valueOf());
    currentCard.dateStart.setHours(currentCard.dateStart.getHours() + getRandomRange(3, 7));

    currentCard.dateEnd = new Date(currentCard.dateStart.valueOf());
    currentCard.dateEnd.setHours(currentCard.dateEnd.getHours() + getRandomRange(6, 10));
  }

  card.duration = card.dateEnd - card.dateStart;

  return card;
};

const generateTripCards = () => {
  let tripCards = new Array(getRandomRange(3, 10)).fill(``)
    .map(generateTripCard);

  return tripCards.map(generateOrderedDates);
};

export {generateTripCard, generateTripCards};
