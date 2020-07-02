import * as React from "react"
import { BaseValidator } from ".."
import { curry } from "../../../utils/helpers"
import RangeValidatorProps from "./RangeValidator.Props"

type validationCallback = (
  eleRef: React.MutableRefObject<HTMLInputElement | HTMLSelectElement>,
  setValidator: React.Dispatch<React.SetStateAction<boolean>>
) => boolean

const RangeValidator: React.FC<{
  rangeValidatorProps: RangeValidatorProps
}> = (props) => {
  const [valid, setValidator] = React.useState(true)

  var callback = (args: Record<string, any>): boolean => {
    const { _setValidator, _target, _max, _min } = args
    let _isValid = false
    const _ele = _target.current
    const _toInt = +_ele.value
    _isValid = _max >= _toInt && _toInt >= _min
    _setValidator(_isValid)
    return _isValid
  }

  props.rangeValidatorProps.validators[props.rangeValidatorProps.name] = curry(
    callback,
    {
      _max: props.rangeValidatorProps.max,
      _min: props.rangeValidatorProps.min,
      _target: props.rangeValidatorProps.eleRef,
      _setValidator: setValidator,
    }
  )
  props.rangeValidatorProps.valid = valid

  return (
    <BaseValidator
      baseValidator={props.rangeValidatorProps}
      children={props.children}
    />
  )
}

export default RangeValidator
