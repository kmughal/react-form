import * as React from 'react';
import BaseComponentProps from '../BaseComponent.Props';
import render from '../../../../bin/render';
import { TextBox } from '.';

describe('TextBox tests', () => {
  it('when title, id, name, placeholder & type must be text', () => {
    const textBoxProps: BaseComponentProps = {
      id: 'txt_name',
      name: 'name',
      placeholder: 'placeholder',
      label: 'Name :',
    };

    const { getById, typeElementText } = render(
      <TextBox textBoxProps={textBoxProps} />
    );

    const nameTextBox = getById('txt_name');
    expect(nameTextBox).mustHaveAnAttribute('name');
    expect(nameTextBox).mustHaveAnAttribute('placeholder');
    expect(nameTextBox).typeMustBe('text');
    typeElementText(nameTextBox, 'khurram');
    expect(nameTextBox).valueMustBeEqual('khurram');
  });

  it('when value prop is set then text box value property must be set', (done) => {
    const textBoxProps: BaseComponentProps = {
      id: 'txt_name',
      name: 'name',
      placeholder: 'placeholder',
      label: 'Name :',
      value: 'Khurram',
    };
    const { getById, document } = render(
      <TextBox textBoxProps={textBoxProps} />
    );
    const nameTextBox = getById('txt_name');
    expect(nameTextBox).valueMustBeEqualWithTimeout('Khurram', done);
  });

  it('must have a label', () => {
    const textBoxProps: BaseComponentProps = {
      id: 'txt_name',
      name: 'name',
      placeholder: 'placeholder',
      label: 'Name :',
    };
    const { getByTagName } = render(<TextBox textBoxProps={textBoxProps} />);

    const label = getByTagName('label');
    expect(label).attributeValueMustBeSame('for', 'name');
  });

  describe(' valid flag ', () => {
    it('when set to true then we are not expecting validation message', () => {
      const textBoxProps: BaseComponentProps = {
        id: 'txt_name',
        name: 'name',
        placeholder: 'placeholder',
        label: 'Name :',
        valid: true,
        validationMessage: 'Error message',
      };
      const { getByText } = render(<TextBox textBoxProps={textBoxProps} />);
      expect(getByText('Error Message')).toBeFalsy();
    });

    it('when set to false then we are expecting validation message', () => {
      const textBoxProps: BaseComponentProps = {
        id: 'txt_name',
        name: 'name',
        placeholder: 'placeholder',
        label: 'Name :',
        valid: false,
        validationMessage: 'Name is not valid',
      };
      const { getByText } = render(<TextBox textBoxProps={textBoxProps} />);

      expect(getByText('Name is not valid')).toBeTruthy();
    });
  });
});
