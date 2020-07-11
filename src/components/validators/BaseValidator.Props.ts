import { PubSub, SetterFunc } from "../basic-components/Form/Form.Props";

interface BaseValidatorProps {
  name: string;
  eleRef?: React.MutableRefObject<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
  validators?: Record<string, () => Array<string | boolean>>,
  valid?: boolean,
  formDataSetters?: Record<string, SetterFunc>;

  pubsub?: PubSub;
  eventName?: string;
  showIfCallback?: (value: any) => boolean,
  showIfValue?: any,
}

export default BaseValidatorProps