import * as React from 'react';
import { CustomValidatorProps } from '.';

import { curry } from '../../../utils/helpers';
import { BaseValidator } from '../BaseValidator';

const CustomValidator: React.FC<{
  customValidator: CustomValidatorProps;
}> = (props) => {
  const [valid, setValidator] = React.useState(true);

  const callback = (args: Record<string, any>): Array<boolean | string> => {
    const {
      _target,
      _setValidator,
      _fieldName,
      _validationMessage,
      _fieldId,
    } = args;
    let _isValid = false;
    const _ele = _target.current;
    if (!_ele) _isValid = false;
    else {
      _isValid = props.customValidator.validate(_ele);
    }
    _setValidator(_isValid);
    return [_isValid, _fieldName, _validationMessage, _fieldId];
  };

  props.customValidator.validators[props.customValidator.name] = curry(
    callback,
    {
      _setValidator: setValidator,
      _target: props.customValidator.eleRef,
      _children: props.children,
    }
  );

  props.customValidator.valid = valid;

  return (
    <BaseValidator baseValidator={props.customValidator}>
      {props.children}
    </BaseValidator>
  );
};

export default CustomValidator;
