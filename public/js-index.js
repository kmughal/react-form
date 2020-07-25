import React from "react";
import { render } from "react-dom";
import { Form, RequiredValidator, TextBox } from "./build";

const App = () => {
  return (
    <Form
      formProps={{
        submitForm: (f) => console.log(f),
        showValidationSummary: true,
      }}
    >
      <RequiredValidator requiredValidatorProps={{ name: "name_required" }}>
        <TextBox
          textBoxProps={{
            label: "username",
            id: "username",
            name: "username",
            validationMessage: "give",
          }}
        />
      </RequiredValidator>
      <div>
        <input type="submit" />
      </div>
    </Form>
  );
};

render(<App />, document.getElementById("app"));
