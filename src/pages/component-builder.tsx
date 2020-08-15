import {
  Form,
  FormProps,
  NumberBox,
  SelectBox,
  SelectBoxOption,
  SelectBoxProps,
  TextBox,
} from '../components/basic-components';
import { ShowIf, ShowIfProps } from '../components/helper-components';
import Navigation from './components/Navigation';

import React from 'react';
import BaseComponentProps from '../components/basic-components/BaseComponent.Props';
import typings from '../../typings';

function generateTemplate(
  type: string,
  name: string,
  label: string,
  placeholder: string,
  validatorMetaData: Record<string, string>
) {
  const metadata = {
    textbox: {
      typeProps: 'BaseComponentProps',
      typeName: 'TextBox',
      typePropsName: 'textBoxProps',
    },
    range: (props: Record<string, string>) => `
  const validatorProps:RangeValidatorProps = { name : "${name}", max : ${props.max} , min : ${props.min} };
  <RangeValidator rangeValidatorProps={validatorProps}>`,
    regex: (props: Record<string, string>) => `
const validatorProps:RegexValidatorProps = { name : "${name}", regex : "${props.regex}" };
<RegexValidator rangeValidatorProps={validatorProps}>`,
    required: () =>
      `
const validatorProps:RequiredValidatorProps = { name : "${name}"};
<RequiredValidator rangeValidatorProps={validatorProps}>`,
    endrequired: () => '</RequiredValidator>',
    endrange: () => '</RangeValidator>',
    endregex: () => '</RegexValidator>',
  };

  const { typeProps, typeName, typePropsName } = metadata[type];

  const templateParts = [];

  templateParts.push(`
const props:${typeProps} : {
  name : "${name}",
  id : "${name}",
  label : "${label}",
  placeholder : "${placeholder}"
};`);

  if (validatorMetaData)
    templateParts.push(metadata[validatorMetaData.name](validatorMetaData));
  templateParts.push(`    <${typeName} ${typePropsName}={props}/>`);
  if (validatorMetaData)
    templateParts.push(
      metadata['end' + validatorMetaData.name](validatorMetaData)
    );

  return templateParts.join('\n');
}

const showIfProps: ShowIfProps = {
  id: 'component_selection',
  showIfCallback: ({ data }) => {
    if (!data) return false;
    return (
      data === 'textbox' ||
      data === 'password' ||
      data === 'checkbox' ||
      data === 'radio'
    );
  },
};

const componentName: BaseComponentProps = {
  id: 'component-name',
  name: 'component-name',
  label: 'Id / Name:',
  placeholder: 'Provide the name of the component',
};

const labelName: BaseComponentProps = {
  id: 'label-name',
  name: 'label-name',
  label: 'Label Text:',
  placeholder: 'Provide the label of the component',
};

const placeholderText: BaseComponentProps = {
  id: 'placeholder-text',
  name: 'placeholder-text',
  label: 'Placeholder Text:',
  placeholder: 'Provide the placeholder of the component',
};

const regexShowIf: ShowIfProps = {
  id: 'regex-show-if',
  showIfCallback: ({ data }) => {
    return data && data === 'regex';
  },
};
const rangeShowIf: ShowIfProps = {
  id: 'range-show-if',
  showIfCallback: ({ data }) => {
    return data && data === 'range';
  },
};

const regExTextBoxProps: BaseComponentProps = {
  id: 'regular-express-input',
  name: 'regular-express-input',
  label: 'Regular express :',
  placeholder: 'Please provide a regular expression ...',
};

const lowerBoundRangeProps: BaseComponentProps = {
  id: 'range-lower-bound-input',
  name: 'range-lower-bound-input',
  label: 'Lower Bound / Min :',
  placeholder:
    'Please provide the lower bound / max number to apply range validator',
};

const upperBoundRangeProps: BaseComponentProps = {
  id: 'range-upper-bound-input',
  name: 'range-upper-bound-input',
  label: 'Upper Bound / Max :',
  placeholder:
    'Please provide the upper bound / max number to apply range validator',
};

const componentSelectBoxProps: SelectBoxProps = {
  id: 'form-builder_component-options',
  name: 'form-builder_component-options',
  placeholder: 'Select a component',
  label: 'Component: ',
  validationMessage: 'Component selection is required',
  options: [
    new SelectBoxOption('Select a component', ''),
    new SelectBoxOption('TextBox', 'textbox'),
    new SelectBoxOption('RadioButton', 'radiobutton'),
    new SelectBoxOption('CheckBox', 'checkbox'),
    new SelectBoxOption('Number', 'number'),
    new SelectBoxOption('Password', 'password'),
    new SelectBoxOption('SingleFileUpload', 'singleFileUpload'),
  ],
};

const validatorSelectBoxProps: SelectBoxProps = {
  id: 'form-buidler_validator-options',
  name: 'form-buidler_validator-options',
  label: 'Validators :',
  placeholder: 'Select a validator',
  options: [
    new SelectBoxOption('Select a validator', ''),
    new SelectBoxOption('Required Validator', 'required'),
    new SelectBoxOption('Regular Expression Validator', 'regex'),
    new SelectBoxOption('Range Validator', 'range'),
  ],
};

const FormBUilderPage = () => {
  const [template, setTemplate] = React.useState('');

  const formBuilderProps: FormProps = {
    submitForm: (_, plainJson) => {
      debugger;
      const componentType = plainJson['form-builder_component-options'];
      const name = plainJson['component-name'];
      const label = plainJson['label-name'];
      const placeholder = plainJson['placeholder-text'];
      const validator = plainJson['form-buidler_validator-options'];
      const validatorMetaData = { name: validator };
      if ('range-lower-bound-input' in plainJson)
        validatorMetaData['min'] = plainJson['range-lower-bound-input'];
      if ('range-upper-bound-input' in plainJson)
        validatorMetaData['max'] = plainJson['range-upper-bound-input'];
      if ('regular-express-input' in plainJson)
        validatorMetaData['regex'] = plainJson['regular-express-input'];

      const templateString = generateTemplate(
        componentType,
        name,
        label,
        placeholder,
        validatorMetaData
      );
      setTemplate(templateString);
    },
  };

  return (
    <div>
      <Navigation />
      <h2>Component Generation Page</h2>
      <p>
        This is a page which is build using the react-form. This page will
        enable you to create react form code for any component
      </p>

      {template && <pre>{template}</pre>}
      <div className="form-container">
        <Form formProps={formBuilderProps}>
          <SelectBox selectBoxProps={componentSelectBoxProps}>
            <ShowIf showIfProps={showIfProps}>
              <TextBox textBoxProps={componentName} />
              <TextBox textBoxProps={labelName} />
              <TextBox textBoxProps={placeholderText} />
            </ShowIf>
          </SelectBox>

          <SelectBox selectBoxProps={validatorSelectBoxProps}>
            <ShowIf showIfProps={regexShowIf}>
              <TextBox textBoxProps={regExTextBoxProps} />
            </ShowIf>
            <ShowIf showIfProps={rangeShowIf}>
              <NumberBox numberProps={lowerBoundRangeProps} />
              <NumberBox numberProps={upperBoundRangeProps} />
            </ShowIf>
          </SelectBox>
          <div className="button-container">
            <button>Generate Code</button>
          </div>
        </Form>
      </div>
      <style jsx global>{`
        body {
          font-family: 'Arial';
        }

        nav {
          text-align: right;
        }
        nav ul li {
          display: inline-block;
          margin: 5px 5px;
        }
        nav ul li a {
          text-decoration: none;
        }

        nav ul li a :after {
          content: ' | ';
        }

        .form-container {
          width: 50%;
          margin: auto;
        }
        button {
          padding: 15px 15px;
          border-radius: 5px;
          border: 2px solid rgb(226, 232, 240);
          background: rgb(66, 153, 225);
          color: white;
          font-weight: bold;
          width: 100%;
        }

        div {
          padding: 5px 5px;
          margin: 0px 0px;
        }
        label {
          position: relative;
          width: 150px;
          display: inline-block;
          text-align: right;
        }
        select,
        input[type='text'] {
          padding: 5px 5px;
          display: inline-block;
          border: 2px solid rgb(226, 232, 240);
          width: 300px;
          border-radius: 5px;
        }
        select {
          width: 321px !important;
        }
      `}</style>
    </div>
  );
};

export default FormBUilderPage;
