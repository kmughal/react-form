import * as React from "react"
import BaseComponentProps from "../BaseComponent.Propts"
import ValidationError from "../ValidationError"
import { addFormDataSetterCallback } from "../../../utils/helpers"

const TextBox: React.FC<{ textBoxProps: BaseComponentProps }> = ({
  textBoxProps,
  children,
}) => {
  const refAsInputElement = textBoxProps.eleRef as React.MutableRefObject<
    HTMLInputElement
  >
  textBoxProps.eleRef = textBoxProps.eleRef ?? React.useRef(null)
  textBoxProps.valid = textBoxProps.valid ?? true
  addFormDataSetterCallback(textBoxProps)

  return (
    <div>
      <label htmlFor={textBoxProps.name}>{textBoxProps.label}</label>
      <input
        id={textBoxProps.id}
        name={textBoxProps.name}
        type="text"
        ref={refAsInputElement}
        placeholder={textBoxProps.placeholder}
        value={textBoxProps.value ?? ""}
        onChange={(e) => {
          console.log("change_event")
        }}
        aria-describedby={textBoxProps.id + "_error"}
      />
      <ValidationError
        valid={textBoxProps.valid}
        message={textBoxProps.validationMessage}
      />
    </div>
  )
}

export default TextBox
