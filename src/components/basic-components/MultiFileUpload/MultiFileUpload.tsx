import * as React from 'react';

import { cloneChildrenForShowIf } from '../../../utils/helpers';
import BaseComponentProps from '../BaseComponent.Props';
import ValidationError from '../ValidationError';

const MultiFileUpload: React.FC<{
  multiFileUploadProps: BaseComponentProps;
}> = ({ children, multiFileUploadProps }) => {
  multiFileUploadProps.eleRef =
    multiFileUploadProps.eleRef ?? React.useRef(null);

  const multiFilesContainer = React.useRef(null);
  const containerStyle = {
    width: '98%',
    height: '400px',
    border: '2px dashed gray',
    textAlign: 'center' as const,
    lineHeight: '400px',
    fontSize: '18px',
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files?.length === 0) {
      throw new Error('No file attached');
    }

    multiFileUploadProps.eleRef.current = files[0];
    // For required validator!
    multiFileUploadProps.eleRef.current.value = files[0].name;

    multiFilesContainer.current.innerHTML = '';
    multiFilesContainer.current.style.lineHeight = '10px';

    const markup = [];
    const fileList = Array.from(files);
    fileList.forEach((file: any) => {
      markup.push(
        `<div style="background-color: #f1f1f1;margin: 10px; padding: 20px; font-size: 18px;">${file.name}</div>`
      );
    });
    multiFileUploadProps.formDataSetters[multiFileUploadProps.name] = (
      formData
    ) => {
      fileList.forEach((file: any, index: number) => {
        formData.append(`file_${index}`, file, file.name);
      });
      multiFileUploadProps.eleRef.current = null;
      return null;
    };

    multiFilesContainer.current.innerHTML = `<div style="display:flex;background-color: DodgerBlue">${markup.join(
      ''
    )}</div>`;
  };

  const onBlurHandler = React.useCallback((e) => {
    if (
      multiFileUploadProps.enableInlineValidation &&
      multiFileUploadProps.runValidator
    )
      multiFileUploadProps.runValidator();
  }, []);

  return (
    <>
      <div
        style={containerStyle}
        ref={multiFilesContainer}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onBlur={onBlurHandler}
      >
        Area to drop file(s)
      </div>
      <ValidationError
        valid={multiFileUploadProps.valid}
        message={multiFileUploadProps.validationMessage}
      />
      {cloneChildrenForShowIf(children, multiFileUploadProps)}
    </>
  );
};

export default MultiFileUpload;
