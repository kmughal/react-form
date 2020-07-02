import * as React from "react"

import FormProps from "./Form.Props"
import { overrideProperty } from "../../../utils/helpers"

const Form: React.FC<{ formProps: FormProps }> = ({ formProps, children }) => {
  let _formData = null
  formProps.validators = {}
  formProps.formDataSetters = {}
  formProps.errorMessages = {}

  React.useEffect(() => {
    _formData = new FormData()
    return () => {
      // _formData = null
    }
  }, [_formData])

  const submitHandler = (e) => {
    const validatorResult = new Array<boolean>()

    const validators = formProps.validators
    for (let index in validators) {
      let validator = validators[index]
      validatorResult.push(validator())
    }
    const anyValidationFailed = validatorResult.some((c) => !c)
    if (anyValidationFailed) {
      console.log("check result!")
    } else {
      for (let index in formProps.formDataSetters) {
        let setter = formProps.formDataSetters[index]
        setter(_formData)
      }
      formProps.submitForm(_formData)
    }
    e.preventDefault()
    _formData = new FormData()
  }

  return (
    <>
      <form onSubmit={submitHandler} name={formProps.name} id={formProps.id}>
        {React.Children.map(children as any, (child) => {
          let _props = child.props

          overrideProperty(_props, "eleRef", React.useRef(null))
          overrideProperty(_props, "validators", formProps.validators)
          overrideProperty(_props, "formDataSetters", formProps.formDataSetters)
          overrideProperty(_props, "errorMessages", formProps.errorMessages)

          return React.cloneElement(child, { ..._props })
        })}
      </form>
    </>
  )
}

export default Form
