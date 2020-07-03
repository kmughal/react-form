import * as React from "react"
import BaseComponentProps from "../BaseComponent.Propts"
import { addFormDataSetterCallback } from "../../../utils/helpers"
import ValidationError from "../ValidationError"

const Password: React.FC<{ passwordProps: BaseComponentProps }> = ({
  passwordProps,
}) => {
  const refAsInputElement = passwordProps.eleRef as React.MutableRefObject<
    HTMLInputElement
  >
  passwordProps.eleRef = passwordProps.eleRef ?? React.useRef(null)
  passwordProps.valid = passwordProps.valid ?? true
  addFormDataSetterCallback(passwordProps)

  return (
    <div>
      <label htmlFor={passwordProps.name}>{passwordProps.label}</label>
      <input
        type="password"
        ref={refAsInputElement}
        placeholder={passwordProps.placeholder}
      />
      <ValidationError
        valid={passwordProps.valid}
        message={passwordProps.validationMessage}
      />
    </div>
  )
}

export default Password
