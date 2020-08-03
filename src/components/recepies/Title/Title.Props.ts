import BaseComponentProps from '../../basic-components/BaseComponent.Props';
import { SetterFunc } from '../../basic-components/Form/Form.Props';

export default interface TitleProps extends BaseComponentProps {
  validators?: Record<string, () => []>;
}
