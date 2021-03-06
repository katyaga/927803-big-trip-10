export const renderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`,
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const render = (container, component, place) => {
  switch (place) {
    case renderPosition.AFTERBEGIN:
      container.prepend(component.getElement());
      break;
    case renderPosition.BEFOREEND:
      container.append(component.getElement());
      break;
    case renderPosition.AFTEREND:
      container.after(component.getElement());
      break;
  }
};

export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

export const replace = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const isExistElements = !!(parentElement && newElement && oldElement);

  if (isExistElements && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};

const getTripCost = (tripDays) => {
  const tripDaysCards = tripDays.flat();
  let tripCost = 0;
  let optionsCardCost = 0;
  tripDaysCards.forEach((tripDaysCard) => {
    optionsCardCost = 0;
    Array.from(tripDaysCard.options).forEach((option) => {

      if (option.checked === true) {
        optionsCardCost += option.price;
      }
    });

    tripCost = tripCost + tripDaysCard.price + optionsCardCost;
  });

  return tripCost;
};

export const renderTravelCost = (tripPoints) => {
  const tripCostElement = document.querySelector(`.trip-info__cost-value`);
  tripCostElement.innerHTML = getTripCost(tripPoints);
};
