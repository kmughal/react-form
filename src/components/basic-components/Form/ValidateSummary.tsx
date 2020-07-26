import React from 'react';

const ValidationSummary = ({ messages }) => {
  const markup = [];
  let key = 0;
  for (const message of messages) {
    const [fieldName, errorMessage] = Object.entries(message)[0];
    const [_, fieldId] = Object.entries(message)[1];

    markup.push(
      <li key={key++}>
        <a href={`${`#${fieldId}`}`} id={fieldId + '_error'}>
          {fieldName + '   ' + errorMessage}
        </a>
      </li>
    );
  }
  return (
    <div role="alert">
      <h4>There are {markup.length} errors in this form</h4>

      <ul>{markup}</ul>
    </div>
  );
};

export default ValidationSummary;
