import {
  FormProps,
  Form,
  TextBox,
  MultiFileUpload,
} from '../components/basic-components';
import {
  BaseValidatorProps,
  RequiredValidator,
} from '../components/validators';
import Navigation from './components/Navigation';
import React from 'react';
import BaseComponentProps from '../components/basic-components/BaseComponent.Props';

const MultiDocsUploadPage = () => {
  const [payload, setPayload] = React.useState(null);
  const textBoxProps: BaseComponentProps = {
    label: 'Name',
    name: 'txt-name',
    id: 'txt-name',
    placeholder: 'Provide Name...',
    validationMessage: 'Please provide name...',
  };

  const multiDocsProps: BaseComponentProps = {
    label: 'Please provide document(s)',
    name: 'multi-docs',
    id: 'multi-docs',
    placeholder: 'Provie docs',
    validationMessage: 'Atleast select one file',
  };

  const formProps: FormProps = {
    enableOffline: true,
    showValidationSummary: true,
    submitForm: (formData) => {
      fetch('/api/fake', {
        body: formData,
        method: 'POST',
      })
        .then((response) => response.json())
        .then(setPayload)
        .catch(console.log);
      console.log('login');
    },
  };
  const requiredValidator1: BaseValidatorProps = { name: 'name_required' };
  const requiredValidator2: BaseValidatorProps = { name: 'file_required' };

  return (
    <>
      <Navigation />
      <h2>Multiple file upload</h2>
      <p>This is an example of multiple upload file upload using react form.</p>
      <Form formProps={formProps}>
        <RequiredValidator requiredValidatorProps={requiredValidator1}>
          <TextBox textBoxProps={textBoxProps} />
        </RequiredValidator>
        <RequiredValidator requiredValidatorProps={requiredValidator2}>
          <MultiFileUpload multiFileUploadProps={multiDocsProps} />
        </RequiredValidator>
        <div className="button-container">
          <button>Send file(s)</button>
        </div>
      </Form>
      {payload && (
        <>
          <h1>Pay load from server :</h1>
          <pre>{JSON.stringify(payload, null, 2)}</pre>
        </>
      )}
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

          display: inline-block;
          text-align: right;
        }
        select,
        input[type='text'],
        textarea {
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
    </>
  );
};

export default MultiDocsUploadPage;
