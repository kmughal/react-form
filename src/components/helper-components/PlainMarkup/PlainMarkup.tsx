import { PlainMarkupProps } from '.';
import React from 'react';

const PlainMarkup: React.FC<{ plainMarkupProps: PlainMarkupProps }> = ({
  children,
  plainMarkupProps,
}) => {
  const [reactiveData, setReactiveData] = React.useState(null);
  plainMarkupProps.pubsub.addSubscriber(plainMarkupProps.eventName, (data) => {
    setReactiveData(data);
  });

  return <>{plainMarkupProps.parentElementValue(reactiveData)}</>;
};

export default PlainMarkup;
