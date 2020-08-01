import * as React from 'react';
import { ShowIfProps } from '.';
import { setReferences } from '../../../utils/helpers';

const ShowIf: React.FC<{ showIfProps: ShowIfProps }> = (props) => {
  const [showIfValue, setShowIfValue] = React.useState({});

  props.showIfProps.pubsub.addSubscriber(
    props.showIfProps.eventName,
    (data: any) => {
      setShowIfValue(data);
    }
  );

  return (
    <>
      {React.Children.map(props.children, (child: any, index) => {
        const _props = child.props;
        if (child.props.className?.startsWith('jsx')) return child;

        setReferences(
          _props,
          props.showIfProps,
          ['showIfValue', 'eleRef', 'validators', 'formDataSetters', 'pubsub'],
          {
            showIfValue,
            eleRef: React.useRef(null),
          }
        );

        return React.cloneElement(child, { ..._props });
      })}
    </>
  );
};

export default ShowIf;
