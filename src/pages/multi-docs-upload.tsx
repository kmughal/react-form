import {
  BaseComponentProps,
  FormProps,
  Form,
  TextBox,
  MultiFileUpload,
} from "../components/basic-components"
import { BaseValidatorProps, RequiredValidator } from "../components/validators"
import Navigation from "./components/Navigation"
import React from "react"

const MultiDocsUploadPage = () => {
  const [payload, setPayload] = React.useState(null)
  const textBoxProps: BaseComponentProps = {
    label: "Name",
    name: "txt-name",
    id: "txt-name",
    placeholder: "Provide Name...",
    validationMessage: "Please provide name...",
  }

  const multiDocsProps: BaseComponentProps = {
    label: "Please provide document(s)",
    name: "multi-docs",
    id: "multi-docs",
    placeholder: "Provie docs",
    validationMessage: "Atleast select one file"
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
  const requiredValidator1: BaseValidatorProps = { name: "name_required" }
  const requiredValidator2: BaseValidatorProps = { name: "file_required" }

  return (
    <>
      <Navigation />

      <Form formProps={formProps}>
        <RequiredValidator requiredValidatorProps={requiredValidator1}>
          <TextBox textBoxProps={textBoxProps} />
        </RequiredValidator>
        <RequiredValidator requiredValidatorProps={requiredValidator2}>
          <MultiFileUpload multiFileUploadProps={multiDocsProps} />
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

export default MultiDocsUploadPage
