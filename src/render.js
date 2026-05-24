const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

function render(component, container, place = RenderPosition.BEFOREEND) {
  container.insertAdjacentElement(place, component.getElement());
}

function replace(newComponent, oldComponent) {
  if (newComponent === null || oldComponent === null) {
    return;
  }

  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const parent = oldElement.parentElement;

  if (parent === null) {
    return;
  }

  parent.replaceChild(newElement, oldElement);
}

function createElement(template) {
  const newElement = document.createElement('div');
  newElement.innerHTML = template.trim();

  return newElement.firstElementChild;
}

export {RenderPosition, render, replace, createElement};