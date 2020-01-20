import AbstractComponent from "./abstarct-component";

const ACTIVE_ITEM_CLASS = `trip-tabs__btn--active`;

export const MenuItem = {
  TABLE: `Table`,
  STATISTICS: `Stats`,
};

export default class SiteMenu extends AbstractComponent {
  constructor() {
    super();
  }

  _createSiteMenuItem(filter, isActive) {
    return `<a class="trip-tabs__btn ${isActive ? `${ACTIVE_ITEM_CLASS}` : ``}" data-tab="${filter}"
          href="#">${filter}</a>`;
  }

  _createSiteMenuTemplate() {
    const siteMenuItem = Object.values(MenuItem).map((it, i) => this._createSiteMenuItem(it, i === 0)).join(`\n`);
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
