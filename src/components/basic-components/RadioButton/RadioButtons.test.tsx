import * as React from 'react';
import { RadioButton, RadioButtonOption, RadioButtonProps } from '..';
import render from '../../../../bin/render';
import PubSub from '../Form/PubSub';

describe('RadioButton tests', () => {
  it('when title,id,name,legend are set then radio button list must have those props.', () => {
    const props: RadioButtonProps = {
      id: 'txt-RadioButton',
      name: 'opt_types',
      placeholder: 'Select',
      label: 'RadioButton :',

      radioButtonOptions: [
        new RadioButtonOption('option 1', 'option_1'),
        new RadioButtonOption('option 2', 'option_2'),
      ],
      legend: 'Radio button example',
    };
    const { getAllByTagName, triggerEvent, getByTagName, document } = render(
      <RadioButton radioButtonProps={props} />
    );

    const opts = getAllByTagName('radio');
    const opt1 = opts[0];
    triggerEvent('click', opt1);

    expect(opt1.checked).toBeTruthy();
    expect(opt1).attributeValueMustBeSame('name', 'opt_types');
    expect(opt1).attributeValueMustBeSame('id', 'opt_types_0');
    expect(props.eleRef.current.value).toEqual('option_1');

    const legendEle = getByTagName('legend');
    expect(legendEle).not.toBeNull();
    expect(legendEle).textContentEqual('Radio button example');
  });

  it('when selected is set to true then it should be preselected', (done) => {
    const props: RadioButtonProps = {
      id: 'txt-RadioButton',
      name: 'opt_types',
      placeholder: 'Select',
      label: 'RadioButton :',
      pubsub: new PubSub(),
      radioButtonOptions: [
        new RadioButtonOption('Uk', 'uk'),
        new RadioButtonOption('USA', 'usa', true),
      ],
      legend: 'Radio button example',
    };
    const { getAllByTagName, triggerEvent, getByTagName, document } = render(
      <RadioButton radioButtonProps={props} />
    );

    setTimeout(() => {
      const opts = getAllByTagName('radio');
      const opt2 = opts[1];
      expect(opt2.checked).toBeTruthy();
      expect(opt2).attributeValueMustBeSame('name', 'opt_types');
      expect(opt2).attributeValueMustBeSame('id', 'opt_types_1');
      expect(props.eleRef.current.value).toEqual('usa');
      triggerEvent('click', opts[0]);
      expect(props.eleRef.current.value).toEqual('uk');
      done();
    }, 100);
  });

  it('when valid is set to true then no validation error message should appear', () => {
    const props: RadioButtonProps = {
      id: 'txt-RadioButton',
      name: 'opt_types',
      placeholder: 'Select',
      label: 'RadioButton :',

      radioButtonOptions: [
        new RadioButtonOption('option 1', 'option_1'),
        new RadioButtonOption('option 2', 'option_2'),
      ],
      legend: 'Radio button example',
      valid: true,
      validationMessage: 'Please select value',
    };

    const { getByText } = render(<RadioButton radioButtonProps={props} />);
    const elementExists = getByText('Please select value');
    expect(elementExists).toBeFalsy();
  });

  it('when valid is set to false then validation error message should appear', () => {
    const props: RadioButtonProps = {
      id: 'txt-RadioButton',
      name: 'opt_types',
      placeholder: 'Select',
      label: 'RadioButton :',

      radioButtonOptions: [
        new RadioButtonOption('option 1', 'option_1'),
        new RadioButtonOption('option 2', 'option_2'),
      ],
      legend: 'Radio button example',
      valid: false,
      validationMessage: 'Please select value',
    };

    const { getByText } = render(<RadioButton radioButtonProps={props} />);
    const elementExists = getByText('Please select value');
    expect(elementExists).toBeTruthy();
  });
});
