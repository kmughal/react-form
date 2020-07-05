import BaseComponentProps from "../components/basic-components/BaseComponent.Propts"
import { stringify } from "querystring"

function overrideProperty(
  props: any,
  propertyName: string,
  overrideValue: any
) {
  let { children, ...rest } = props
  for (let i in rest) {
    const item = rest[i]
    let propertyFound = false
    for (let z in item) {
      if (z === propertyName) {
        item[z] = overrideValue
        propertyFound = true
        break
      }
    }
    if (!propertyFound) item[propertyName] = overrideValue
  }
  return { children, ...rest }
}


const addFormDataSetterCallback = (
  props: BaseComponentProps
) => {
  if (props.formDataSetters)
    props.formDataSetters[props.name] = (formData) => formData.append(props.name, props.eleRef.current.value)
}

const extractTheValidationMessageForSummary = children => {
  // const props = children.props
  // for (let prop in props) {
  //   let item = props[prop]
  //   if (item.validationMessage) return [item.label, item.validationMessage ?? "Something went wrong"]
  // }
  // return [null, null]

  const label = getPropertyValueFromReactComponentProps(children,"label")
  const validationMessage = getPropertyValueFromReactComponentProps(children, "validationMessage")
  return [label,validationMessage]
}

const extractTheIdOfFailedField = children => {
  const result = getPropertyValueFromReactComponentProps(children, "id")
  return result
}

function getPropertyValueFromReactComponentProps(
  children: any,
  propertyName: string) {

  const props = children.props
  for (let prop in props) {
    let item = props[prop]
    if (item[propertyName]) return item[propertyName]
  }
  return null
}

type curryCallback = (args: Record<string, any>) => Array<boolean | string>
const curry = (callback: curryCallback, args: Record<string, any>) => {
  const [fieldName, validationMessage] = extractTheValidationMessageForSummary(args._children)
  const fieldId = extractTheIdOfFailedField(args._children)
  args._fieldName = fieldName
  args._validationMessage = validationMessage,
  args._fieldId = fieldId
  return () => callback(args)
}

export { overrideProperty, addFormDataSetterCallback, curry }