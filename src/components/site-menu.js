import {createElement} from '../utils.js';

export default class SiteMenu {
  constructor(menu) {
    this._menu = menu;
    this._element = null;
  }

  _createSiteMenuItem(isActive) {
    const {name} = this._menu;

    return `<a class="trip-tabs__btn ${isActive ? `trip-tabs__btn--active` : ``}"
          href="#">${name}</a>`;
  }

  _createSiteMenuTemplate() {
    const siteMenuItem = this._menu.map((it, i) => this._createSiteMenuItem(it, i === 0)).join(`\n`);
    return (
      `<nav class="trip-controls__trip-tabs  trip-tabs">
      ${siteMenuItem}
     </nav>`
    );
  }

  getTemplate() {
    return this._createSiteMenuTemplate();
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

