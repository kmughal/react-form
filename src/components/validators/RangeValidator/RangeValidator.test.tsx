import React from "react";
import { RangeValidatorProps } from ".";
import render from "../../../../bin/render";
import { Form, FormProps, NumberBox } from "../../basic-components";
import BaseComponentProps from "../../basic-components/BaseComponent.Props";
import RangeValidator from "./RangeValidator";

describe("RegEx Validator - ", () => {
  it("Html Input elements must be validated ", () => {
    const formProps: FormProps = {
      submitForm: () => {},
    };
    const rangeValidatorProps: RangeValidatorProps = {
      name: "required_props",
      max: 5000,
      min: 1000,
    };
    const salaryTextBoxProps: BaseComponentProps = {
      id: "txt-salary",
      name: "txt-salary",
      label: "Salary :",
      placeholder: "Enter Salary :",
      validationMessage: "Salary must be between $1000 - $5000",
    };
    const dom = render(
      <Form formProps={formProps}>
        <RangeValidator rangeValidatorProps={rangeValidatorProps}>
          <NumberBox numberProps={salaryTextBoxProps} />
        </RangeValidator>
        <button>Sumit</button>
      </Form>
    );

    const {
      getByTagName,
      triggerEvent,
      getByText,
      typeElementText,
      getById,
    } = dom;

    const salaryBox = getById("txt-salary");
    typeElementText(salaryBox, 700);

    const submitButton = getByTagName("button");

    triggerEvent("submit", submitButton);
    const messageAppeared = getByText("Salary must be between $1000 - $5000");
    expect(messageAppeared).toBeTruthy();
  });

  it("valid , validators should not be null", () => {
    const formProps: FormProps = {
      submitForm: () => {},
    };
    const rangeValidatorProps: RangeValidatorProps = {
      name: "required_props",
      max: 5000,
      min: 1000,
    };
    const salaryTextBoxProps: BaseComponentProps = {
      id: "txt-salary",
      name: "txt-salary",
      label: "Salary :",
      placeholder: "Enter Salary :",
      validationMessage: "Salary must be between $1000 - $5000",
    };
    render(
      <Form formProps={formProps}>
        <RangeValidator rangeValidatorProps={rangeValidatorProps}>
          <NumberBox numberProps={salaryTextBoxProps} />
        </RangeValidator>
        <button>Sumit</button>
      </Form>
    );

    expect(
      rangeValidatorProps.validators[salaryTextBoxProps.name]
    ).not.toBeNull();
    expect(rangeValidatorProps.valid).not.toBeNull();
    expect(rangeValidatorProps.valid).toBeTruthy();
  });
});
