import BaseComponentProps from "../BaseComponent.Propts";
import { RadioButtonOption } from "./RadioButtonOption";

interface RadioButtonProps extends BaseComponentProps {
  radioButtonOptions: Array<RadioButtonOption>
}

export default RadioButtonProps