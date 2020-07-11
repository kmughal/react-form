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
      <h2>Sign in</h2>
      <p>
        This is a simple login form created by react form.
      </p>

      <Form formProps={formProps}>
        <RequiredValidator requiredValidatorProps={requiredValidator1}>
          <TextBox textBoxProps={textBoxProps} />
        </RequiredValidator>
        <RequiredValidator requiredValidatorProps={requiredValidator2}>
          <Password passwordProps={passwordProps} />
        </RequiredValidator>
        <div className="button-container">
          <button>Login</button>
        </div>
      </Form>
      {payload && (
        <>
          <h1>Pay load from server :</h1>
          <pre>{JSON.stringify(payload, null, 2)}</pre>
        </>
      )}
      <style jsx global>{`
        nav {
          text-align: right;
        }
        nav ul li {
          display: inline-block;
          margin: 5px 5px;
        }
        nav ul li a {
          text-decoration: none;
        }

        nav ul li a :after {
          content: " | ";
        }

        .form-container {
          width: 50%;
          margin: auto;
        }
        button {
          padding: 15px 15px;
          border-radius: 5px;
          border: 2px solid rgb(226, 232, 240);
          background: rgb(66, 153, 225);
          color: white;
          font-weight: bold;
        }

        .button-container {
          text-align: right;
          width: 475px;
        }

        div {
          padding: 5px 5px;
          margin: 0px 0px;
        }
        label {
          position: relative;
          width: 150px;
          display: inline-block;
          text-align: right;
        }
        select,
        input[type="text"],
        input[type="password"],
        input[type="number"] {
          padding: 5px 5px;
          display: inline-block;
          border: 2px solid rgb(226, 232, 240);
          width: 300px;
          border-radius: 5px;
        }
        select {
          width: 321px !important;
        }
      `}</style>
    </>
  )
}

export default LoginPage
