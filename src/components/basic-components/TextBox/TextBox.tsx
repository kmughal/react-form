import * as React from "react"
import BaseComponentProps from "../BaseComponent.Propts"
import ValidationError from "../ValidationError"
import { addFormDataSetterCallbackAndValidationMessage } from "../../../utils/helpers"

const TextBox: React.FC<{ textBoxProps: BaseComponentProps }> = ({
  textBoxProps,
  children,
}) => {
  
  const refAsInputElement = textBoxProps.eleRef as React.MutableRefObject<
    HTMLInputElement
  >
  textBoxProps.eleRef = textBoxProps.eleRef ?? React.useRef(null)
  textBoxProps.valid = textBoxProps.valid ?? true
  addFormDataSetterCallbackAndValidationMessage(textBoxProps)

  return (
    <div>
      <label htmlFor={textBoxProps.name}>{textBoxProps.label}</label>
      <input
        type="text"
        ref={refAsInputElement}
        placeholder={textBoxProps.placeholder}
      />
      <ValidationError
        valid={textBoxProps.valid}
        message={textBoxProps.validationMessage}
      />
    </div>
  )
}

export default TextBox
