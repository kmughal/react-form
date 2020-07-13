import * as React from "react"
import RadioButtonProps from "./RadioButton.Props"
import ValidationError from "../ValidationError"
import RadioButtonList from "./RadioButtonList"
import { addFormDataSetterCallback, cloneChildrenForShowIf, setComponentValueIfProvided, setupShowIfPresent } from "../../../utils/helpers"

const RadioButton: React.FC<{ radioButtonProps: RadioButtonProps }> = ({
  children,
  radioButtonProps,
}) => {

  const isSetupShowIfPresent = setupShowIfPresent(radioButtonProps)
  if (isSetupShowIfPresent) return null

  radioButtonProps.eleRef = radioButtonProps.eleRef ?? React.useRef(null)
  addFormDataSetterCallback(radioButtonProps)
 
  const checkedOption = radioButtonProps.radioButtonOptions.filter(x => x.checked)
  if (checkedOption.length > 0) radioButtonProps.value = checkedOption[0].value
  
  setComponentValueIfProvided(radioButtonProps)
  
  const readioButtonList = RadioButtonList(
    radioButtonProps.name,
    radioButtonProps.legend,
    radioButtonProps.radioButtonOptions,
    radioButtonProps.eleRef as React.MutableRefObject<HTMLInputElement>,
    radioButtonProps.pubsub
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
      {/* <label className="block text-gray-700 text-sm font-bold mb-2">
        {radioButtonProps.label}
      </label> */}
      {readioButtonList}
      <ValidationError
        valid={radioButtonProps.valid}
        message={radioButtonProps.validationMessage}
      />
      {cloneChildrenForShowIf(children, radioButtonProps)}
    </div>
  )
}

export default RadioButton
