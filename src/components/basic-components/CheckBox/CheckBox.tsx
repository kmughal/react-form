import * as React from "react"
import BaseComponentProps from "../BaseComponent.Propts"
import ValidationError from "../ValidationError"
import { addFormDataSetterCallback } from "../../../utils/helpers"

const CheckBox: React.FC<{ checkBoxProps: BaseComponentProps }> = ({
  checkBoxProps,
}) => {
  checkBoxProps.eleRef = checkBoxProps.eleRef ?? React.useRef(null)
  addFormDataSetterCallback(checkBoxProps)

  return (
    <div>
      {checkBoxProps.label + " "}
      <input
        type="checkbox"
        id={checkBoxProps.id}
        ref={checkBoxProps.eleRef as React.MutableRefObject<HTMLInputElement>}
        name={checkBoxProps.name}
        value={checkBoxProps.value}
      />
      <ValidationError
        valid={checkBoxProps.valid}
        message={checkBoxProps.validationMessage}
      />
    </div>
  )
}

export default CheckBox
