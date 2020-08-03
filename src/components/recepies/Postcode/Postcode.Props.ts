import BaseComponentProps from '../../basic-components/BaseComponent.Props';
import { SetterFunc } from '../../basic-components/Form/Form.Props';
import PubSub from '../../basic-components/Form/PubSub';

export default interface PostcodeProps extends BaseComponentProps {
  validators?: Record<string, () => []>;
}
