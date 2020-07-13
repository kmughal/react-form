import * as React from "react"
import BaseValidatorProps from "../BaseValidator.Props"
import { BaseValidator } from ".."
import { curry } from "../../../utils/helpers"

const RequiredValidator: React.FC<{
  requiredValidatorProps: BaseValidatorProps
}> = (props) => {
  const [valid, setValidator] = React.useState(true)

  var callback = (args: Record<string, any>): Array<boolean | string> => {
    const {
      _target,
      _setValidator,
      _fieldName,
      _validationMessage,
      _fieldId,
    } = args
    let _isValid = false
    const _ele = _target.current
    if (!_ele) _isValid = false
    else if (_ele.type === "checkbox")
      _isValid = (_ele as HTMLInputElement).checked
    else _isValid = _ele.value.length > 0
    _setValidator(_isValid)
    return [_isValid, _fieldName, _validationMessage, _fieldId]
  }

  props.requiredValidatorProps.validators[
    props.requiredValidatorProps.name
  ] = curry(callback, {
    _setValidator: setValidator,
    _target: props.requiredValidatorProps.eleRef,
    _children: props.children,
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
