import {
  BaseComponentProps,
  FormProps,
  Form,
  TextBox,
  Password,
} from "../components/basic-components"
import { BaseValidatorProps, RequiredValidator } from "../components/validators"
import Navigation from "./components/Navigation"
import React from "react"

const LoginPage = () => {
  const [payload, setPayload] = React.useState(null)
  const textBoxProps: BaseComponentProps = {
    label: "Username",
    name: "user-name",
    id: "user-name",
    placeholder: "Provide Username",
    validationMessage: "Please provide username",
  }

  const passwordProps: BaseComponentProps = {
    label: "Password",
    name: "password",
    id: "password",
    placeholder: "Provide Password",
    validationMessage: "Please provide password",
  }

  const formProps: FormProps = {
    showValidationSummary: true,
    submitForm: (formData) => {
      fetch("/api/fake", {
        body: formData,
        method: "POST",
      })
        .then((response) => response.json())
        .then(setPayload)
        .catch(console.log)
      console.log("login")
    },
  }
  const requiredValidator1: BaseValidatorProps = { name: "username_required" }
  const requiredValidator2: BaseValidatorProps = { name: "password_required" }

  return (
    <>
      <Navigation />

      <Form formProps={formProps}>
        <RequiredValidator requiredValidatorProps={requiredValidator1}>
          <TextBox textBoxProps={textBoxProps} />
        </RequiredValidator>
        <RequiredValidator requiredValidatorProps={requiredValidator2}>
          <Password passwordProps={passwordProps} />
        </RequiredValidator>
        <div>
          <input type="submit" value="Sign-in" />
        </div>
      </Form>
      {payload && (
        <>
          <h1>Pay load from server :</h1>
          <pre>{JSON.stringify(payload, null, 2)}</pre>
        </>
      )}
    </>
  )
}

export default LoginPage
