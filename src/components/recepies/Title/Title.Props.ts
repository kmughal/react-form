import { SetterFunc } from "../../basic-components/Form/Form.Props";

export default interface TitleProps {
  name: string,
  id: string,
  label: string,
  placeholder: string,
  validationMessage: string,

  eleRef?: React.MutableRefObject<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
  valid?: boolean,
  formDataSetters?: Record<string, SetterFunc>;
  validators?: Record<string, () => []>,
}

