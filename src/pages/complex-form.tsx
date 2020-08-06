import React from 'react';
import {
  BaseValidatorProps,
  Form,
  FormProps,
  MultilineTextBox,
  MultilineTextBoxProps,
  PlainMarkup,
  PlainMarkupProps,
  RadioButton,
  RadioButtonOption,
  RadioButtonProps,
  RequiredValidator,
  ShowIf,
  ShowIfProps,
  TextBox,
} from '..';
import BaseComponentProps from '../components/basic-components/BaseComponent.Props';
import Navigation from './components/Navigation';
const Index = () => {
  const [payload, setPayload] = React.useState(null);

  const formProps: FormProps = {
    name: 'test-form',
    enableInlineValidation: true,
    heading: '',
    submitForm: (formData) => {
      fetch('/api/fake', {
        body: formData,
        method: 'POST',
      })
        .then((response) => response.json())
        .then(setPayload)
        .catch(console.log);
    },
    showValidationSummary: true,
  };

  const requiredValidator: BaseValidatorProps = { name: 'name_required' };
  const commentsRequiredValidator: BaseValidatorProps = {
    name: 'comments_required',
  };

  const streetTextBoxProps: BaseComponentProps = {
    id: 'street',
    name: 'street',
    label: 'Street / House number',
    placeholder: 'Street address',
    showIfCallback: ({ data }) => data === 'give_details',
  };

  const showDetailsInputBox: ShowIfProps = {
    id: 'user_decided_to_give_details',
  };

  const nameTextBoxProps: BaseComponentProps = {
    id: 'name',
    label: 'Name :',
    placeholder: 'Provide name ....',
    validationMessage: 'Please provide the name',
    name: 'name',
    showIfCallback: ({ data }) => data === 'give_details',
  };

  const multilineTextBoxProps: MultilineTextBoxProps = {
    id: 'comments',
    name: 'comments',
    label: 'Comments',
    placeholder: 'Enter comments',
    rows: 10,
    columns: 20,
    validationMessage: 'Please provide the comments',
  };

  const radioButtonProps: RadioButtonProps = {
    legend: 'About your personal information',
    name: 'choice_deetail',
    radioButtonOptions: [
      new RadioButtonOption('Provide your details', 'give_details'),
      new RadioButtonOption('No I dont want to give my details', 'no_details'),
    ],
    label: 'choice_deetail',
    id: 'choice_detail',
  };

  const plainMarkupProps: PlainMarkupProps = {
    id: 'plain_markup_prop',
    parentElementValue: (data) => {
      if (data) {
        const value = data.data;
        return (
          <p>
            You have entered : {value} / Characters : {value.length}
          </p>
        );
      }
    },
  };

  return (
    <>
      <Navigation />
      <h2>Complex Form</h2>
      <p>This is a complex form created using react form.</p>
      <div className="form-container">
        <Form formProps={formProps}>
          <RequiredValidator requiredValidatorProps={commentsRequiredValidator}>
            <MultilineTextBox multilineTextBoxProps={multilineTextBoxProps}>
              <PlainMarkup plainMarkupProps={plainMarkupProps} />
            </MultilineTextBox>
          </RequiredValidator>

          <RequiredValidator
            requiredValidatorProps={{ name: 'options_required' }}
          >
            <RadioButton radioButtonProps={radioButtonProps}>
              <ShowIf showIfProps={showDetailsInputBox}>
                <RequiredValidator requiredValidatorProps={requiredValidator}>
                  <TextBox textBoxProps={nameTextBoxProps} />
                </RequiredValidator>
                <TextBox textBoxProps={streetTextBoxProps} />
              </ShowIf>
            </RadioButton>
          </RequiredValidator>

          <div className="button-container">
            <button>Submit Form</button>
          </div>
        </Form>
        {payload && (
          <>
            <h1>Pay load from server :</h1>
            <pre>{JSON.stringify(payload, null, 2)}</pre>
          </>
        )}
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

        fieldset {
          border: 2px solid rgb(226, 232, 240);
          width: 287px;
          left: 100ox;
          position: relative;
          left: 66px;
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

          display: inline-block;
          text-align: right;
          vertical-align: top;
        }
        select,
        input[type='text'],
        textarea {
          padding: 5px 5px;
          display: inline-block;
          border: 2px solid rgb(226, 232, 240);
          width: 300px;
          border-radius: 5px;
          font-family: 'Arial';
        }

        select {
          width: 321px !important;
        }
      `}</style>
    </>
  );
};
export default Index;
