import * as React from "react"
import { SelectBoxOption } from "."
import { BaseComponentProps, TextBox } from ".."
import render from "../../../../bin/render"
import SelectBox from "./SelectBox"
import SelectBoxProps from "./SelectBox.Props"

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
    }
    const { getById, getAllByTagName } = render(
      <SelectBox selectBoxProps={ddlSelectProps} />
    )

    const ddlSelectBox = getById("ddl_class")
    expect(ddlSelectBox).attributeValueMustBeSame("name", "ddl_class")
    expect(ddlSelectBox).attributeValueMustBeSame("id", "ddl_class")

    const options = getAllByTagName("option")
    expect(options.length).toEqual(3)

    expect(options[0]).textContentEqual("Select class")
    expect(options[0]).valueMustBeEqual("")

    expect(options[1]).textContentEqual("A")
    expect(options[1]).valueMustBeEqual("a")

    expect(options[2]).textContentEqual("B")
    expect(options[2]).valueMustBeEqual("b")
  })

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
    }
    const { getByTagName } = render(
      <SelectBox selectBoxProps={ddlSelectProps} />
    )
    const label = getByTagName("label")
    expect(label).not.toBeNull()
    expect(label).attributeValueMustBeSame("for", "ddl_class")
    expect(label).textContentEqual(
      "Select the class in which you are enrolled :"
    )
  })

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
    }
    const { getById } = render(<SelectBox selectBoxProps={ddlSelectProps} />)

    const ddlSelectBox = getById("ddl_class")
    expect(ddlSelectBox).valueMustBeEqual("a")
  })

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
    }
    const { getById } = render(<SelectBox selectBoxProps={ddlSelectProps} />)

    const ddlSelectBox = getById("ddl_class")
    expect(ddlSelectBox).valueMustBeEqual("b")
  })

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
    }
    const { getById } = render(<SelectBox selectBoxProps={ddlSelectProps} />)

    const ddlSelectBox = getById("ddl_class")
    expect(ddlSelectBox).valueMustBeEqual("a")
  })

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
    }
    const { getByText } = render(<SelectBox selectBoxProps={ddlSelectProps} />)
    expect(getByText("There is a problem")).toBeFalsy()
  })

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
    }
    const { getByText } = render(<SelectBox selectBoxProps={ddlSelectProps} />)
    expect(getByText("There is a problem")).toBeTruthy()
  })

  // describe(" valid flag ", () => {
  //   it("when set to true then we are not expecting validation message", () => {
  //     const textBoxProps: BaseComponentProps = {
  //       id: "txt_name",
  //       name: "name",
  //       placeholder: "placeholder",
  //       label: "Name :",
  //       valid: true,
  //       validationMessage: "Error message",
  //     }
  //     const { getByText } = render(<TextBox textBoxProps={textBoxProps} />)
  //     expect(getByText("Error Message")).toBeFalsy()
  //   })

  //   it("when set to false then we are expecting validation message", () => {
  //     const textBoxProps: BaseComponentProps = {
  //       id: "txt_name",
  //       name: "name",
  //       placeholder: "placeholder",
  //       label: "Name :",
  //       valid: false,
  //       validationMessage: "Name is not valid",
  //     }
  //     const { getByText } = render(<TextBox textBoxProps={textBoxProps} />)

  //     expect(getByText("Name is not valid")).toBeTruthy()
  //   })
  // })
})
