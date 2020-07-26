import { SetterFunc } from '../../basic-components/Form/Form.Props';
import PubSub from '../../basic-components/Form/PubSub';

export default interface PlainMarkupProps {
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
  parentElementValue: (parentElementValue: any) => JSX.Element;
}
