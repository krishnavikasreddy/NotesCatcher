

const createElement = elementType => document.createElement(elementType);

const insertElementInBody = element => document.body.appendChild(element);

const changeElementStyle = (DOMElement, style) => {
  Object.assign(DOMElement.style, style);
};
const isHidden = element => element.style.visibility === 'hidden';

const hideElement = (element) => {
  Object.assign(element.style, { visibility: 'hidden' });
};

const showElement = (element) => {
  if (element.style.display !== 'none') {
    Object.assign(element.style, { visibility: 'visible' });
  } else {
    Object.assign(element.style, { display: 'inline' });
  }
};

const addEvent = (element, eventType, listener, options) => {
  element.addEventListener(eventType, listener, options);
};

export {
  createElement,
  insertElementInBody,
  changeElementStyle,
  hideElement,
  isHidden,
  showElement,
  addEvent,
};
