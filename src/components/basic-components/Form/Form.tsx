import * as React from "react"

import FormProps from "./Form.Props"
import { overrideProperty } from "../../../utils/helpers"

const ValidationSummary = ({ messages }) => {
  const markup = []
  let key = 0
  for (let message of messages) {
    let [fieldName, errorMessage] = Object.entries(message)[0]
    markup.push(<li key={key++}>{fieldName + "   " + errorMessage}</li>)
  }
  return <ol>{markup}</ol>
}

const Form: React.FC<{ formProps: FormProps }> = ({ formProps, children }) => {
  let _formData = null
  formProps.validators = {}
  formProps.formDataSetters = {}
  formProps.errorMessages = {}

  const [validationSummary, setValidationSummary] = React.useState([])

  React.useEffect(() => {
    _formData = new FormData()
    return () => {
      // _formData = null
    }
  }, [_formData])

  const submitHandler = (e) => {
    const validatorResult = new Array<boolean>()

    const validators = formProps.validators
    const validationSummaryResult = []
    for (let index in validators) {
      let validator = validators[index]
      const vResult = validator()
      if (!vResult[0]) {
        validatorResult.push(false)
        validationSummaryResult.push({ [vResult[1] as string]: vResult[2] })
      }
    }

    setValidationSummary(validationSummaryResult)
    const anyValidationFailed = validatorResult.some((c) => !c)
    if (anyValidationFailed) {
      console.log("check result!")
    } else {
      _formData = _formData ?? new FormData()
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
        {formProps.showValidationSummary && validationSummary.length > 0 && (
          <ValidationSummary messages={validationSummary} />
        )}
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
