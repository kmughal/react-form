import * as React from "react"
import { BaseComponentProps, TextBox } from ".."
import render1 from "../../../../bin/render"

it("when title, id , name , placeholder is set then it should be set on the Textbox", () => {
  const textBoxProps: BaseComponentProps = {
    id: "txt_name",
    name: "name",
    placeholder: "placeholder",
    label: "Name :",
  }
  const { getById, getByTagName } = render1(
    <TextBox textBoxProps={textBoxProps} />
  )

  const nameTextBox = getById("txt_name")
  expect(nameTextBox).mustHaveAnAttribute("name")
  expect(nameTextBox).mustHaveAnAttribute("placeholder")

  const label = getByTagName("label")
  expect(label).attributeValueMustBeSame("for", "name")
})
