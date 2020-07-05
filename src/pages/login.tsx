import {
  BaseComponentProps,
  FormProps,
  Form,
  TextBox,
  Password,
} from "../components/basic-components"
import { BaseValidatorProps, RequiredValidator } from "../components/validators"
import Navigation from "./components/Navigation"

const LoginPage = () => {
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
    </>
  )
}

export default LoginPage
