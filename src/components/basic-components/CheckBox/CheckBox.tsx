import * as React from "react"
import BaseComponentProps from "../BaseComponent.Propts"
import ValidationError from "../ValidationError"
import {
  addFormDataSetterCallback,
  setupShowIfPresent,
  cloneChildrenForShowIf,
} from "../../../utils/helpers"

const CheckBox: React.FC<{ checkBoxProps: BaseComponentProps }> = ({
  checkBoxProps,
  children,
}) => {
  const isSetupShowIfPresent = setupShowIfPresent(checkBoxProps)
  if (isSetupShowIfPresent) return null

  checkBoxProps.eleRef = checkBoxProps.eleRef ?? React.useRef(null)
  addFormDataSetterCallback(checkBoxProps)

  return (
    <div>
      <label htmlFor={checkBoxProps.name}>{checkBoxProps.label + " "}</label>
      <input
        type="checkbox"
        id={checkBoxProps.id}
        ref={checkBoxProps.eleRef as React.MutableRefObject<HTMLInputElement>}
        name={checkBoxProps.name}
        value={checkBoxProps.value}
        aria-describedby={checkBoxProps.id + "_error"}
        onChange={(e) => {
          if (checkBoxProps.pubsub)
            checkBoxProps.pubsub.publish(checkBoxProps.name, {
              data: e.target.value,
            })
        }}
      />
      <ValidationError
        valid={checkBoxProps.valid}
        message={checkBoxProps.validationMessage}
      />
      {cloneChildrenForShowIf(children, checkBoxProps)}
    </div>
  )
}

export default CheckBox
