import * as React from "react"
import BaseComponentProps from "../BaseComponent.Propts"
import RadioButtonProps from "./RadioButton.Props"
import { RadioButtonOption } from "./RadioButtonOption"
import ValidationError from "../ValidationError"
import RadioButtonList from "./RadioButtonList"
import { addFormDataSetterCallback } from "../../../utils/helpers"

const RadioButton: React.FC<{ radioButtonProps: RadioButtonProps }> = ({
  children,
  radioButtonProps,
}) => {

  radioButtonProps.eleRef = radioButtonProps.eleRef ?? React.useRef(null)
  addFormDataSetterCallback(radioButtonProps)
  
  const readioButtonList = RadioButtonList(
    radioButtonProps.name,
    radioButtonProps.radioButtonOptions,
    radioButtonProps.eleRef as React.MutableRefObject<HTMLInputElement>
  )

  return (
    <div>
      <input
        type="hidden"
        id={radioButtonProps.id}
        name={radioButtonProps.name}
        ref={
          radioButtonProps.eleRef as React.MutableRefObject<HTMLInputElement>
        }
      />
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {radioButtonProps.label}
      </label>
      {readioButtonList}
      <ValidationError
        valid={radioButtonProps.valid}
        message={radioButtonProps.validationMessage}
      />
    </div>
  )
}

export default RadioButton
