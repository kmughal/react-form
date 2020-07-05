import * as React from "react"
import { RadioButtonOption } from "./RadioButtonOption"

const RadioButtonList = (
  name: string,
  legend: string,
  radioButtonList: Array<RadioButtonOption>,
  eleRef: React.MutableRefObject<HTMLInputElement>
) => {
  const markSelection = (event: React.MouseEvent<HTMLInputElement>) =>
    (eleRef.current.value = (event.target as HTMLInputElement).value)

  const result = radioButtonList.map((rd: RadioButtonOption, index: number) => {
    const _id = `${name.replace(" ", "_")}_${index}`
    return (
      <div key={index}>
        <input
          type="radio"
          id={_id}
          name={name}
          value={rd.value}
          onClick={markSelection}
        />
        <label htmlFor={_id}>{rd.text}</label>
      </div>
    )
  })

  return (
    <fieldset>
      <legend>{legend}</legend>
      {result}
    </fieldset>
  )
}

export default RadioButtonList
