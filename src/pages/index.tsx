import {
  Form,
  FormProps,
  TextBox,
  NumberBox,
  SelectBoxProps,
  SelectBoxOption,
  SelectBox,
  SingleFileUpload,
} from '../components/basic-components';

import {
  RequiredValidator,
  BaseValidatorProps,
  RangeValidator,
  RangeValidatorProps,
} from '../components/validators';

import {
  Title,
  TitleProps,
  PostCodeProps,
  PostCode,
  Gender,
  GenderProps,
} from '../components/recepies';
import Navigation from './components/Navigation';
import SingleFileUploadProps from '../components/basic-components/SingleFileUpload/SingleFileUpload.Props';
import React from 'react';
import BaseComponentProps from '../components/basic-components/BaseComponent.Props';

const Index = () => {
  const [payload, setPayload] = React.useState(null);

  const formProps: FormProps = {
    name: 'test-form',
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

  const textBoxProps: BaseComponentProps = {
    id: 'name',
    name: 'name',
    label: 'Name :',
    validationMessage: 'Please provide the name.',
    placeholder: 'enter name',
  };

  const requiredValidator: BaseValidatorProps = { name: 'name_required' };

  const titleProps: TitleProps = {
    name: 'title',
    id: 'title',
    label: 'Title :',
    placeholder: 'Please select title',
    validationMessage: 'Title is required!',
  };

  const ageProps: BaseComponentProps = {
    id: 'age',
    name: 'age',
    label: 'Age :',
    placeholder: 'Provide age',
    validationMessage: 'Age must be between 5 - 15',
  };

  const ageRangeValidation: RangeValidatorProps = {
    name: 'age_range_validation',
    max: 15,
    min: 5,
  };

  const genderProps: GenderProps = {
    name: 'gender',
    id: 'rd_gender',
    label: 'Select gender ',
    validationMessage: 'Please select gender as it is required!',
  };

  const streetTextBoxProps: BaseComponentProps = {
    id: 'street',
    name: 'street',
    label: 'Street / House number',
    placeholder: 'Street address',
  };

  const postCodeProps: PostCodeProps = {
    id: 'postcode',
    name: 'postcode',
    label: 'PostCode:',
    validationMessage: 'Invalid post code',
    placeholder: 'Provide valid Postcode',
  };

  const countriesSelectBoxProps: SelectBoxProps = {
    id: 'ddl_countires',
    name: 'countries',
    label: 'Country :',
    placeholder: 'Select Country',
    options: [
      new SelectBoxOption('.....', ''),
      new SelectBoxOption('UK', 'uk'),
      new SelectBoxOption('USA', 'usa'),
      new SelectBoxOption('Pakistan', 'pakistan'),
    ],
    validationMessage: 'Country is a required field!',
  };

  const countryRequiredValidatorProps: BaseValidatorProps = {
    name: 'required_countries',
  };

  const requiredFileProps: BaseValidatorProps = {
    name: 'file_required',
  };
  const singleFileProps: SingleFileUploadProps = {
    id: 'user_doc',
    name: 'user_doc',
    accept: '.jpeg',
    label: 'Provide a document',
    placeholder: 'Document',
    validationMessage: 'A document is required!',
  };

  return (
    <>
      <Navigation />
      <h2>Basic Form</h2>
      <p>
        This is a basic form created using react form. This page is using almost
        all controls.
      </p>
      <div className="form-container">
        <Form formProps={formProps}>
          <Title titleProps={titleProps} />
          <RequiredValidator requiredValidatorProps={requiredValidator}>
            <TextBox textBoxProps={textBoxProps} />
          </RequiredValidator>
          <Gender genderProps={genderProps} />
          <RangeValidator rangeValidatorProps={ageRangeValidation}>
            <NumberBox numberProps={ageProps} />
          </RangeValidator>
          <TextBox textBoxProps={streetTextBoxProps} />
          <PostCode postCodeProps={postCodeProps} />
          <RequiredValidator
            requiredValidatorProps={countryRequiredValidatorProps}
          >
            <SelectBox selectBoxProps={countriesSelectBoxProps} />
          </RequiredValidator>
          <RequiredValidator requiredValidatorProps={requiredFileProps}>
            <SingleFileUpload singleFileUploadProps={singleFileProps} />
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

        nav ul li a :after {
          content: ' | ';
        }

        .form-container {
          margin: auto;
        }
        fieldset {
          border: 2px solid rgb(226, 232, 240);
          width: 99%;
        }
        legend {
          margin-bottom: 5px;
          position: relative;
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

        fieldset div label {
          width: 80px;
        }

        div {
          padding: 5px 5px;
          margin: 0px 0px;
        }
        label {
          position: relative;
          width: 200px;
          display: block;
        }
        select,
        input[type='text'],
        input[type='number'] {
          padding: 5px 5px;
          display: block;
          border: 2px solid rgb(226, 232, 240);
          width: 99%;
          border-radius: 5px;
        }
        select {
          width: 321px !important;
        }
      `}</style>
    </>
  );
};
export default Index;
