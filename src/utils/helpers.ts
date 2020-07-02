import BaseComponentProps from "../components/basic-components/BaseComponent.Propts"
import { stringify } from "querystring"

function overrideProperty(
  props: any,
  propertyName: string,
  overrideValue: any
) {
  let { children, ...rest } = props
  for (let i in rest) {
    const item = rest[i]
    let propertyFound = false
    for (let z in item) {
      if (z === propertyName) {
        item[z] = overrideValue
        propertyFound = true
        break
      }
    }
    if (!propertyFound) item[propertyName] = overrideValue
  }
  return { children, ...rest }
}


const addFormDataSetterCallbackAndValidationMessage = (
  props: BaseComponentProps
) => {

  props.formDataSetters[props.name] = (formData) => formData.append(props.name, props.eleRef.current.value)

  if (props.valid) return;
  props.errorMessages[props.name] = props.validationMessage ?? "Something went wrong!"

}
type curryCallback = (args: Record<string, any>) => boolean
const curry = (callback: curryCallback, args: Record<string, any>) => () => callback(args)

// const createRangeValidatorCallback = (
//   max: number,
//   min: number,
//   eleRef: React.MutableRefObject<HTMLInputElement | HTMLSelectElement>,
//   setValidator: React.Dispatch<React.SetStateAction<boolean>>,
//   callback: (
//     _max: number,
//     _min: number,
//     _target: React.MutableRefObject<HTMLInputElement | HTMLSelectElement>,
//     _setValidator: React.Dispatch<React.SetStateAction<boolean>>
//   ) => boolean
// ) => {
//   return () => callback(max, min, eleRef, setValidator)
// }


export { overrideProperty, addFormDataSetterCallbackAndValidationMessage, curry }