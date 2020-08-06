import { RadioButton } from '../../basic-components';
import RadioButtonOption from '../../basic-components/RadioButton/RadioButtonOption';
import RadioButtonProps from '../../basic-components/RadioButton/RadioButton.Props';
import GenderProps from './Gender.Props';

import React from 'react';
import BaseValidatorProps from '../../validators/BaseValidator.Props';
import { RequiredValidator } from '../../validators';

const Gender: React.FC<{ genderProps: GenderProps }> = (props) => {
  const genderProps = props.genderProps;

  const requiredProps: BaseValidatorProps = {
    name: 'required_gender',
    validators: genderProps.validators,
    eleRef: genderProps.eleRef,
    formDataSetters: genderProps.formDataSetters,
    valid: genderProps.valid,
    enableInlineValidation: genderProps.enableInlineValidation,
  };

  const genderRadioButtonOpts: RadioButtonProps = {
    id: genderProps.id,
    name: genderProps.name,
    label: genderProps.label,
    legend: genderProps.label,
    validationMessage: genderProps.validationMessage,
    radioButtonOptions: [
      new RadioButtonOption('Male', 'male'),
      new RadioButtonOption('Fe-male', 'female'),
    ],
  };

  return (
    <RequiredValidator requiredValidatorProps={requiredProps}>
      <RadioButton radioButtonProps={genderRadioButtonOpts} />
    </RequiredValidator>
  );
};

export default Gender;
