import * as React from "react"
import { BaseComponentProps, TextBox } from ".."
import render from "../../../../bin/render"

describe("TextBox tests", () => {
  it("when title, id, name, placeholder and value is set then it should be set on the Textbox", () => {
    const textBoxProps: BaseComponentProps = {
      id: "txt_name",
      name: "name",
      placeholder: "placeholder",
      label: "Name :"
    }
    const { getById, getByTagName, typeElementText } = render(
      <TextBox textBoxProps={textBoxProps} />
    )

    const nameTextBox = getById("txt_name")
    expect(nameTextBox).mustHaveAnAttribute("name")
    expect(nameTextBox).mustHaveAnAttribute("placeholder")
    typeElementText(nameTextBox, "khurram")
    expect(nameTextBox).valueMustBeEqual("khurram")

    const label = getByTagName("label")
    expect(label).attributeValueMustBeSame("for", "name")
  })

  it("when onChange handler is passed as textBox property then it should be called on change event", () => {

    
  })
})
