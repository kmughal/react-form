import * as React from "react"
import SelectBoxProps from "./SelectBox.Props"
import SelectBoxOption from "./SelectBoxOption"
import {
  addFormDataSetterCallback,
  overrideProperty,
  cloneChildrenForShowIf,
  setupShowIfPresent,
} from "../../../utils/helpers"
import ValidationError from "../ValidationError"

const SelectBox: React.FC<{ selectBoxProps: SelectBoxProps }> = ({
  children,
  selectBoxProps,
}) => {
  const isSetupShowIfPresent = setupShowIfPresent(selectBoxProps)
  if (isSetupShowIfPresent) return null

  selectBoxProps.eleRef = selectBoxProps.eleRef ?? React.useRef(null)
  addFormDataSetterCallback(selectBoxProps)

  const selectOptions = selectBoxProps.options.map(
    (option: SelectBoxOption, index: number) => (
      <option key={index} value={option.value} selected={option.selected}>
        {option.text}
      </option>
    )
  )

  return (
    <div>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {selectBoxProps.label}
      </label>
      <select
        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        ref={selectBoxProps.eleRef as React.MutableRefObject<HTMLSelectElement>}
        name={selectBoxProps.name}
        id={selectBoxProps.id}
        aria-describedby={selectBoxProps.id + "_error"}
        onChange={(e) => {
          if (selectBoxProps.pubsub) {
            selectBoxProps.pubsub.publish(selectBoxProps.name, {
              data: e.target.value,
            })
          }
        }}
      >
        {selectOptions}
      </select>
      <ValidationError
        valid={selectBoxProps.valid}
        message={selectBoxProps.validationMessage}
      />

      {cloneChildrenForShowIf(children, selectBoxProps)}
    </div>
  )
}

export default SelectBox
