import { PubSub, SetterFunc } from './Form/Form.Props';

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
  showIfCallback?: (value: any) => boolean;
  showIfValue?: any;
  pubsub?: PubSub;
  validatorName?: string;
}
