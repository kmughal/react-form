export default interface BaseComponentProps {

  id: string;
  name: string;
  label: string;
  value?: string;
  placeholder?: string;
  eleRef?: React.MutableRefObject<HTMLInputElement | HTMLSelectElement>
  valid?: boolean;
  validationMessage?: string;
  formDataSetters?: Record<string, ((formData: FormData) => void)>;
  errorMessages?: Record<string, string>
}