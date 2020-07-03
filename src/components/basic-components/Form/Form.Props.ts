
interface FormProps {
  enableOfflineFeature?: boolean;
  showValidationSummary?: boolean;
  name?: string;
  id?: string;
  submitForm: (formData: FormData) => void;
  validators?: Record<string, () => Array<string|boolean>>,
  formDataSetters?: Record<string, ((formData: FormData) => void)>;
  errorMessages?: Record<string, string>
}

export default FormProps