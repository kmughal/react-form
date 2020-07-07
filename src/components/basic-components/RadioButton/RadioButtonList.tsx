import * as React from "react"
import { RadioButtonOption } from "./RadioButtonOption"
import { PubSub } from "../Form/Form.Props"

const RadioButtonList = (
  name: string,
  legend: string,
  radioButtonList: Array<RadioButtonOption>,
  eleRef: React.MutableRefObject<HTMLInputElement>,
  pubsub: PubSub
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
          aria-describedby={name + "_error"}
          onChange={e => {
            if (pubsub) pubsub.publish(name, { data: e.target.value })
          }}
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

 