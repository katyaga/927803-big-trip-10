import AbstractComponent from "./abstarct-component";

export default class SiteMenu extends AbstractComponent {
  constructor(menu) {
    super();

    this._menu = menu;
  }

  _createSiteMenuItem(filter, isActive) {
    const {name} = filter;

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
}

