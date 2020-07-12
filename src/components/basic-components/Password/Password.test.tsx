import * as React from "react"
import { BaseComponentProps, Password } from ".."
import render from "../../../../bin/render"

describe("Password tests", () => {
  it("when title, id, name, placeholder & type must be number", () => {
    const props: BaseComponentProps = {
      id: "txt-password",
      name: "txt-password",
      placeholder: "Provide Password",
      label: "Password :",
    }
    const { getById, typeElementText } = render(
      <Password passwordProps={props} />
    )

    const passwordBox = getById("txt-password")
    expect(passwordBox).mustHaveAnAttribute("name")
    expect(passwordBox).mustHaveAnAttribute("placeholder")
    expect(passwordBox).typeMustBe("password")
    typeElementText(passwordBox, "This_is_my_password")
    expect(passwordBox).valueMustBeEqual("This_is_my_password")
  })

  it("when value prop is set then text box value property must be set", (done) => {
    const passwordProps: BaseComponentProps = {
      id: "txt_password",
      name: "txt_password",
      placeholder: "placeholder",
      label: "Password :",
      value: "123",
    }
    const { getById } = render(<Password passwordProps={passwordProps} />)

    const passwordBox = getById("txt_password")
    expect(passwordBox).valueMustBeEqualWithTimeout("123", done)
  })

  it("must have a label", () => {
    const props: BaseComponentProps = {
      id: "txt-password",
      name: "txt-password",
      placeholder: "Provide Password",
      label: "Password :",
    }
    const { getByTagName } = render(<Password passwordProps={props} />)

    const label = getByTagName("label")
    expect(label).attributeValueMustBeSame("for", "txt-password")
  })

  describe(" valid flag ", () => {
    it("when set to true then we are not expecting validation message", () => {
      const props: BaseComponentProps = {
        id: "txt-password",
        name: "txt-password",
        placeholder: "Provide Password",
        label: "Password :",
        valid: true,
      }
      const { getByTagName } = render(<Password passwordProps={props} />)

      const validationParagraphMessage = getByTagName("p")
      expect(validationParagraphMessage).toBeNull()
    })

    it("when set to false then we are expecting validation message", () => {
      const props: BaseComponentProps = {
        id: "txt-password",
        name: "txt-password",
        placeholder: "Provide Password",
        label: "Password :",
        valid: false,
        validationMessage: "Provided password is not valid",
      }
      const { getByTagName } = render(<Password passwordProps={props} />)

      const validationParagraphMessage = getByTagName("p")
      expect(validationParagraphMessage).not.toBeNull()
      expect(validationParagraphMessage).textContentEqual(
        "Provided password is not valid"
      )
    })
  })
})
