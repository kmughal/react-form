import Window from "window"
import { render } from "react-dom"

let _window = null

export default (component, window = null) => {
  _window = window || new Window()
  const document = _window.document

  const container = document.createElement("div")
  container.id = "root"
  document.body.appendChild(container)
  render(component, document.getElementById("root"))

  return {
    document,
    getById: id => document.getElementById(id),
    getTextById: id => document.getElementById(id).textContent,
    getByTagName: tagName => (document.getElementsByTagName(tagName)[0] || null),
    setValueOfTextBox: (id, value) => document.getElementById(id).value = value,
    click: id => document.getElementById(id).click(),
    check: id => document.getElementById(id).checked = true,
    unCheck: id => document.getElementById(id).checked = false,
    getAttribute: (id, attributeName) => document.getElementById(id).getAttribute(attributeName)
  }

}