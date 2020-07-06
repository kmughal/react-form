import * as React from "react"
import SingleFileUploadProps from "./SingleFileUpload.Props"
import { addFormDataSetterCallback } from "../../../utils/helpers"
import ValidationError from "../ValidationError"

const SingleFileUpload: React.FC<{
  singleFileUploadProps: SingleFileUploadProps
}> = ({ singleFileUploadProps }) => {
  singleFileUploadProps.eleRef =
    singleFileUploadProps.eleRef ?? React.useRef(null)

  singleFileUploadProps.formDataSetters[singleFileUploadProps.name] = (
    formData
  ) => {
    const fileControl = singleFileUploadProps.eleRef.current as HTMLInputElement
    const file = fileControl.files[0]

    formData.append(
      "single_file",
      file,
      singleFileUploadProps.eleRef.current.value
    )
  }

  const refAsInputElement = singleFileUploadProps.eleRef as React.MutableRefObject<
    HTMLInputElement
  >

  return (
    <div>
      <label>{singleFileUploadProps.label}</label>
      <input
        type="file"
        ref={refAsInputElement}
        id={singleFileUploadProps.id}
        name={singleFileUploadProps.name}
        accept={singleFileUploadProps.accept}
      />
      <ValidationError
        valid={singleFileUploadProps.valid}
        message={singleFileUploadProps.validationMessage}
      />
    </div>
  )
}

export default SingleFileUpload
