import {cities, eventTypes} from "../const";
import {shuffleArray, getRandomRange, getRandomElement} from "../utils";

const descriptionText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna,
  non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.
  Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae,
  sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.
   Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.
   In rutrum ac purus sit amet tempus.`;

const generateDescriptionText = (text) => {
  let textSentences = new Array(...new Set(text.split(`.`)))
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

const generateOptionsList = () => {
  return shuffleArray(options).slice(0, getRandomRange(0, options.length));
};

const generatePhotos = () => {
  return new Array(5).fill(``).map(() =>
    `http://picsum.photos/300/150?r=${Math.random()}`
  );
};

const generateFormEdit = () => {
  const currentDate = Date.now();
  const date = generateRandomDate(currentDate, 2, 30);

  return {
    type: getRandomElement(eventTypes),
    city: getRandomElement(cities),
    photos: new Set(generatePhotos()),
    text: generateDescriptionText(descriptionText),
    options: generateOptionsList(),
    price: getPrice(5, 40),
    dateStart: date,
    dateEnd: generateRandomDate(date, 0, 3),
  };
};

const generateOrderedDates = (card, index, cards) => {
  if (index > 0) {
    // предыдущий элемент
    let previousCard = cards[index - 1];
    let currentCard = cards[index];
    currentCard.dateStart = new Date(previousCard.dateEnd.valueOf());
    currentCard.dateStart.setHours(currentCard.dateStart.getHours() + 15);

    currentCard.dateEnd = new Date(currentCard.dateStart.valueOf());
    currentCard.dateEnd.setHours(currentCard.dateEnd.getHours() + 18);
  }

  return card;
};

const generateTripCards = (count) => {
  let tripCards = new Array(count).fill(``).map(generateFormEdit);

  return tripCards.map(generateOrderedDates);
};

export {generateFormEdit, generateTripCards};
