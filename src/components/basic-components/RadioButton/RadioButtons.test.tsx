import * as React from "react"
import { RadioButton } from ".."
import render from "../../../../bin/render"
import RadioButtonProps from "./RadioButton.Props"
import { RadioButtonOption } from "./RadioButtonOption"

describe("RadioButton tests", () => {
  it("when title, id, name, placeholder & type must be number", () => {
    const props: RadioButtonProps = {
      id: "txt-RadioButton",
      name: "opt_types",
      placeholder: "Select",
      label: "RadioButton :",

      radioButtonOptions: [
        new RadioButtonOption("option 1", "option_1"),
        new RadioButtonOption("option 2", "option_2"),
      ],
      legend: "Radio button example",
    }
    const { getAllByTagName, triggerEvent, document } = render(
      <RadioButton radioButtonProps={props} />
    )

    let opts = getAllByTagName("radio")
    const opt1 = opts[0]
    triggerEvent("click", opt1)
    expect(opt1.checked).toBeTruthy()
    expect(opt1).attributeValueMustBeSame("name", "opt_types")
    expect(opt1).attributeValueMustBeSame("id", "opt_types_0")
    expect(props.eleRef.current.value).toEqual("option_1")
  })
})
