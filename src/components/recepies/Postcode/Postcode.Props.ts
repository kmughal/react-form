import BaseComponentProps from "../../basic-components/BaseComponent.Propts";
import { PubSub } from "../../basic-components/Form/Form.Props";

export default interface PostcodeProps {
  name: string,
  id: string,
  label: string,
  placeholder: string,
  validationMessage: string,

  eleRef?: React.MutableRefObject<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
  valid?: boolean,
  formDataSetters?: Record<string, ((formData: FormData) => void)>;
  validators?: Record<string, () => []>,
  
  showIfCallback?: (value: any) => boolean,
  showIfValue?: any,
  pubsub?: PubSub
}