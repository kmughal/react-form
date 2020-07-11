import { SelectBoxOption, SelectBoxProps } from "../../components/basic-components";

const componentSelectBoxProps: SelectBoxProps = {
  id: "form-builder_component-options",
  name: "form-builder_component-options",
  placeholder: "Select a component",
  label: "Component: ",
  validationMessage: "Component selection is required",
  options: [
    new SelectBoxOption("Select a component", ""),
    new SelectBoxOption("TextBox", "textbox"),
    new SelectBoxOption("RadioButton", "radiobutton"),
    new SelectBoxOption("CheckBox", "checkbox"),
    new SelectBoxOption("Number", "number"),
    new SelectBoxOption("Password", "password"),
    new SelectBoxOption("SingleFileUpload", "singleFileUpload"),
  ]
}

const validatorSelectBoxProps: SelectBoxProps = {
  id: "form-buidler_validator-options",
  name: "form-buidler_validator-options",
  label: "Validators :",
  options: [
    new SelectBoxOption("Select a validator", ""),
    new SelectBoxOption("Required Validator", "required"),
    new SelectBoxOption("Regular Expression Validator", "regex"),
    new SelectBoxOption("Range Validator", "range")
  ]
}

export { componentSelectBoxProps,validatorSelectBoxProps }


