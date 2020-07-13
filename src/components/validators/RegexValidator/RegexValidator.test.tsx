import React from "react"
import { RegexValidatorProps } from "."
import render from "../../../../bin/render"
import {
  BaseComponentProps,
  Form,
  FormProps,
  TextBox,
} from "../../basic-components"
import RegexValidator from "./RegexValidator"

describe("RegEx Validator - ", () => {
  it("Html Input elements must be validated ", () => {
    const formProps: FormProps = {
      submitForm: (formData) => {},
    }
    const regExValidatorProps: RegexValidatorProps = {
      name: "required_props",
      regExp: new RegExp("/(.*[a-z]){3}/i"),
    }
    const textBoxProps: BaseComponentProps = {
      id: "name",
      name: "name",
      label: "Name :",
      placeholder: "Enter name :",
      validationMessage: "Name must be atleast three character long!",
    }
    const dom = render(
      <Form formProps={formProps}>
        <RegexValidator regexValidatorProps={regExValidatorProps}>
          <TextBox textBoxProps={textBoxProps} />
        </RegexValidator>
        <button>Sumit</button>
      </Form>
    )

    const { getByTagName, triggerEvent, getByText,typeElementText ,getById} = dom

    const textBox = getById("name")
    typeElementText(textBox, "he")

    const submitButton = getByTagName("button")

    triggerEvent("submit", submitButton)
    const messageAppeared = getByText("Name must be atleast three character long!")
    expect(messageAppeared).toBeTruthy()
  })

  it("valid , validators should not be null", () => {
    const formProps: FormProps = {
      submitForm: (formData) => {},
    }
    const regexValidatorProps: RegexValidatorProps = {
      name: "required_props",
      regExp: new RegExp("/(.*[a-z]){3}/i"),
    }
    const textBoxProps: BaseComponentProps = {
      id: "name",
      name: "name",
      label: "Name :",
      placeholder: "Enter name :",
      validationMessage: "Name is required",
    }
    render(
      <Form formProps={formProps}>
        <RegexValidator regexValidatorProps={regexValidatorProps}>
          <TextBox textBoxProps={textBoxProps} />
        </RegexValidator>
        <button>Sumit</button>
      </Form>
    )

    expect(regexValidatorProps.validators[textBoxProps.name]).not.toBeNull()
    expect(regexValidatorProps.valid).not.toBeNull()
    expect(regexValidatorProps.valid).toBeTruthy()
  })
})
