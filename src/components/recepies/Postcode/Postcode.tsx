import { PostCodeProps } from "."
import {
  RegexValidatorProps,
  RegexValidator,
} from "../../validators/RegexValidator"
import { BaseComponentProps, TextBox } from "../../basic-components"

const PostCode: React.FC<{ postCodeProps: PostCodeProps }> = (props) => {
  const postCodeProps = props.postCodeProps
  const regexValidatorProps: RegexValidatorProps = {
    name: "required_postcode",

    validators: postCodeProps.validators,
    eleRef: postCodeProps.eleRef,
    formDataSetters: postCodeProps.formDataSetters,
    valid: postCodeProps.valid,
    regExp: new RegExp(
      "^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))s?[0-9][A-Za-z]{2})$"
    ),
  }

  const textBoxProps: BaseComponentProps = {
    id: postCodeProps.id,
    name: postCodeProps.name,
    label: postCodeProps.label,
    placeholder: postCodeProps.placeholder,
    validationMessage: postCodeProps.validationMessage,
  }

  return (
    <RegexValidator regexValidatorProps={regexValidatorProps}>
      <TextBox textBoxProps={textBoxProps} />
    </RegexValidator>
  )
}

export default PostCode
