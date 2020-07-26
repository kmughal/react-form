import * as React from 'react';
import BaseValidatorProps from '../BaseValidator.Props';
import { overrideProperty } from '../../../utils/helpers';

const BaseValidator: React.FC<{ baseValidator: BaseValidatorProps }> = (
  props
) => {
  return (
    <>
      {React.Children.map(props.children as any, (child, _) => {
        const _props = child.props;
        if (child.props.className?.startsWith('jsx')) return child;
        overrideProperty(_props, 'eleRef', props.baseValidator.eleRef);
        overrideProperty(_props, 'valid', props.baseValidator.valid);
        overrideProperty(_props, 'pubsub', props.baseValidator.pubsub);
        overrideProperty(_props, 'eventName', props.baseValidator.eventName);
        overrideProperty(
          _props,
          'showIfValue',
          props.baseValidator.showIfValue
        );
        overrideProperty(_props, 'validators', props.baseValidator.validators);
        overrideProperty(_props, 'validatorName', props.baseValidator.name);

        overrideProperty(
          _props,
          'formDataSetters',
          props.baseValidator.formDataSetters
        );

        return React.cloneElement(child, { ..._props });
      })}
    </>
  );
};

export default BaseValidator;
