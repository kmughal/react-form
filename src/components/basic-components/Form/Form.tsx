import * as React from "react"

import FormProps, { PubSub } from "./Form.Props"
import { overrideProperty } from "../../../utils/helpers"

const ValidationSummary = ({ messages }) => {
  const markup = []
  let key = 0
  for (let message of messages) {
    let [fieldName, errorMessage] = Object.entries(message)[0]
    let [_, fieldId] = Object.entries(message)[1]

    markup.push(
      <li key={key++}>
        <a href={`${`#${fieldId}`}`} id={fieldId + "_error"}>
          {fieldName + "   " + errorMessage}
        </a>
      </li>
    )
  }
  return (
    <div role="alert">
      <h4>There are {markup.length} errors in this form</h4>

      <ul>{markup}</ul>
    </div>
  )
}

const Form: React.FC<{ formProps: FormProps }> = ({ formProps, children }) => {
  let _formData = null
  formProps.validators = {}
  formProps.formDataSetters = {}
  formProps.pubsub = new PubSub()

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
        validationSummaryResult.push({
          [vResult[1] as string]: vResult[2],
          fieldId: vResult[3],
        })
      }
    }

    setValidationSummary(validationSummaryResult)
    const anyValidationFailed = validatorResult.some((c) => !c)
    if (anyValidationFailed) {
      console.log("check result!")
    } else {
      _formData = _formData ?? new FormData()
     
      let plainJson:Record<string,string>
      for (let index in formProps.formDataSetters) {
        let setter = formProps.formDataSetters[index]
        let jsonResult = setter(_formData)
        if (jsonResult)  plainJson = {... plainJson ,... jsonResult}
      }
      formProps.submitForm(_formData, plainJson)
    }
    e.preventDefault()
    _formData = new FormData()
  }

  return (
    <>
      {formProps.heading && <h1>{formProps.heading}</h1>}
      <form onSubmit={submitHandler} name={formProps.name} id={formProps.id}>
        {formProps.showValidationSummary && validationSummary.length > 0 && (
          <ValidationSummary messages={validationSummary} />
        )}
        {React.Children.map(children as any, (child) => {
          
          let _props = child.props
          if (child.props.className?.startsWith("jsx")) return child;
          overrideProperty(_props, "eleRef", React.useRef(null))
          overrideProperty(_props, "validators", formProps.validators)
          overrideProperty(_props, "formDataSetters", formProps.formDataSetters)
          overrideProperty(_props, "pubsub", formProps.pubsub)

          return React.cloneElement(child, { ..._props })
        })}
      </form>
    </>
  )
}

export default Form
