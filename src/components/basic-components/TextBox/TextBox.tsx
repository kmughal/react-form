import * as React from "react"
import BaseComponentProps from "../BaseComponent.Propts"
import ValidationError from "../ValidationError"
import { addFormDataSetterCallback, setupShowIfPresent, cloneChildrenForShowIf } from "../../../utils/helpers"

const TextBox: React.FC<{ textBoxProps: BaseComponentProps }> = ({
  textBoxProps,
  children,
}) => {
  
  
  const isSetupShowIfPresent = setupShowIfPresent(textBoxProps)
  if (isSetupShowIfPresent) return null

  textBoxProps.eleRef = textBoxProps.eleRef ?? React.useRef(null)
  const refAsInputElement = textBoxProps.eleRef as React.MutableRefObject<
    HTMLInputElement
  >

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
          if (textBoxProps.onChange) {
            textBoxProps.onChange(e.target)
          }
          console.log(e.target.value)
          //if (textBoxProps.eleRef && textBoxProps.eleRef.current)
          textBoxProps.eleRef.current.value += e.target.value
        }}
        aria-describedby={textBoxProps.id + "_error"}
      />
      <ValidationError
        valid={textBoxProps.valid}
        message={textBoxProps.validationMessage}
      />
       {cloneChildrenForShowIf(children, textBoxProps)}
    </div>
  )
}

export default TextBox
