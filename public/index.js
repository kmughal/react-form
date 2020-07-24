import React from "react"
import { render } from "react-dom"
import { TextBox ,Form} from "./build/index"
 
 

const App = () => {
  
  const formProps = {
    showValidationSummary: true,
    submitForm: (formData) => {
      console.log("login")
    },
  }
  const textBoxProps = {
    label: "Username",
    name: "user-name",
    id: "user-name",
    placeholder: "Provide Username",
    validationMessage: "Please provide username",
  }

  return (
    <Form formProps={formProps}>
    <TextBox textBoxProps={textBoxProps} />
     
    <div className="button-container">
     <input type="submit"/>
    </div>
  </Form>
    
  )
}



render(<App />, document.getElementById("app"))
