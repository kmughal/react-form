export default interface BaseComponentProps {

  id: string;
  name: string;
  label: string;
  value?: string;
  placeholder?: string;
  eleRef?: React.MutableRefObject<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  valid?: boolean;
  validationMessage?: string;
  formDataSetters?: Record<string, ((formData: FormData) => void)>;
  onChange?: (event: HTMLElement) => void
}