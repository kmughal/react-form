
export default interface TitleProps {
  name: string,
  id: string,
  label: string,
  placeholder: string,
  validationMessage: string,

  eleRef?: React.MutableRefObject<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
  valid?: boolean,
  formDataSetters?: Record<string, ((formData: FormData) => void)>;
  validators?: Record<string, () => []>,
}

