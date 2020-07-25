import * as React from "react";
import { SelectBoxOption } from ".";
import BaseComponentProps from "../BaseComponent.Props";
import render from "../../../../bin/render";
import { PubSub } from "../Form/Form.Props";
import SelectBox from "./SelectBox";
import SelectBoxProps from "./SelectBox.Props";

describe("SelectBox tests", () => {
  it("when title, id, name type must be selectbox", () => {
    const ddlSelectProps: SelectBoxProps = {
      id: "ddl_class",
      name: "ddl_class",
      label: "Select the class in which you are enrolled :",
      options: [
        new SelectBoxOption("Select class", ""),
        new SelectBoxOption("A", "a"),
        new SelectBoxOption("B", "b"),
      ],
    };
    const { getById, getAllByTagName } = render(
      <SelectBox selectBoxProps={ddlSelectProps} />
    );

    const ddlSelectBox = getById("ddl_class");
    expect(ddlSelectBox).attributeValueMustBeSame("name", "ddl_class");
    expect(ddlSelectBox).attributeValueMustBeSame("id", "ddl_class");

    const options = getAllByTagName("option");
    expect(options.length).toEqual(3);

    expect(options[0]).textContentEqual("Select class");
    expect(options[0]).valueMustBeEqual("");

    expect(options[1]).textContentEqual("A");
    expect(options[1]).valueMustBeEqual("a");

    expect(options[2]).textContentEqual("B");
    expect(options[2]).valueMustBeEqual("b");
  });

  it("should have a label", () => {
    const ddlSelectProps: SelectBoxProps = {
      id: "ddl_class",
      name: "ddl_class",
      label: "Select the class in which you are enrolled :",
      options: [
        new SelectBoxOption("Select class", ""),
        new SelectBoxOption("A", "a"),
        new SelectBoxOption("B", "b"),
      ],
    };
    const { getByTagName } = render(
      <SelectBox selectBoxProps={ddlSelectProps} />
    );
    const label = getByTagName("label");
    expect(label).not.toBeNull();
    expect(label).attributeValueMustBeSame("for", "ddl_class");
    expect(label).textContentEqual(
      "Select the class in which you are enrolled :"
    );
  });

  it("when value is specified then it must be selected", () => {
    const ddlSelectProps: SelectBoxProps = {
      id: "ddl_class",
      name: "ddl_class",
      label: "Select the class in which you are enrolled :",
      options: [
        new SelectBoxOption("Select class", ""),
        new SelectBoxOption("A", "a"),
        new SelectBoxOption("B", "b"),
      ],
      value: "a",
    };
    const { getById } = render(<SelectBox selectBoxProps={ddlSelectProps} />);

    const ddlSelectBox = getById("ddl_class");
    expect(ddlSelectBox).valueMustBeEqual("a");
  });

  it("when selected is true on an option then select value must be that value", () => {
    const ddlSelectProps: SelectBoxProps = {
      id: "ddl_class",
      name: "ddl_class",
      label: "Select the class in which you are enrolled :",
      options: [
        new SelectBoxOption("Select class", ""),
        new SelectBoxOption("A", "a"),
        new SelectBoxOption("B", "b", true),
      ],
    };
    const { getById } = render(<SelectBox selectBoxProps={ddlSelectProps} />);

    const ddlSelectBox = getById("ddl_class");
    expect(ddlSelectBox).valueMustBeEqual("b");
  });

  it("if value and selected are provided then value takes precedence", () => {
    const ddlSelectProps: SelectBoxProps = {
      id: "ddl_class",
      name: "ddl_class",
      label: "Select the class in which you are enrolled :",
      options: [
        new SelectBoxOption("Select class", ""),
        new SelectBoxOption("A", "a"),
        new SelectBoxOption("B", "b", true),
      ],
      value: "a",
    };
    const { getById } = render(<SelectBox selectBoxProps={ddlSelectProps} />);

    const ddlSelectBox = getById("ddl_class");
    expect(ddlSelectBox).valueMustBeEqual("a");
  });

  it("when valid is set to true then no error message should appear", () => {
    const ddlSelectProps: SelectBoxProps = {
      id: "ddl_class",
      name: "ddl_class",
      label: "Select the class in which you are enrolled :",
      options: [
        new SelectBoxOption("Select class", ""),
        new SelectBoxOption("A", "a"),
        new SelectBoxOption("B", "b", true),
      ],
      value: "a",
      validationMessage: "There is a problem",
      valid: true,
    };
    const { getByText } = render(<SelectBox selectBoxProps={ddlSelectProps} />);
    expect(getByText("There is a problem")).toBeFalsy();
  });

  it("when valid is set to false then error message should appear", () => {
    const ddlSelectProps: SelectBoxProps = {
      id: "ddl_class",
      name: "ddl_class",
      label: "Select the class in which you are enrolled :",
      options: [
        new SelectBoxOption("Select class", ""),
        new SelectBoxOption("A", "a"),
        new SelectBoxOption("B", "b", true),
      ],
      value: "a",
      validationMessage: "There is a problem",
      valid: false,
    };
    const { getByText } = render(<SelectBox selectBoxProps={ddlSelectProps} />);
    expect(getByText("There is a problem")).toBeTruthy();
  });

  it("when value is null then select box should not select something", () => {
    const ddlSelectProps: SelectBoxProps = {
      id: "ddl_class",
      name: "ddl_class",
      label: "Select the class in which you are enrolled :",
      options: [
        new SelectBoxOption("Select class", ""),
        new SelectBoxOption("A", "a"),
        new SelectBoxOption("B", "b"),
      ],
    };
    const { getByTagName } = render(
      <SelectBox selectBoxProps={ddlSelectProps} />
    );
    expect(getByTagName("select").value).toEqual("");
  });

  it("when pubsub is provided then after each value change it should fire an event", () => {
    const pubsub = new PubSub();
    const ddlSelectProps: SelectBoxProps = {
      id: "ddl_class",
      name: "ddl_class",
      label: "Select the class in which you are enrolled :",
      options: [
        new SelectBoxOption("Select class", ""),
        new SelectBoxOption("A", "a"),
        new SelectBoxOption("B", "b"),
      ],
      pubsub,
    };
    let counter = 0;
    pubsub.addSubscriber(ddlSelectProps.name, () => {
      counter++;
    });

    const { getByTagName, fireChangeEvent } = render(
      <SelectBox selectBoxProps={ddlSelectProps} />
    );
    const classSelectBox = getByTagName("select");

    fireChangeEvent(classSelectBox, "b");
    expect(counter).toEqual(1);
  });

  it("when pubsub is null then after each value change it should not fire an event", () => {
    const ddlSelectProps: SelectBoxProps = {
      id: "ddl_class",
      name: "ddl_class",
      label: "Select the class in which you are enrolled :",
      options: [
        new SelectBoxOption("Select class", ""),
        new SelectBoxOption("A", "a"),
        new SelectBoxOption("B", "b"),
      ],
    };
    let counter = 0;

    const { getByTagName, fireChangeEvent } = render(
      <SelectBox selectBoxProps={ddlSelectProps} />
    );
    const classSelectBox = getByTagName("select");

    fireChangeEvent(classSelectBox, "b");
    expect(counter).toEqual(0);
  });

  it("when showIfValue is true and showIfCallback is present then it should not render select box", () => {
    const ddlSelectProps: SelectBoxProps = {
      id: "ddl_class",
      name: "ddl_class",
      label: "Select the class in which you are enrolled :",
      options: [
        new SelectBoxOption("Select class", ""),
        new SelectBoxOption("A", "a"),
        new SelectBoxOption("B", "b"),
      ],
      showIfValue: true,
      showIfCallback: (_) => false,
    };

    const { getByTagName } = render(
      <SelectBox selectBoxProps={ddlSelectProps} />
    );
    const selectBox = getByTagName("select");

    expect(selectBox).toBeNull();
  });
});
