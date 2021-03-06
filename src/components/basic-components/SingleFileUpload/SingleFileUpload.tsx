import * as React from 'react';
import SingleFileUploadProps from './SingleFileUpload.Props';
import {
  cloneChildrenForShowIf,
  bindValuePropertyIfProvided,
} from '../../../utils/helpers';
import ValidationError from '../ValidationError';

const SingleFileUpload: React.FC<{
  singleFileUploadProps: SingleFileUploadProps;
}> = ({ singleFileUploadProps, children }) => {
  singleFileUploadProps.eleRef =
    singleFileUploadProps.eleRef ?? React.useRef(null);

  singleFileUploadProps.formDataSetters[singleFileUploadProps.name] = (
    formData
  ) => {
    const fileControl = singleFileUploadProps.eleRef
      .current as HTMLInputElement;
    const file = fileControl.files[0];

    formData.append(
      'single_file',
      file,
      singleFileUploadProps.eleRef.current.value
    );
    return null;
  };

  const refAsInputElement = singleFileUploadProps.eleRef as React.MutableRefObject<
    HTMLInputElement
  >;

  const onBlurHandler = React.useCallback((e) => {
    if (
      singleFileUploadProps.enableInlineValidation &&
      singleFileUploadProps.runValidator
    )
      singleFileUploadProps.runValidator();
  }, []);

  bindValuePropertyIfProvided(
    singleFileUploadProps.value,
    singleFileUploadProps.pubsub,
    singleFileUploadProps.name,
    singleFileUploadProps.eleRef as React.MutableRefObject<HTMLInputElement>
  );

  return (
    <div>
      <label>{singleFileUploadProps.label}</label>
      <input
        type="file"
        ref={refAsInputElement}
        id={singleFileUploadProps.id}
        name={singleFileUploadProps.name}
        accept={singleFileUploadProps.accept}
        onBlur={onBlurHandler}
        onChange={(e) => {
          if (singleFileUploadProps.pubsub)
            singleFileUploadProps.pubsub.publish(singleFileUploadProps.name, {
              data: e.target.value,
            });
        }}
      />
      <ValidationError
        valid={singleFileUploadProps.valid}
        message={singleFileUploadProps.validationMessage}
      />
      {cloneChildrenForShowIf(children, singleFileUploadProps)}
    </div>
  );
};

export default SingleFileUpload;
