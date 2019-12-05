import {createElement} from '../utils.js';

const createSiteMenuItem = (menuItem, isActive) => {
  const {name} = menuItem;

  return `<a class="trip-tabs__btn ${isActive ? `trip-tabs__btn--active` : ``}"
          href="#">${name}</a>`;
};

const createSiteMenuTemplate = (siteMenu) => {
  const siteMenuItem = siteMenu.map((it, i) => createSiteMenuItem(it, i === 0)).join(`\n`);
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      ${siteMenuItem}
     </nav>`
  );
};

export default class SiteMenu {
  constructor(menu) {
    this._menu = menu;
    this._element = null;
  }

  getTemplate() {
    return createSiteMenuTemplate(this._menu);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

