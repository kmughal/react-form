import * as React from "react"
import BaseComponentProps from "../BaseComponent.Propts"
import {
  addFormDataSetterCallback,
  setComponentValueIfProvided,
} from "../../../utils/helpers"
import ValidationError from "../ValidationError"

const Password: React.FC<{ passwordProps: BaseComponentProps }> = ({
  passwordProps,
}) => {

  passwordProps.eleRef = passwordProps.eleRef ?? React.useRef(null)
  const refAsInputElement = passwordProps.eleRef as React.MutableRefObject<
    HTMLInputElement
  >

  passwordProps.valid = passwordProps.valid ?? true
  addFormDataSetterCallback(passwordProps)
  setComponentValueIfProvided(passwordProps)

  return (
    <div>
      <label htmlFor={passwordProps.name}>{passwordProps.label}</label>
      <input
        type="password"
        ref={refAsInputElement}
        placeholder={passwordProps.placeholder}
        name={passwordProps.name}
        id={passwordProps.id}
      />
      <ValidationError
        valid={passwordProps.valid}
        message={passwordProps.validationMessage}
      />
    </div>
  )
}

export default Password
