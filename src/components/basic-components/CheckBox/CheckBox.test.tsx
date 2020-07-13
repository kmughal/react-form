import * as React from "react"
import { CheckBoxProps } from "."
import { CheckBox } from ".."
import render from "../../../../bin/render"

describe("CheckBox tests", () => {
  it("when title, id, name, placeholder & type must be number", () => {
    const props: CheckBoxProps = {
      id: "txt-CheckBox",
      name: "txt-CheckBox",
      placeholder: "Select",
      label: "CheckBox :",
    }
    const { getById } = render(<CheckBox checkBoxProps={props} />)

    const CheckBoxBox = getById("txt-CheckBox")
    expect(CheckBoxBox).mustHaveAnAttribute("name")
    expect(CheckBoxBox).typeMustBe("checkbox")
  })

  it("when checked then it should be marked as selected", () => {
    const props: CheckBoxProps = {
      id: "txt-CheckBox",
      name: "txt-CheckBox",
      placeholder: "Select",
      label: "CheckBox :",
      checked: true,
    }
    const { getById } = render(<CheckBox checkBoxProps={props} />)

    const CheckBoxBox = getById("txt-CheckBox")
    expect(CheckBoxBox).mustHaveAnAttribute("name")
    expect(CheckBoxBox).typeMustBe("checkbox")
    expect(CheckBoxBox.checked).toBeTruthy()
  })

  it("must have a label", () => {
    const props: CheckBoxProps = {
      id: "txt-CheckBox",
      name: "txt-CheckBox",
      placeholder: "Provide CheckBox",
      label: "CheckBox :",
    }
    const { getByTagName } = render(<CheckBox checkBoxProps={props} />)

    const label = getByTagName("label")
    expect(label).attributeValueMustBeSame("for", "txt-CheckBox")
  })

  describe(" valid flag ", () => {
    it("when set to true then we are not expecting validation message", () => {
      const props: CheckBoxProps = {
        id: "txt-CheckBox",
        name: "txt-CheckBox",
        placeholder: "Provide CheckBox",
        label: "CheckBox :",
        valid: true,
      }
      const { getByTagName } = render(<CheckBox checkBoxProps={props} />)

      const validationParagraphMessage = getByTagName("p")
      expect(validationParagraphMessage).toBeNull()
    })

    it("when set to false then we are expecting validation message", () => {
      const props: CheckBoxProps = {
        id: "txt-CheckBox",
        name: "txt-CheckBox",
        placeholder: "Provide CheckBox",
        label: "CheckBox :",
        valid: false,
        validationMessage: "Provided age is not valid",
      }
      const { getByTagName } = render(<CheckBox checkBoxProps={props} />)

      const validationParagraphMessage = getByTagName("p")
      expect(validationParagraphMessage).not.toBeNull()
      expect(validationParagraphMessage).textContentEqual(
        "Provided age is not valid"
      )
    })
  })
})
