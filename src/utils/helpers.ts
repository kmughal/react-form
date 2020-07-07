import BaseComponentProps from "../components/basic-components/BaseComponent.Propts"
import { stringify } from "querystring"
import React from "react"

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
    props.formDataSetters[props.name] = (formData) => {
      formData.append(props.name, props.eleRef.current.value)
    }
}

const extractTheValidationMessageForSummary = children => {
  // const props = children.props
  // for (let prop in props) {
  //   let item = props[prop]
  //   if (item.validationMessage) return [item.label, item.validationMessage ?? "Something went wrong"]
  // }
  // return [null, null]

  const label = getPropertyValueFromReactComponentProps(children, "label")
  const validationMessage = getPropertyValueFromReactComponentProps(children, "validationMessage")
  return [label, validationMessage]
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


const setupShowIfPresent = props => {
  if (props.showIfValue) {
    if (props.showIfCallback) {
      const showIfResult = props.showIfCallback(props.showIfValue)
      if (!showIfResult) {
        if (props.formDataSetters[props.name]) {
          delete props.formDataSetters[props.name]
        }
        return true
      }
    }
  }
}

const cloneChildrenForShowIf = (children, props) => {
  return React.Children.map(children as any, (child, _) => {
    let _props = child.props
    overrideProperty(_props, "pubsub", props.pubsub)
    overrideProperty(_props, "eventName", props.name)
    overrideProperty(_props, "formDataSetters", props.formDataSetters)
    overrideProperty(_props, "showIfCallback", props.showIfCallback)
    overrideProperty(_props, "showIfValue", props.showIfValue)
    overrideProperty(_props, "validators", props.validators)
    overrideProperty(_props, "eleRef", props.eleRef)

    return React.cloneElement(child, { ..._props })
  })
}

export { overrideProperty, addFormDataSetterCallback, curry, setupShowIfPresent, cloneChildrenForShowIf }