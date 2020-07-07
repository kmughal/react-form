import BaseComponentProps from "../BaseComponent.Propts"
import SelectBoxOption from "./SelectBoxOption"
import { PubSub } from "../Form/Form.Props"

interface SelectBoxProps extends BaseComponentProps {
  options: Array<SelectBoxOption>
}

export default SelectBoxProps
