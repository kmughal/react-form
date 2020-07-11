import {
  BaseComponentProps,
  Form,
  FormProps,
  TextBox,
  MultilineTextBox,
  RadioButton,
} from "../components/basic-components"

import {
  RequiredValidator,
  BaseValidatorProps,
  RangeValidatorProps,
} from "../components/validators"

import { TitleProps, PostCodeProps, GenderProps } from "../components/recepies"
import Navigation from "./components/Navigation"
import SingleFileUploadProps from "../components/basic-components/SingleFileUpload/SingleFileUpload.Props"
import React from "react"
import {
  ShowIf,
  ShowIfProps,
  PlainMarkup,
  PlainMarkupProps,
} from "../components/helper-components"
import MultilineTextBoxProps from "../components/basic-components/MultilineTextBox/MultilineTextBox.Props"
import RadioButtonProps from "../components/basic-components/RadioButton/RadioButton.Props"
import { RadioButtonOption } from "../components/basic-components/RadioButton/RadioButtonOption"

const Index = () => {
  const [payload, setPayload] = React.useState(null)

  const formProps: FormProps = {
    name: "test-form",
    heading: "Complex Form Example",
    submitForm: (formData) => {
      fetch("/api/fake", {
        body: formData,
        method: "POST",
      })
        .then((response) => response.json())
        .then(setPayload)
        .catch(console.log)
    },
    showValidationSummary: true,
  }

  const requiredValidator: BaseValidatorProps = { name: "name_required" }
  const commentsRequiredValidator: BaseValidatorProps = {
    name: "comments_required",
  }

  const streetTextBoxProps: BaseComponentProps = {
    id: "street",
    name: "street",
    label: "Street / House number",
    placeholder: "Street address",
    showIfCallback: ({ data }) => data === "give_details",
  }

  const showDetailsInputBox: ShowIfProps = {
    id: "user_decided_to_give_details",
  }

  const nameTextBoxProps: BaseComponentProps = {
    id: "name",
    label: "Name :",
    placeholder: "Provide name ....",
    validationMessage: "Please provide the name",
    name: "name",
    showIfCallback: ({ data }) => data === "give_details",
  }

  const multilineTextBoxProps: MultilineTextBoxProps = {
    id: "comments",
    name: "comments",
    label: "Comments",
    placeholder: "Enter comments",
    rows: 10,
    columns: 20,
    validationMessage: "Please provide the comments",
  }

  const radioButtonProps: RadioButtonProps = {
    legend: "About your personal information",
    name: "choice_deetail",
    radioButtonOptions: [
      new RadioButtonOption("Provide your details", "give_details"),
      new RadioButtonOption("No I dont want to give my details", "no_details"),
    ],
    label: "choice_deetail",
    id: "choice_detail",
  }

  const plainMarkupProps: PlainMarkupProps = {
    id: "plain_markup_prop",
    parentElementValue: (data) => {
      if (data) {
        const value = data.data
        return (
          <p>
            You have entered : {value} / Characters : {value.length}
          </p>
        )
      }
    },
  }

  return (
    <>
      <Navigation />

      <div className="form-container">
        <Form formProps={formProps}>
          <RequiredValidator requiredValidatorProps={commentsRequiredValidator}>
            <MultilineTextBox multilineTextBoxProps={multilineTextBoxProps}>
              <PlainMarkup plainMarkupProps={plainMarkupProps} />
            </MultilineTextBox>
          </RequiredValidator>

          <RadioButton radioButtonProps={radioButtonProps}>
            <ShowIf showIfProps={showDetailsInputBox}>
              <RequiredValidator requiredValidatorProps={requiredValidator}>
                <TextBox textBoxProps={nameTextBoxProps} />
              </RequiredValidator>
              <TextBox textBoxProps={streetTextBoxProps} />
            </ShowIf>
          </RadioButton>

          <div>
            <input type="submit" value="Submit" />
          </div>
        </Form>
        {payload && (
          <>
            <h1>Pay load from server :</h1>
            <pre>{JSON.stringify(payload, null, 2)}</pre>
          </>
        )}
      </div>
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
        input[type="text"] {
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
export default Index
