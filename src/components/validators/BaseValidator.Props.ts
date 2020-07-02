
interface BaseValidatorProps {
  name: string;
  eleRef?: React.MutableRefObject<HTMLInputElement | HTMLSelectElement>;
  validators?: Record<string, () => boolean>,
  valid?: boolean,
  formDataSetters?: Record<string, ((formData: FormData) => void)>;
  errorMessages?: Record<string, string>
}
 
export default BaseValidatorProps