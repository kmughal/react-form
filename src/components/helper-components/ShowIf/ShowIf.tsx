import * as React from 'react';
import { ShowIfProps } from '.';
import { overrideProperty } from '../../../utils/helpers';

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
        overrideProperty(_props, 'showIfValue', showIfValue);
        overrideProperty(_props, 'eleRef', React.useRef(null));
        overrideProperty(_props, 'validators', props.showIfProps.validators);
        overrideProperty(
          _props,
          'formDataSetters',
          props.showIfProps.formDataSetters
        );
        overrideProperty(_props, 'pubsub', props.showIfProps.pubsub);

        return React.cloneElement(child, { ..._props });
      })}
    </>
  );
};

export default ShowIf;
