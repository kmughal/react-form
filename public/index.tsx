import React from "react";
import { render } from "react-dom";
import { Form, FormProps, TextBox } from "./dist/cjs";

const App = () => {
  const formProps: FormProps = {
    heading: "Typescript Form",
    submitForm: (f) => console.log("good work"),
    showValidationSummary: true,
  };
  const textBoxProps: any = {
    label: "NAME",
    name: "name",
    id: "name",
    placeholder: "placeholder",
  };

  return (
    <Form formProps={formProps}>
      <TextBox textBoxProps={textBoxProps} />
      <div>
        <input type="submit" />
      </div>
    </Form>
  );
};

render(<App />, document.getElementById("app"));
