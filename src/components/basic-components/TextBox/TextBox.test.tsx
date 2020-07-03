import * as React from "react"
import { render } from "@testing-library/react"

import { BaseComponentProps, TextBox } from ".."
import render1 from "../../../../bin/render"



const Counter = (props) => {
  const [counter, setCounter] = React.useState(1)
  
  return (
    <>
      <div>Counter example</div>
      <h1>Hello World</h1>
      <p id="txt-counter">{counter}</p>
      <button id="counter-button" onClick={(e) => setCounter(counter + 1)}>
        Click me
      </button>
    </>
  )
}

describe("TextBox", () => {
  it("test", () => {
    const textBoxProps: BaseComponentProps = {
      id: "name",
      name: "name",
      placeholder: "placeholder",
      label: "Name :",
    }
    const doc = render1(<Counter />, null)
    doc.getElementById("counter-button").click()
    console.log(doc.getElementById("txt-counter").innerHTML)
    
  })
  // it("when title, id , name , placeholder is set then it should be set on the Textbox", () => {
  //   const textBoxProps: BaseComponentProps = {
  //     id: "name",
  //     name: "name",
  //     placeholder: "placeholder",
  //     label: "Name :",
  //   }
  //   const { getByLabelText, getByText } = render(
  //     <TextBox textBoxProps={textBoxProps} />
  //   )
  //   const textbox = getByLabelText("Name :")
  //   expect(textbox).toHaveAttribute("id", "name")
  //   expect(textbox).toHaveAttribute("name", "name")
  //   expect(textbox).toHaveAttribute("placeholder", "placeholder")

  //   const label = getByText("Name :")
  //   expect(label).toHaveAttribute("for", "name")
  // })
})
