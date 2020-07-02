import * as React from "react"
import BaseValidatorProps from "../BaseValidator.Props"
import { overrideProperty } from "../../../utils/helpers"

const BaseValidator: React.FC<{ baseValidator: BaseValidatorProps }> = (
  props
) => {

  return (
    <>
      {React.Children.map(props.children as any, (child, _) => {
       
        let _props = child.props
        overrideProperty(_props, "eleRef", props.baseValidator.eleRef)
        overrideProperty(_props, "valid", props.baseValidator.valid)
        overrideProperty(
          _props,
          "formDataSetters",
          props.baseValidator.formDataSetters
        )
        overrideProperty(
          _props,
          "errorMessages",
          props.baseValidator.errorMessages
        )
        return React.cloneElement(child, { ..._props })
      })}
    </>
  )
}

export default BaseValidator
