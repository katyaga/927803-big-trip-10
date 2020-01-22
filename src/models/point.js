const setChecked = (options) => {
  options.forEach((option) => {
    option.checked = true;
  });

  return options;
};

export default class Point {
  constructor(data) {
    this.id = data[`id`];
    this.type = data[`type`];
    this.destination = data[`destination`];
    this.dateStart = new Date(data[`date_from`]);
    this.dateEnd = new Date(data[`date_to`]);
    this.destination = data[`destination`];
    this.price = data[`base_price`];
    this.options = data[`offers`] ? setChecked(data[`offers`]) : [];
    this.isFavorite = data[`is_favorite`];
  }

  toRAW() {
    return {
      'id': `${this.id}`,
      'type': this.type,
      'destination': this.destination,
      'date_from': this.dateStart.toISOString(),
      'date_to': this.dateEnd.toISOString(),
      'base_price': this.price,
      'is_favorite': this.isFavorite,
      'offers': this.options,
    };
  }

  static parsePoint(data) {
    return new Point(data);
  }

  static parsePoints(data) {
    return data.map(Point.parsePoint);
  }
}
