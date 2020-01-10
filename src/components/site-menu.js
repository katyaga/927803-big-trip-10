import AbstractComponent from "./abstarct-component";

const ACTIVE_ITEM_CLASS = `trip-tabs__btn--active`;

export const MenuItem = {
  TABLE: `Table`,
  STATISTICS: `Stats`,
};

export default class SiteMenu extends AbstractComponent {
  constructor(menu) {
    super();

    this._menu = menu;
    this._active = MenuItem.TABLE;
  }

  _createSiteMenuItem(filter, isActive) {
    const {name} = filter;

    return `<a class="trip-tabs__btn ${isActive ? `${ACTIVE_ITEM_CLASS}` : ``}" data-tab="${name}"
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

  setActiveItem(menuItem) {
    if (menuItem.classList.contains(ACTIVE_ITEM_CLASS)) {
      return;
    }
    this._element.querySelector(`.${ACTIVE_ITEM_CLASS}`).classList.remove(ACTIVE_ITEM_CLASS);
    menuItem.classList.add(ACTIVE_ITEM_CLASS);


  }

  setClickHandler(handler) {
    this.getElement().querySelectorAll(`.trip-tabs__btn`).forEach((tab) => {
      tab.addEventListener(`click`, handler);
    });
  }
}
