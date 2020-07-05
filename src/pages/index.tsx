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
  Address,
  AddressProps,
} from "../components/recepies"
import Navigation from "./components/Navigation"
import SingleFileUploadProps from "../components/basic-components/SingleFileUpload/SingleFileUpload.Props"

const Index = () => {
  const formProps: FormProps = {
    name: "test-form",
    submitForm: (formData) => {
      console.log("submit form")
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
  }

  const postCodeProps: PostCodeProps = {
    id: "postcode",
    name: "postcode",
    label: "PostCode:",
    validationMessage: "Invalid post code",
    placeholder: "Provide valid Postcode",
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

  return (
    <>
      <Navigation />
      <Form formProps={formProps}>
        <Title titleProps={titleProps} />
        <RequiredValidator requiredValidatorProps={requiredValidator}>
          <TextBox textBoxProps={textBoxProps} />
        </RequiredValidator>
        <Gender genderProps={genderProps} />
        <RangeValidator rangeValidatorProps={ageRangeValidation}>
          <NumberBox numberProps={ageProps} />
        </RangeValidator>
        <TextBox textBoxProps={streetTextBoxProps} />
        <PostCode postCodeProps={postCodeProps} />
        <RequiredValidator
          requiredValidatorProps={countryRequiredValidatorProps}
        >
          <SelectBox selectBoxProps={countriesSelectBoxProps} />
        </RequiredValidator>
        <RequiredValidator requiredValidatorProps={requiredFileProps}>
          <SingleFileUpload singleFileUploadProps={singleFileProps} />
        </RequiredValidator>
        <div>
          <input type="submit" value="Submit" />
        </div>
      </Form>
    </>
  )
}
export default Index
