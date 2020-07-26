import { SetterFunc } from '../basic-components/Form/Form.Props';
import PubSub from '../basic-components/Form/PubSub';

export default interface BaseValidatorProps {
  name: string;
  eleRef?: React.MutableRefObject<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >;
  validators?: Record<string, () => Array<string | boolean>>;
  valid?: boolean;
  formDataSetters?: Record<string, SetterFunc>;

  pubsub?: PubSub;
  eventName?: string;
  showIfCallback?: (value: any) => boolean;
  showIfValue?: any;
}
