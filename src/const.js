export const EVENT_TYPES = [
  {
    name: `taxi`,
    title: `Taxi`,
    group: `transfer`,
  },
  {
    name: `bus`,
    title: `Bus`,
    group: `transfer`,
  },
  {
    name: `train`,
    title: `Train`,
    group: `transfer`,
  },
  {
    name: `ship`,
    title: `Ship`,
    group: `transfer`,
  },
  {
    name: `transport`,
    title: `Transport`,
    group: `transfer`,
  },
  {
    name: `drive`,
    title: `Drive`,
    group: `transfer`,
  },
  {
    name: `flight`,
    title: `Flight`,
    group: `transfer`,
  },
  {
    name: `check-in`,
    title: `Check-in`,
    group: `activity`,
  },
  {
    name: `sightseeing`,
    title: `Sightseeing`,
    group: `activity`,
  },
  {
    name: `restaurant`,
    title: `Restaurant`,
    group: `activity`,
  },
];

export const TRANSFER_NAMES = EVENT_TYPES.map(
    (eventType) => eventType.group === `transfer` && eventType.name
).filter((item) => item);

export const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`,
};

export const MONTH_NAMES = [
  `Jan`,
  `Feb`,
  `Mar`,
  `Apr`,
  `May`,
  `Jun`,
  `Jul`,
  `Aug`,
  `Sep`,
  `Oct`,
  `Nov`,
  `Dec`,
];

