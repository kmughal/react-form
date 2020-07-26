import * as React from 'react';

const ValidationError = (props) => {
  const valid = props.valid === undefined ? true : props.valid;
  const message = props.message ?? 'Something went wrong';
  return !valid && <p>{message}</p>;
};

export default ValidationError;
