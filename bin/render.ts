// const Window = require("window")
// const { render } = require("react-dom")

// const render = (component, window) => {

// }


// module.render = render

import Window from "window"
import { render } from "react-dom"

export default (component, window) => {
  window = window || new Window()
  const document = window.document

  const container = document.createElement("div")
  container.id = "root"
  document.body.appendChild(container)
  render(component, document.getElementById("root"))
   
  
  return {
    document,
    getById: id => document.getElementById(id),
    getByType: typeName => document.querySelectorAll("input[type=']")
  }

}