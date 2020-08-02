import React from 'react';
import FormProps, { SetterFunc } from './Form.Props';
import { setReferences } from '../../../utils/helpers';
import ValidationSummary from './ValidateSummary';
import PubSub from './PubSub';
import useValidators from './useValidate';
import useEnableOfflineSubmit from './useEnableOfflineSubmit';

const Form: React.FC<{ formProps: FormProps }> = ({ formProps, children }) => {
  // init props
  formProps.validators = {};
  formProps.formDataSetters = {};
  formProps.pubsub = new PubSub();

  let _formIsSubmitted = false;
  let _formData: FormData = null;

  const _submitForm = (
    formData: FormData,
    plainJson: Record<string, string>
  ) => {
    formProps.submitForm(formData, plainJson);
    formData = new FormData();
    _formIsSubmitted = true;
  };

  const { validate, validationSummary } = useValidators();
  const {
    onlineMessage,
    offLineMessage,
    setFormIsComplete,
    setFormSubmitData,
  } = useEnableOfflineSubmit(formProps.enableOffline, _submitForm);

  const getProvidedValuesInJson = (
    formDataSetters: Record<string, SetterFunc>,
    frmData: FormData
  ) => {
    let plainJson: Record<string, string>;
    for (const index in formDataSetters) {
      const setter = formDataSetters[index];
      const jsonResult = setter(frmData);
      if (jsonResult) plainJson = { ...plainJson, ...jsonResult };
    }
    return plainJson;
  };

  const submitHandler = (e) => {
    localStorage.removeItem('formValidButNotSubmitted');
    const validators = formProps.validators;
    const anyValidationFailed = validate(validators);

    if (anyValidationFailed) {
      console.log('check result!');
    } else {
      _formData = _formData ?? new FormData();
      const plainJson = getProvidedValuesInJson(
        formProps.formDataSetters,
        _formData
      );

      // to be more obvious
      setFormIsComplete(true);
      setFormSubmitData(_formData, plainJson);

      if (formProps.enableOffline) {
        if (navigator.onLine && process && process['browser'])
          _submitForm(_formData, plainJson);
      } else _submitForm(_formData, plainJson);
    }
    if (!_formIsSubmitted) {
      localStorage.setItem('formValidButNotSubmitted', 'true');
    }
    e.preventDefault();
  };

  return (
    <>
      {formProps.heading && <h1>{formProps.heading}</h1>}
      {formProps.enableOffline && offLineMessage && (
        <p>
          You are offline. Nothing to worry once you complete the form. You get
          back your internet it will be submitted.
        </p>
      )}
      {formProps.enableOffline && onlineMessage && <p>You are online :)</p>}
      <form onSubmit={submitHandler} name={formProps.name} id={formProps.id}>
        {formProps.showValidationSummary && validationSummary.length > 0 && (
          <ValidationSummary messages={validationSummary} />
        )}
        {React.Children.map(children as any, (child) => {
          const _props = child.props;
          if (child.props.className?.startsWith('jsx')) return child;

          setReferences(
            _props,
            formProps,
            ['eleRef', 'validators', 'formDataSetters', 'pubsub'],
            { eleRef: React.useRef(null) }
          );

          return React.cloneElement(child, { ..._props });
        })}
      </form>
    </>
  );
};

export default Form;
