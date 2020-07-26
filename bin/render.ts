import Window from 'window';
import { render } from 'react-dom';
import EventTypes from './eventtypes';
let _window = null;

export default (component, window = null) => {
  _window = window || new Window();
  const document = _window.document;

  const container = document.createElement('div');
  container.id = 'root';
  document.body.appendChild(container);
  render(component, document.getElementById('root'));

  const triggerEvent = (eventName, element) => {
    const metaData = EventTypes[eventName];
    const evt = document.createEvent(metaData.EventType);
    evt.initEvent(
      eventName,
      metaData.defaultInit.bubbles,
      metaData.defaultInit.cancelable
    );
    element.dispatchEvent(evt);
  };

  return {
    window,
    document,
    getById: (id) => document.getElementById(id),
    getTextById: (id) => document.getElementById(id).textContent,
    getByTagName: (tagName) =>
      document.getElementsByTagName(tagName)[0] || null,
    getAllByTagName: (tagName) => {
      const inputs = ['radio', 'checkbox', 'text', 'password', 'number'];
      if (inputs.includes(tagName))
        return document.querySelectorAll(`input[type="${tagName}"]`);
      return document.getElementsByTagName(tagName);
    },
    setValueOfTextBox: (id, value) =>
      (document.getElementById(id).value = value),
    click: (id) => document.getElementById(id).click(),
    check: (id) => (document.getElementById(id).checked = true),
    unCheck: (id) => (document.getElementById(id).checked = false),
    getAttribute: (id, attributeName) =>
      document.getElementById(id).getAttribute(attributeName),
    typeElementText: (el, value) => (el.value = value),
    getByText: (text: string) => String(container.innerHTML).indexOf(text) > -1,
    triggerEvent,
    fireChangeEvent: (el, value) => {
      el.value = value;
      triggerEvent('change', el);
    },
  };
};
