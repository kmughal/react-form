import * as React from 'react';
import FormProps from './Form.Props';
import { setReferences } from '../../../utils/helpers';
import ValidationSummary from './ValidateSummary';
import PubSub from './PubSub';

const Form: React.FC<{ formProps: FormProps }> = ({ formProps, children }) => {
  let _formData = null;
  formProps.validators = {};
  formProps.formDataSetters = {};
  formProps.pubsub = new PubSub();
  let _formIsComplete = false;
  let _submitForm = () => {};

  const [validationSummary, setValidationSummary] = React.useState([]);

  React.useEffect(() => {
    _formData = new FormData();
    return () => {
      // _formData = null
    };
  }, [_formData]);

  const submitHandler = (e) => {
    const validatorResult = new Array<boolean>();

    const validators = formProps.validators;
    const validationSummaryResult = [];
    for (const index in validators) {
      const validator = validators[index];
      const vResult = validator();
      if (!vResult[0]) {
        validatorResult.push(false);
        validationSummaryResult.push({
          [vResult[1] as string]: vResult[2],
          fieldId: vResult[3],
        });
      }
    }

    setValidationSummary(validationSummaryResult);
    const anyValidationFailed = validatorResult.some((c) => !c);
    if (anyValidationFailed) {
      console.log('check result!');
    } else {
      _formData = _formData ?? new FormData();

      let plainJson: Record<string, string>;
      for (const index in formProps.formDataSetters) {
        const setter = formProps.formDataSetters[index];
        const jsonResult = setter(_formData);
        if (jsonResult) plainJson = { ...plainJson, ...jsonResult };
      }
      _formIsComplete = true;
      _submitForm = () => {
        formProps.submitForm(_formData, plainJson);
        _formData = new FormData();
      };

      if (formProps.enableOffline) {
        if (navigator.onLine && process && process['browser']) _submitForm();
      } else _submitForm();
    }
    e.preventDefault();
  };
  const [onlineMessage, setOnlineMessage] = React.useState(false);
  const [offLineMessage, setOfflineMessage] = React.useState(false);

  if (formProps.enableOffline && process && process['browser']) {
    window.addEventListener('online', () => {
      setOnlineMessage(true);
      setOfflineMessage(false);
      if (_formIsComplete) {
        _submitForm();
        _formIsComplete = false;
      }
    });
    window.addEventListener('offline', () => {
      setOnlineMessage(false);
      setOfflineMessage(true);
    });
  }

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
