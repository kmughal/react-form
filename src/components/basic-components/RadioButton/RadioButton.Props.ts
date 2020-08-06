import BaseComponentProps from '../BaseComponent.Props';
import RadioButtonOption from './RadioButtonOption';

interface RadioButtonProps extends BaseComponentProps {
  legend: string;
  radioButtonOptions: Array<RadioButtonOption>;
}

export default RadioButtonProps;
