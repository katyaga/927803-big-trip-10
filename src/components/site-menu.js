const createSiteMenuItem = (menuItem, isActive) => {
  const {name} = menuItem;

  return `<a class="trip-tabs__btn ${isActive ? `trip-tabs__btn--active` : ``}" 
          href="#">${name}</a>`;
};

export const createSiteMenuTemplate = (siteMenu) => {
  const siteMenuItem = siteMenu.map((it, i) => createSiteMenuItem(it, i === 0)).join(`\n`);
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      ${siteMenuItem}
     </nav>`
  );
};
