import {
  BaseComponentProps,
  Form,
  FormProps,
  TextBox,
  NumberBox,
  SelectBoxProps,
  SelectBoxOption,
  SelectBox,
  SingleFileUpload,
  MultilineTextBox,
  RadioButton,
} from "../components/basic-components"

import {
  RequiredValidator,
  BaseValidatorProps,
  RangeValidator,
  RangeValidatorProps,
} from "../components/validators"

import {
  Title,
  TitleProps,
  PostCodeProps,
  PostCode,
  Gender,
  GenderProps,
} from "../components/recepies"
import Navigation from "./components/Navigation"
import SingleFileUploadProps from "../components/basic-components/SingleFileUpload/SingleFileUpload.Props"
import React from "react"
import { ShowIf, ShowIfProps } from "../components/helper-components"
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

  const textBoxProps: BaseComponentProps = {
    id: "name",
    name: "name",
    label: "Name :",
    validationMessage: "Please provide the name.",
    placeholder: "enter name",
  }

  const requiredValidator: BaseValidatorProps = { name: "name_required" }

  const titleProps: TitleProps = {
    name: "title",
    id: "title",
    label: "Title :",
    placeholder: "Please select title",
    validationMessage: "Title is required!",
  }

  const ageProps: BaseComponentProps = {
    id: "age",
    name: "age",
    label: "Age :",
    placeholder: "Provide age",
    validationMessage: "Age must be between 5 - 15",
  }

  const ageRangeValidation: RangeValidatorProps = {
    name: "age_range_validation",
    max: 15,
    min: 5,
  }

  const genderProps: GenderProps = {
    name: "gender",
    id: "rd_gender",
    label: "Select gender ",
    validationMessage: "Please select gender as it is required!",
  }

  const streetTextBoxProps: BaseComponentProps = {
    id: "street",
    name: "street",
    label: "Street / House number",
    placeholder: "Street address",
    showIfCallback: ({ data }) => data === "give_details",
  }

  const countriesSelectBoxProps: SelectBoxProps = {
    id: "ddl_countires",
    name: "countries",
    label: "Country :",
    placeholder: "Select Country",
    options: [
      new SelectBoxOption(".....", ""),
      new SelectBoxOption("UK", "uk"),
      new SelectBoxOption("USA", "usa"),
      new SelectBoxOption("Pakistan", "pakistan"),
    ],
    validationMessage: "Country is a required field!",
  }

  const countryRequiredValidatorProps: BaseValidatorProps = {
    name: "required_countries",
  }

  const requiredFileProps: BaseValidatorProps = {
    name: "file_required",
  }
  const singleFileProps: SingleFileUploadProps = {
    id: "user_doc",
    name: "user_doc",
    accept: ".jpeg",
    label: "Provide a document",
    placeholder: "Document",
    validationMessage: "A document is required!",
  }

  const showDetailsInputBox: ShowIfProps = {
    id: "user_decided_to_give_details",
  }

  const nameTextBoxProps: BaseComponentProps = {
    id: "name",
    label: "Name :",
    placeholder: "Provide name ....",
    name: "name",
    showIfCallback: ({ data }) => data === "give_details",
  }

  const postCodeProps: PostCodeProps = {
    id: "postcode",
    name: "postcode",
    label: "PostCode:",
    validationMessage: "Invalid post code",
    placeholder: "Provide valid Postcode",
    showIfCallback: ({ data }) => data === "give_details",
  }

  // const textBoxCondition2: BaseComponentProps = {
  //   id: "txt_condition_2",
  //   label: "Enter your second_name",
  //   placeholder: "Secondname",
  //   name: "second_name",
  //   showIfCallback: ({ data }) => data === "usa",
  // }

  const multilineTextBoxProps: MultilineTextBoxProps = {
    id: "comments",
    name: "comments",
    label: "Comments",
    placeholder: "Enter comments",
    rows: 10,
    columns: 20,
  }

  const radioButtonProps: RadioButtonProps = {
    legend: "About your personal information",
    name: "choice_deetail",
    radioButtonOptions: [
      new RadioButtonOption("Provide your details", "give_details"),
      new RadioButtonOption("No I dont want to give my details", "no_details"),
    ],
    label: "choice_deetail",
  }

  return (
    <>
      <Navigation />

      <Form formProps={formProps}>
        <MultilineTextBox multilineTextBoxProps={multilineTextBoxProps} />

        {/* <SelectBox selectBoxProps={countriesSelectBoxProps}>
          <ShowIf showIfProps={showIfProps1}>
            <TextBox textBoxProps={textBoxCondition1} />
          </ShowIf>
          <ShowIf showIfProps={showIfProps2}>
            <TextBox textBoxProps={textBoxCondition2} />
          </ShowIf>
        </SelectBox> */}

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
    </>
  )
}
export default Index
