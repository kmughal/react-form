import BaseComponentProps from '../BaseComponent.Props';
import SelectBoxOption from './SelectBoxOption';

export default interface SelectBoxProps extends BaseComponentProps {
  options: Array<SelectBoxOption>;
}
