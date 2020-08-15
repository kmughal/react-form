import * as React from 'react';
import ValidationError from '../ValidationError';
import {
  addFormDataSetterCallback,
  cloneChildrenForShowIf,
  setComponentValueIfProvided,
} from '../../../utils/helpers';
import MultilineTextBoxProps from './MultilineTextBox.Props';
import { MutableRefObject } from 'react';

const MultilineTextBox: React.FC<{
  multilineTextBoxProps: MultilineTextBoxProps;
}> = ({ multilineTextBoxProps, children }) => {
  multilineTextBoxProps.eleRef = multilineTextBoxProps.eleRef as React.MutableRefObject<
    HTMLTextAreaElement
  >;
  multilineTextBoxProps.eleRef =
    multilineTextBoxProps.eleRef ?? React.useRef(null);
  multilineTextBoxProps.valid = multilineTextBoxProps.valid ?? true;
  addFormDataSetterCallback(multilineTextBoxProps);
  setComponentValueIfProvided(multilineTextBoxProps);

  const onBlurHandler = React.useCallback((e) => {
    if (
      multilineTextBoxProps.enableInlineValidation &&
      multilineTextBoxProps.runValidator
    )
      multilineTextBoxProps.runValidator();
  }, []);

  return (
    <div>
      <label htmlFor={multilineTextBoxProps.name}>
        {multilineTextBoxProps.label}
      </label>
      <textarea
        id={multilineTextBoxProps.id}
        name={multilineTextBoxProps.name}
        rows={multilineTextBoxProps.rows}
        cols={multilineTextBoxProps.columns}
        ref={
          multilineTextBoxProps.eleRef as MutableRefObject<HTMLTextAreaElement>
        }
        placeholder={multilineTextBoxProps.placeholder}
        onBlur={onBlurHandler}
        onChange={(e) => {
          if (multilineTextBoxProps.pubsub)
            multilineTextBoxProps.pubsub.publish(multilineTextBoxProps.name, {
              data: e.target.value,
            });
        }}
      />
      <ValidationError
        valid={multilineTextBoxProps.valid}
        message={multilineTextBoxProps.validationMessage}
      />
      {cloneChildrenForShowIf(children, multilineTextBoxProps)}
    </div>
  );
};

export default MultilineTextBox;
