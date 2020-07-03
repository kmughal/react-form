import * as React from "react"
import { render } from "@testing-library/react"

import { BaseComponentProps, TextBox } from ".."

describe("TextBox", () => {
  it("when title, id , name , placeholder is set then it should be set on the Textbox", () => {
    const textBoxProps: BaseComponentProps = {
      id: "name",
      name: "name",
      placeholder: "placeholder",
      label: "Name :",
    }
    const { getByLabelText, getByText } = render(
      <TextBox textBoxProps={textBoxProps} />
    )
    const textbox = getByLabelText("Name :")
    expect(textbox).toHaveAttribute("id", "name")
    expect(textbox).toHaveAttribute("name", "name")
    expect(textbox).toHaveAttribute("placeholder", "placeholder")

    const label = getByText("Name :")
    expect(label).toHaveAttribute("for", "name")
  })
})
