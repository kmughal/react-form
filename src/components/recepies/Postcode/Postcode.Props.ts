import BaseComponentProps from "../../basic-components/BaseComponent.Propts";

export default interface PostcodeProps {
  name: string,
  id: string,
  label: string,
  placeholder: string,
  validationMessage: string,

  eleRef?: React.MutableRefObject<HTMLInputElement | HTMLSelectElement>;
  valid?: boolean,
  formDataSetters?: Record<string, ((formData: FormData) => void)>;
  validators?: Record<string, () => []>,
}