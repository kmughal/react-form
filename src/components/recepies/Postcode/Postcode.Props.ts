import BaseComponentProps from '../../basic-components/BaseComponent.Props';
import { SetterFunc } from '../../basic-components/Form/Form.Props';
import PubSub from '../../basic-components/Form/PubSub';

export default interface PostcodeProps {
  name: string;
  id: string;
  label: string;
  placeholder: string;
  validationMessage: string;

  eleRef?: React.MutableRefObject<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >;
  valid?: boolean;
  formDataSetters?: Record<string, SetterFunc>;
  validators?: Record<string, () => []>;

  showIfCallback?: (value: any) => boolean;
  showIfValue?: any;
  pubsub?: PubSub;
}
