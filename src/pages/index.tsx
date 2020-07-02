import {
  BaseComponentProps,
  Form,
  FormProps,
  TextBox,
  NumberBox,
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
} from "../components/recepies"

const Index = () => {
  const formProps: FormProps = {
    name: "test-form",
    submitForm: (formData) => {
      console.log("submit form")
    },
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

  const postCodeProps: PostCodeProps = {
    id: "postcode",
    name: "postcode",
    label: "PostCode:",
    validationMessage: "Invalid post code",
    placeholder:"Provide valid Postcode"
  }

  return (
    <>
      <Form formProps={formProps}>
        <Title titleProps={titleProps} />
        <RequiredValidator requiredValidatorProps={requiredValidator}>
          <TextBox textBoxProps={textBoxProps} />
        </RequiredValidator>
        <RangeValidator rangeValidatorProps={ageRangeValidation}>
          <NumberBox numberProps={ageProps} />
        </RangeValidator>
        <PostCode postCodeProps={postCodeProps} />
        <div>
          <input type="submit" value="Submit" />
        </div>
      </Form>
    </>
  )
}
export default Index
