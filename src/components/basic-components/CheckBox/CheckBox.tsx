import * as React from 'react';
import ValidationError from '../ValidationError';
import {
  addFormDataSetterCallback,
  cloneChildrenForShowIf,
  bindValuePropertyIfProvided,
} from '../../../utils/helpers';
import { CheckBoxProps } from '.';

const CheckBox: React.FC<{ checkBoxProps: CheckBoxProps }> = ({
  checkBoxProps,
  children,
}) => {
  checkBoxProps.eleRef = checkBoxProps.eleRef ?? React.useRef(null);
  addFormDataSetterCallback(checkBoxProps);

  const onBlurHandler = React.useCallback((e) => {
    if (checkBoxProps.enableInlineValidation && checkBoxProps.runValidator)
      checkBoxProps.runValidator();
  }, []);

  bindValuePropertyIfProvided(
    checkBoxProps.value,
    checkBoxProps.pubsub,
    checkBoxProps.name,
    checkBoxProps.eleRef as React.MutableRefObject<HTMLInputElement>
  );

  return (
    <div>
      <label htmlFor={checkBoxProps.name}>{checkBoxProps.label + ' '}</label>
      <input
        type="checkbox"
        id={checkBoxProps.id}
        ref={checkBoxProps.eleRef as React.MutableRefObject<HTMLInputElement>}
        name={checkBoxProps.name}
        value={checkBoxProps.value}
        aria-describedby={checkBoxProps.id + '_error'}
        checked={checkBoxProps.checked}
        onBlur={onBlurHandler}
        onChange={(e) => {
          if (checkBoxProps.pubsub)
            checkBoxProps.pubsub.publish(checkBoxProps.name, {
              data: e.target.value,
            });
        }}
      />
      <ValidationError
        valid={checkBoxProps.valid}
        message={checkBoxProps.validationMessage}
      />
      {cloneChildrenForShowIf(children, checkBoxProps)}
    </div>
  );
};

export default CheckBox;
