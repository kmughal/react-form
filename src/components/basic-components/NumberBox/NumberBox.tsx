import * as React from 'react';
import BaseComponentProps from '../BaseComponent.Props';
import {
  addFormDataSetterCallback,
  bindValuePropertyIfProvided,
  cloneChildrenForShowIf,
  setComponentValueIfProvided,
} from '../../../utils/helpers';
import ValidationError from '../ValidationError';

const NumberBox: React.FC<{ numberProps: BaseComponentProps }> = ({
  numberProps,
  children,
}) => {
  const refAsInputElement = numberProps.eleRef as React.MutableRefObject<
    HTMLInputElement
  >;
  numberProps.eleRef = numberProps.eleRef ?? React.useRef(null);
  addFormDataSetterCallback(numberProps);
  setComponentValueIfProvided(numberProps);

  const onBlurHandler = React.useCallback((e) => {
    if (numberProps.enableInlineValidation && numberProps.runValidator)
      numberProps.runValidator();
  }, []);

  bindValuePropertyIfProvided(
    numberProps.value,
    numberProps.pubsub,
    numberProps.name,
    numberProps.eleRef as React.MutableRefObject<HTMLInputElement>
  );

  return (
    <div>
      <label htmlFor={numberProps.name}>{numberProps.label}</label>
      <input
        type="number"
        ref={refAsInputElement}
        id={numberProps.id}
        name={numberProps.name}
        placeholder={numberProps.placeholder}
        aria-describedby={numberProps.id + '_error'}
        onBlur={onBlurHandler}
      />
      <ValidationError
        valid={numberProps.valid}
        message={numberProps.validationMessage}
      />
      {cloneChildrenForShowIf(children, numberProps)}
    </div>
  );
};

export default NumberBox;
