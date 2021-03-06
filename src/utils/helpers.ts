import BaseComponentProps from '../components/basic-components/BaseComponent.Props';
import React from 'react';
import PubSub from '../components/basic-components/Form/PubSub';

const addFormDataSetterCallback = (props: BaseComponentProps) => {
  if (props.formDataSetters)
    props.formDataSetters[props.name] = (formData) => {
      formData.append(props.name, props.eleRef.current.value);
      return { [props.name]: props.eleRef.current.value };
    };
};

const extractTheValidationMessageForSummary = (children) => {
  const label = getPropertyValueFromReactComponentProps(children, 'label');
  const validationMessage = getPropertyValueFromReactComponentProps(
    children,
    'validationMessage'
  );
  return [label, validationMessage];
};

const extractTheIdOfFailedField = (children) => {
  const result = getPropertyValueFromReactComponentProps(children, 'id');
  return result;
};

function getPropertyValueFromReactComponentProps(
  children: any,
  propertyName: string
) {
  const props = children?.props;
  for (const prop in props) {
    const item = props[prop];
    if (item[propertyName]) return item[propertyName];
  }
  return null;
}

type curryCallback = (args: Record<string, any>) => Array<boolean | string>;
const curry = (callback: curryCallback, args: Record<string, any>) => {
  const [fieldName, validationMessage] = extractTheValidationMessageForSummary(
    args._children
  );
  const fieldId = extractTheIdOfFailedField(args._children);
  args._fieldName = fieldName;
  (args._validationMessage = validationMessage), (args._fieldId = fieldId);
  return () => callback(args);
};

const cloneChildrenForShowIf = (children, props) => {
  return React.Children.map(children as any, (child, _) => {
    const _props = child.props;

    setReferences(
      _props,
      props,
      [
        'pubsub',
        'eventName',
        'formDataSetters',
        'showIfCallback',
        'showIfValue',
        'validators',
        'eleRef',
        'enableInlineValidation',
      ],
      { eventName: props.name }
    );
    return React.cloneElement(child, { ..._props });
  });
};

const setComponentValueIfProvided = (props: BaseComponentProps) => {
  if (props.value !== undefined) {
    const eleRef = props.eleRef;
    const value = props.value;
    React.useEffect(() => {
      if (eleRef.current) eleRef.current.value = value;
      return () => {
        // do nothing
      };
    }, [eleRef, value]);
  }
};

function setReferences(result, srcObject1, properties, srcObject2 = {}) {
  const objectName = Object.keys(result).filter((x) => x !== 'children')[0];
  if (!result[objectName]) return;
  for (const property of properties) {
    if (srcObject2.hasOwnProperty(property)) {
      result[objectName][property] = srcObject2[property];
    } else if (srcObject1.hasOwnProperty(property)) {
      result[objectName][property] = srcObject1[property];
    }
  }
}

const bindValuePropertyIfProvided = (
  data: string | boolean,
  pubsub: PubSub,
  name: string,
  eleRef: React.MutableRefObject<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >
) => {
  React.useEffect(() => {
    if (data) {
      if (pubsub) {
        pubsub.publish(name, {
          data,
        });
        if ('checked' in (eleRef.current as HTMLInputElement)) {
          (eleRef.current as HTMLInputElement).checked = data as boolean;
        } else {
          eleRef.current.value = data as string;
        }
      }
    }
  });
};

export {
  addFormDataSetterCallback,
  curry,
  cloneChildrenForShowIf,
  setComponentValueIfProvided,
  setReferences,
  bindValuePropertyIfProvided,
};
