import * as React from 'react';
import BaseComponentProps from '../BaseComponent.Props';
import ValidationError from '../ValidationError';

import {
  addFormDataSetterCallback,
  setupShowIfPresent,
  cloneChildrenForShowIf,
  setComponentValueIfProvided,
} from '../../../utils/helpers';

const TextBox: React.FC<{ textBoxProps: BaseComponentProps }> = ({
  textBoxProps,
  children,
}) => {
  const isSetupShowIfPresent = setupShowIfPresent(textBoxProps);
  if (isSetupShowIfPresent) return null;

  textBoxProps.eleRef = textBoxProps.eleRef ?? React.useRef(null);
  const refAsInputElement = textBoxProps.eleRef as React.MutableRefObject<
    HTMLInputElement
  >;

  textBoxProps.valid = textBoxProps.valid ?? true;
  addFormDataSetterCallback(textBoxProps);

  setComponentValueIfProvided(textBoxProps);

  const onBlurHandler = React.useCallback((e) => {
    if (textBoxProps.enableInlineValidation && textBoxProps.runValidator)
      textBoxProps.runValidator();
  }, []);

  return (
    <div>
      <label htmlFor={textBoxProps.name}>{textBoxProps.label}</label>
      <input
        id={textBoxProps.id}
        name={textBoxProps.name}
        type="text"
        ref={refAsInputElement}
        placeholder={textBoxProps.placeholder}
        onChange={(e) => {
          if (textBoxProps.pubsub)
            textBoxProps.pubsub.publish(textBoxProps.name, {
              data: e.target.value,
            });
          e.preventDefault();
        }}
        onBlur={onBlurHandler}
        aria-describedby={textBoxProps.id + '_error'}
      />
      <ValidationError
        valid={textBoxProps.valid}
        message={textBoxProps.validationMessage}
      />
      {cloneChildrenForShowIf(children, textBoxProps)}
    </div>
  );
};

export default TextBox;
