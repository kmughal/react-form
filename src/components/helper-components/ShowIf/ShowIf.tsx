import * as React from 'react';
import { ShowIfProps } from '.';
import { setReferences } from '../../../utils/helpers';

const ShowIfComponent = ({ props }) => {
  return (
    <>
      {React.Children.map(props.children, (child: any, index) => {
        const _props = child.props;
        if (child.props.className?.startsWith('jsx')) return child;

        setReferences(
          _props,
          props.showIfProps,
          [
            'showIfValue',
            'eleRef',
            'validators',
            'formDataSetters',
            'pubsub',
            'enableInlineValidation',
          ],
          {
            eleRef: React.useRef(null),
          }
        );

        return React.cloneElement(child, { ..._props });
      })}
    </>
  );
};

const ShowIf: React.FC<{ showIfProps: ShowIfProps }> = (props) => {
  const [showIfValue, setShowIfValue] = React.useState(false);

  props.showIfProps.pubsub.addSubscriber(
    props.showIfProps.eventName,
    (data: any) => {
      const showIfResult = props.showIfProps.showIfCallback(data);
      setShowIfValue(showIfResult);
    }
  );
  const children = props.children;
  return showIfValue && <ShowIfComponent props={props} />;
};

export default ShowIf;
