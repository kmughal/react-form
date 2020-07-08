import { PubSub } from "../../basic-components/Form/Form.Props";

export default interface PlainMarkupProps {
  id: string;
  pubsub?: PubSub;
  eventName?: string;
  formDataSetters?: Record<string, ((formData: FormData) => void)>;
  validators?: Record<string, () => Array<string | boolean>>,
  eleRef?: React.MutableRefObject<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | HTMLTextAreaElement>,
  parentElementValue: (parentElementValue:any) => JSX.Element
}