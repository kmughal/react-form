import * as React from "react"
import { BaseComponentProps, TextBox } from ".."
import render from "../../../../bin/render"

describe("TextBox tests", () => {
  it("when title, id, name, placeholder & type must be text", () => {
    const textBoxProps: BaseComponentProps = {
      id: "txt_name",
      name: "name",
      placeholder: "placeholder",
      label: "Name :",
    }
    const { getById, typeElementText } = render(
      <TextBox textBoxProps={textBoxProps} />
    )

    const nameTextBox = getById("txt_name")
    expect(nameTextBox).mustHaveAnAttribute("name")
    expect(nameTextBox).mustHaveAnAttribute("placeholder")
    expect(nameTextBox).typeMustBe("text")
    typeElementText(nameTextBox, "khurram")
    expect(nameTextBox).valueMustBeEqual("khurram")
  })

  it("must have a label", () => {
    const textBoxProps: BaseComponentProps = {
      id: "txt_name",
      name: "name",
      placeholder: "placeholder",
      label: "Name :",
    }
    const { getByTagName } = render(<TextBox textBoxProps={textBoxProps} />)

    const label = getByTagName("label")
    expect(label).attributeValueMustBeSame("for", "name")
  })

  describe(" valid flag ", () => {
    it("when set to true then we are not expecting validation message", () => {
      const textBoxProps: BaseComponentProps = {
        id: "txt_name",
        name: "name",
        placeholder: "placeholder",
        label: "Name :",
        valid: true,
      }
      const { getByTagName } = render(<TextBox textBoxProps={textBoxProps} />)

      const validationParagraphMessage = getByTagName("p")
      expect(validationParagraphMessage).toBeNull()
    })

    it("when set to false then we are expecting validation message", () => {
      const textBoxProps: BaseComponentProps = {
        id: "txt_name",
        name: "name",
        placeholder: "placeholder",
        label: "Name :",
        valid: false,
        validationMessage: "Name is not valid",
      }
      const { getByTagName } = render(<TextBox textBoxProps={textBoxProps} />)

      const validationParagraphMessage = getByTagName("p")
      expect(validationParagraphMessage).not.toBeNull()
      expect(validationParagraphMessage).textContentEqual("Name is not valid")
    })
  })
})
