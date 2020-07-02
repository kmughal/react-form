import * as React from "react"
import { RadioButtonOption } from "./RadioButtonOption"

const RadioButtonList = (
  name: string,
  radioButtonList: Array<RadioButtonOption>,
  eleRef: React.MutableRefObject<HTMLInputElement>
) => {
  const markSelection = (event: React.MouseEvent<HTMLInputElement>) =>
    (eleRef.current.value = (event.target as HTMLInputElement).value)

  const result = radioButtonList.map((rd: RadioButtonOption, index: number) => {
    return (
      <div key={index}>
        <input
          type="radio"
          id={`${name}_{index}`}
          name={name}
          value={rd.value}
          onClick={markSelection}
        />
        {"  " + rd.text}
      </div>
    )
  })

  return <>{result}</>
}

export default RadioButtonList
