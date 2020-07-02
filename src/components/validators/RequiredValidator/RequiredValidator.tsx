import * as React from "react"
import BaseValidatorProps from "../BaseValidator.Props"
import { BaseValidator } from ".."
import { curry } from "../../../utils/helpers"

type validationCallback = (
  eleRef: React.MutableRefObject<HTMLInputElement | HTMLSelectElement>,
  setValidator: React.Dispatch<React.SetStateAction<boolean>>
) => boolean

const RequiredValidator: React.FC<{
  requiredValidatorProps: BaseValidatorProps
}> = (props) => {
   
  const [valid, setValidator] = React.useState(true)

  var callback = (args: Record<string, any>): boolean => {
    const { _target, _setValidator } = args
    let _isValid = false
    const _ele = _target.current
    if (_ele.type === "checkbox") _isValid = (_ele as HTMLInputElement).checked
    else _isValid = _ele.value.length > 0
    _setValidator(_isValid)
    return _isValid
  }

  
  props.requiredValidatorProps.validators[
    props.requiredValidatorProps.name
  ] = curry(callback, {
    _target: props.requiredValidatorProps.eleRef,
    _setValidator: setValidator,
  })

  props.requiredValidatorProps.valid = valid

  return (
    <BaseValidator
      baseValidator={props.requiredValidatorProps}
      children={props.children}
    />
  )
}

export default RequiredValidator
