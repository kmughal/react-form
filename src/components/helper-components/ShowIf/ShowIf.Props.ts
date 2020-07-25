import { PubSub, SetterFunc } from "../../basic-components/Form/Form.Props";

export default interface ShowIfProps {
  id: string;
  pubsub?: PubSub;
  eventName?: string;
  formDataSetters?: Record<string, SetterFunc>;
  validators?: Record<string, () => Array<string | boolean>>;
  eleRef?: React.MutableRefObject<
    | HTMLInputElement
    | HTMLSelectElement
    | HTMLTextAreaElement
    | HTMLTextAreaElement
  >;
}
