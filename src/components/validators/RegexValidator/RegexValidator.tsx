import RegexValidatorProps from "./RegexValidator.Props"

import * as React from "react"
import { curry } from "../../../utils/helpers"
import BaseValidator from "../BaseValidator/BaseValidator"

const RegexValidator: React.FC<{ regexValidatorProps: RegexValidatorProps }> = (
  props
) => {
  const [valid, setValidator] = React.useState(true)

  var callback = (args: Record<string, any>): boolean => {
    const { _target, _regExp, _setValidator } = args
    let _isValid = false
    const _ele = _target.current
    const _toInt = +_ele.value
    _isValid = _regExp.test(_ele.value)
    _setValidator(_isValid)
    return _isValid
  }

  const args = {
    _target: props.regexValidatorProps.eleRef,
    _setValidator: setValidator,
    _regExp: props.regexValidatorProps.regExp,
  }

  props.regexValidatorProps.validators[props.regexValidatorProps.name] = curry(
    callback,
    args
  )

  props.regexValidatorProps.valid = valid

  return (
    <BaseValidator
      baseValidator={props.regexValidatorProps}
      children={props.children}
    />
  )
}

export default RegexValidator
