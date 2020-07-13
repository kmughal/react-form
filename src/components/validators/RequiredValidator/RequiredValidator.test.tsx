import React from "react"
import { RequiredValidator } from "."
import { BaseValidatorProps } from ".."
import render from "../../../../bin/render"
import {
  BaseComponentProps,
  CheckBox,
  Form,
  FormProps,
  TextBox,
} from "../../basic-components"

describe("Required Validator - ", () => {
  it("Html Input elements must be validated ", () => {
    const formProps: FormProps = {
      submitForm: (formData) => {},
    }
    const requiredValidtorProps: BaseValidatorProps = { name: "required_props" }
    const textBoxProps: BaseComponentProps = {
      id: "name",
      name: "name",
      label: "Name :",
      placeholder: "Enter name :",
      validationMessage: "Name is required",
    }
    const dom = render(
      <Form formProps={formProps}>
        <RequiredValidator requiredValidatorProps={requiredValidtorProps}>
          <TextBox textBoxProps={textBoxProps} />
        </RequiredValidator>
        <button>Sumit</button>
      </Form>
    )

    const { getByTagName, triggerEvent, getByText } = dom

    const submitButton = getByTagName("button")
    triggerEvent("submit", submitButton)
    const messageAppeared = getByText("Name is required")
    expect(messageAppeared).toBeTruthy()
  })

  it("valid , validators should not be null", () => {
    const formProps: FormProps = {
      submitForm: (formData) => {},
    }
    const requiredValidtorProps: BaseValidatorProps = { name: "required_props" }
    const textBoxProps: BaseComponentProps = {
      id: "name",
      name: "name",
      label: "Name :",
      placeholder: "Enter name :",
      validationMessage: "Name is required",
    }
    render(
      <Form formProps={formProps}>
        <RequiredValidator requiredValidatorProps={requiredValidtorProps}>
          <TextBox textBoxProps={textBoxProps} />
        </RequiredValidator>
        <button>Sumit</button>
      </Form>
    )

    expect(requiredValidtorProps.validators[textBoxProps.name]).not.toBeNull()
    expect(requiredValidtorProps.valid).not.toBeNull()
    expect(requiredValidtorProps.valid).toBeTruthy()
  })

  it("When applied to checkbox then it should be validated for non-selection ", () => {
    const formProps: FormProps = {
      submitForm: (formData) => {},
    }
    const requiredValidtorProps: BaseValidatorProps = { name: "required_props" }
    const checkboxProps: BaseComponentProps = {
      id: "chk_married",
      name: "chk_married",
      label: "Are you married :",
      validationMessage: "This question is required to answered",
    }
    const dom = render(
      <Form formProps={formProps}>
        <RequiredValidator requiredValidatorProps={requiredValidtorProps}>
          <CheckBox checkBoxProps={checkboxProps} />
        </RequiredValidator>
        <button>Sumit</button>
      </Form>
    )

    const { getByTagName, triggerEvent, getByText } = dom

    const submitButton = getByTagName("button")
    triggerEvent("submit", submitButton)
    const messageAppeared = getByText("This question is required to answered")
    expect(messageAppeared).toBeTruthy()
  })


  it("When applied to checkbox then it should be validated for non-selection ", () => {
    const formProps: FormProps = {
      submitForm: (formData) => {},
    }
    const requiredValidtorProps: BaseValidatorProps = { name: "required_props" }
    
    const dom = render(
      <Form formProps={formProps}>
        <RequiredValidator requiredValidatorProps={requiredValidtorProps}>
         
        </RequiredValidator>
        <button>Submit</button>
      </Form>
    )

    const { getByTagName, triggerEvent, getByText,document } = dom

    const submitButton = getByTagName("button")
    triggerEvent("submit", submitButton)
    const messageAppeared = getByText("Something went wrong")
    expect(messageAppeared).toBeFalsy()
  })
})
