
interface BaseValidatorProps {
  name: string;
  eleRef?: React.MutableRefObject<HTMLInputElement | HTMLSelectElement>;
  validators?: Record<string, () => Array<string | boolean>>,
  valid?: boolean,
  formDataSetters?: Record<string, ((formData: FormData) => void)>;
}

export default BaseValidatorProps