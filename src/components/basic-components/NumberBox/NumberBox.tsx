import * as React from "react"
import BaseComponentProps from "../BaseComponent.Propts"
import { addFormDataSetterCallback } from "../../../utils/helpers"
import ValidationError from "../ValidationError"

const NumberBox: React.FC<{ numberProps: BaseComponentProps }> = ({
  numberProps,
}) => {
  const refAsInputElement = numberProps.eleRef as React.MutableRefObject<
    HTMLInputElement
  >
  numberProps.eleRef = numberProps.eleRef ?? React.useRef(null)
  addFormDataSetterCallback(numberProps)

  return (
    <div>
      <label htmlFor={numberProps.name}>{numberProps.label}</label>
      <input
        type="text"
        ref={refAsInputElement}
        placeholder={numberProps.placeholder}
      />
      <ValidationError
        valid={numberProps.valid}
        message={numberProps.validationMessage}
      />
    </div>
  )
}

export default NumberBox
