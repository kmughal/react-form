import { SetterFunc } from './Form/Form.Props';
import PubSub from './Form/PubSub';

export default class BaseComponentProps {
  id: string;
  name: string;
  label: string;
  value?: string;
  placeholder?: string;
  eleRef?: React.MutableRefObject<
    | HTMLInputElement
    | HTMLSelectElement
    | HTMLTextAreaElement
    | HTMLTextAreaElement
  >;
  valid?: boolean;
  validationMessage?: string;
  formDataSetters?: Record<string, SetterFunc>;
  showIfValue?: any;
  pubsub?: PubSub;
  validatorName?: string;
  runValidator?: () => void;
  enableInlineValidation?: boolean;
}
