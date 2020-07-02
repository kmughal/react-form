import BaseComponentProps from "../BaseComponent.Propts"
import SelectBoxOption from "./SelectBoxOption"

interface SelectBoxProps extends BaseComponentProps {
  options: Array<SelectBoxOption>,
}

export default SelectBoxProps