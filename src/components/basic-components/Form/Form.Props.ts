import PubSub from './PubSub';

export type SetterFunc = (formData: FormData) => Record<string, string>;

interface FormProps {
  heading?: string;
  showValidationSummary?: boolean;
  name?: string;
  id?: string;
  submitForm: (formData: FormData, plainJson: Record<string, string>) => void;
  validators?: Record<string, () => Array<string | boolean>>;
  formDataSetters?: Record<string, SetterFunc>;
  pubsub?: PubSub;
  enableOffline?: boolean;
  enableInlineValidation?: boolean;
}

export default FormProps;
