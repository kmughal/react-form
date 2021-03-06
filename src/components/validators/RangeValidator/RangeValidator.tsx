import * as React from 'react';

import { curry } from '../../../utils/helpers';
import { BaseValidator } from '../BaseValidator';
import RangeValidatorProps from './RangeValidator.Props';

type validationCallback = (
  eleRef: React.MutableRefObject<HTMLInputElement | HTMLSelectElement>,
  setValidator: React.Dispatch<React.SetStateAction<boolean>>
) => boolean;

const RangeValidator: React.FC<{
  rangeValidatorProps: RangeValidatorProps;
}> = (props) => {
  const [valid, setValidator] = React.useState(true);

  const callback = (args: Record<string, any>): Array<boolean | string> => {
    const {
      _setValidator,
      _target,
      _max,
      _min,
      _fieldName,
      _validationMessage,
      _fieldId,
    } = args;
    let _isValid = false;
    const _ele = _target.current;
    const _toInt = +_ele.value;
    _isValid = _max >= _toInt && _toInt >= _min;
    _setValidator(_isValid);
    return [
      _isValid as boolean,
      _fieldName as string,
      _validationMessage as string,
      _fieldId as string,
    ];
  };

  props.rangeValidatorProps.validators[props.rangeValidatorProps.name] = curry(
    callback,
    {
      _max: props.rangeValidatorProps.max,
      _min: props.rangeValidatorProps.min,
      _setValidator: setValidator,
      _target: props.rangeValidatorProps.eleRef,
      _children: props.children,
    }
  );
  props.rangeValidatorProps.valid = valid;

  return (
    <BaseValidator baseValidator={props.rangeValidatorProps}>
      {props.children}
    </BaseValidator>
  );
};

export default RangeValidator;
