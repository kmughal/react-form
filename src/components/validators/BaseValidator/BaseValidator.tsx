import * as React from 'react';
import BaseValidatorProps from '../BaseValidator.Props';
import { setReferences } from '../../../utils/helpers';

const BaseValidator: React.FC<{ baseValidator: BaseValidatorProps }> = (
  props
) => {
  const runValidator = () =>
    props.baseValidator.validators[props.baseValidator.name]();

  return (
    <>
      {React.Children.map(props.children as any, (child, _) => {
        const _props = child.props;
        if (child.props.className?.startsWith('jsx')) return child;

        setReferences(
          _props,
          props.baseValidator,
          [
            'runValidator',
            'eleRef',
            'valid',
            'setValidator',
            'pubsub',
            'eventName',
            'showIfValue',
            'validators',
            'validatorName',
            'formDataSetters',
            'enableInlineValidation',
          ],
          { validatorName: props.baseValidator.name, runValidator }
        );

        return React.cloneElement(child, { ..._props });
      })}
    </>
  );
};

export default BaseValidator;
