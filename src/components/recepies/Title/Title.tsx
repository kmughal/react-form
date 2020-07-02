import TitleProps from "./Title.Props"
import {
  SelectBoxProps,
  SelectBoxOption,
  SelectBox,
} from "../../basic-components"
import { RequiredValidator } from "../../validators"
import BaseValidatorProps from "../../validators/BaseValidator.Props"

const Title: React.FC<{ titleProps: TitleProps }> = (props) => {
  let options = new Array<SelectBoxOption>(
    new SelectBoxOption(props.titleProps.placeholder, ""),
    new SelectBoxOption("Mr.", "mr"),
    new SelectBoxOption("Miss.", "miss"),
    new SelectBoxOption("Sir", "sir"),
    new SelectBoxOption("Dr.", "dr")
  )

  const titleSelectBoxProps: SelectBoxProps = {
    id: props.titleProps.id,
    name: props.titleProps.name,
    label: props.titleProps.label,
    placeholder: props.titleProps.placeholder,
    validationMessage: props.titleProps.validationMessage,
    options,
  }

  const titleRequiredProps: BaseValidatorProps = {
    name: "required_title",
    validators: props.titleProps.validators,
    eleRef: props.titleProps.eleRef,
    formDataSetters: props.titleProps.formDataSetters,
    errorMessages: props.titleProps.errorMessages,
    valid: props.titleProps.valid,
  }

  return (
    <RequiredValidator requiredValidatorProps={titleRequiredProps}>
      <SelectBox selectBoxProps={titleSelectBoxProps} />
    </RequiredValidator>
  )
}

export default Title
