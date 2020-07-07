import * as React from "react"
import BaseComponentProps from "../BaseComponent.Propts"
import ValidationError from "../ValidationError"
import { addFormDataSetterCallback } from "../../../utils/helpers"
import MultilineTextBoxProps from "./MultilineTextBox.Props"

const MultilineTextBox: React.FC<{ multilineTextBoxProps: MultilineTextBoxProps }> = ({
  multilineTextBoxProps,
  children,
}) => {
  
  const refAsInputElement = multilineTextBoxProps.eleRef as React.MutableRefObject<
  HTMLTextAreaElement
  >
  multilineTextBoxProps.eleRef = multilineTextBoxProps.eleRef ?? React.useRef(null)
  multilineTextBoxProps.valid = multilineTextBoxProps.valid ?? true
  addFormDataSetterCallback(multilineTextBoxProps)

  return (
    <div>
      <label htmlFor={multilineTextBoxProps.name}>{multilineTextBoxProps.label}</label>
      <textarea
        rows={multilineTextBoxProps.rows}
        cols={multilineTextBoxProps.columns}
        ref={refAsInputElement}
        placeholder={multilineTextBoxProps.placeholder}
        onChange={e => {
          if (multilineTextBoxProps.pubsub)
          multilineTextBoxProps.pubsub.publish(multilineTextBoxProps.name, {
            data: e.target.value,
          })
        }}
      />
      <ValidationError
        valid={multilineTextBoxProps.valid}
        message={multilineTextBoxProps.validationMessage}
      />
    </div>
  )
}

export default MultilineTextBox
