
import {
  BaseComponentProps,
  Form,
  FormProps,
  NumberBox,
  SelectBox,
  TextBox,
} from "../components/basic-components"
import { ShowIf, ShowIfProps } from "../components/helper-components"
import Navigation from "./components/Navigation"
import {
  componentSelectBoxProps,
  validatorSelectBoxProps,
} from "./component-builder/FormBuilder.SelectBox.Props"
import React from "react"

function generateTemplate(
  type: string,
  name: string,
  label: string,
  placeholder: string,
  validatorMetaData: Record<string, string>
) {
  const metadata = {
    textbox: {
      typeProps: "BaseComponentProps",
      typeName: "TextBox",
      typePropsName: "textBoxProps",
    },
    range: (props: Record<string, string>) => `
  const validatorProps:RangeValidatorProps = { name : "${name}", max : ${props.max} , min : ${props.min} };
  <RangeValidator rangeValidatorProps={validatorProps}>`,
    regex: (props: Record<string, string>) => `
const validatorProps:RegexValidatorProps = { name : "${name}", regex : "${props.regex}" };
<RegexValidator rangeValidatorProps={validatorProps}>`,
    required: () =>
      `
const validatorProps:RequiredValidatorProps = { name : "${name}"};
<RequiredValidator rangeValidatorProps={validatorProps}>`,
    endrequired: () => "</RequiredValidator>",
    endrange: () => "</RangeValidator>",
    endregex: () => "</RegexValidator>",
  }

  let { typeProps, typeName, typePropsName } = metadata[type]

  const templateParts = []

  templateParts.push(`
const props:${typeProps} : {
  name : "${name}",
  id : "${name}",
  label : "${label}",
  placeholder : "${placeholder}"
};`)

  if (validatorMetaData)
    templateParts.push(metadata[validatorMetaData.name](validatorMetaData))
  templateParts.push(`    <${typeName} ${typePropsName}={props}/>`)
  if (validatorMetaData)
    templateParts.push(
      metadata["end" + validatorMetaData.name](validatorMetaData)
    )

  return templateParts.join("\n")
}

const showIfProps: ShowIfProps = { id: "component_selection" }

const componentName: BaseComponentProps = {
  id: "component-name",
  name: "component-name",
  label: "Id / Name:",
  showIfCallback: ({ data }) => {
    if (!data) return false
    return (
      data === "textbox" ||
      data === "password" ||
      data === "checkbox" ||
      data === "radio"
    )
  },
}

const labelName: BaseComponentProps = {
  id: "label-name",
  name: "label-name",
  label: "Label Text:",
  showIfCallback: ({ data }) => {
    if (!data) return false
    return (
      data === "textbox" ||
      data === "password" ||
      data === "checkbox" ||
      data === "radio"
    )
  },
}

const placeholderText: BaseComponentProps = {
  id: "placeholder-text",
  name: "placeholder-text",
  label: "Placeholder Text:",
  showIfCallback: ({ data }) => {
    if (!data) return false
    return (
      data === "textbox" ||
      data === "password" ||
      data === "checkbox" ||
      data === "radio"
    )
  },
}

const regexShowIf: ShowIfProps = { id: "regex-show-if" }
const rangeShowIf: ShowIfProps = { id: "range-show-if" }

const regExTextBoxProps: BaseComponentProps = {
  id: "regular-express-input",
  name: "regular-express-input",
  label: "Regular express :",
  placeholder: "Please provide a regular expression ...",
  showIfCallback: ({ data }) => {
    return data && data === "regex"
  },
}

const lowerBoundRangeProps: BaseComponentProps = {
  id: "range-lower-bound-input",
  name: "range-lower-bound-input",
  label: "Lower Bound / Min :",
  placeholder:
    "Please provide the lower bound / max number to apply range validator",
  showIfCallback: ({ data }) => {
    return data === "range"
  },
}

const upperBoundRangeProps: BaseComponentProps = {
  id: "range-upper-bound-input",
  name: "range-upper-bound-input",
  label: "Upper Bound / Max :",
  placeholder:
    "Please provide the upper bound / max number to apply range validator",
  showIfCallback: ({ data }) => {
    return data === "range"
  },
}

const FormBUilderPage = () => {
  const [template, setTemplate] = React.useState("")

  const formBuilderProps: FormProps = {
    submitForm: (_, plainJson) => {
      debugger
      const componentType = plainJson["form-builder_component-options"]
      const name = plainJson["component-name"]
      const label = plainJson["label-name"]
      const placeholder = plainJson["placeholder-text"]
      const validator = plainJson["form-buidler_validator-options"]
      let validatorMetaData = { name: validator }
      if ("range-lower-bound-input" in plainJson)
        validatorMetaData["min"] = plainJson["range-lower-bound-input"]
      if ("range-upper-bound-input" in plainJson)
        validatorMetaData["max"] = plainJson["range-upper-bound-input"]
      if ("regular-express-input" in plainJson)
        validatorMetaData["regex"] = plainJson["regular-express-input"]

      const templateString = generateTemplate(
        componentType,
        name,
        label,
        placeholder,
        validatorMetaData
      )
      setTemplate(templateString)
    },
  }

  return (
    <div>
     
      <Navigation />
      {template && <pre>{template}</pre>}
      <Form formProps={formBuilderProps}>
        <SelectBox selectBoxProps={componentSelectBoxProps}>
          <ShowIf showIfProps={showIfProps}>
            <TextBox textBoxProps={componentName} />
            <TextBox textBoxProps={labelName} />
            <TextBox textBoxProps={placeholderText} />
          </ShowIf>
        </SelectBox>

        <SelectBox selectBoxProps={validatorSelectBoxProps}>
          <ShowIf showIfProps={regexShowIf}>
            <TextBox textBoxProps={regExTextBoxProps} />
          </ShowIf>
          <ShowIf showIfProps={rangeShowIf}>
            <NumberBox numberProps={lowerBoundRangeProps} />
            <NumberBox numberProps={upperBoundRangeProps} />
          </ShowIf>
        </SelectBox>
        <div>
          <button>Generate Code</button>
        </div>
      </Form>
      <style jsx global>{`
       div {
         padding : 5px 5px;
         margin: 0px 0px;
       }
       label {
         position: relative;
         width: 150px;
         display:inline-block;
       }
       input[type=text] {
       padding: 5px 5px;
       display:inline-block;
       border:2px solid rgb(226, 232, 240);
       width: 300px
       }
      `}</style>
    </div>
    
  )
}

export default FormBUilderPage
