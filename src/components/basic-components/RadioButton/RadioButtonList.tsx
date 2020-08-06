import React from 'react';
import PubSub from '../Form/PubSub';
import RadioButtonOption from './RadioButtonOption';

const RadioButtonList = (
  name: string,
  legend: string,
  radioButtonList: Array<RadioButtonOption>,
  eleRef: React.MutableRefObject<HTMLInputElement>,
  pubsub: PubSub,
  enableInlineValidation: boolean,
  runValidator: () => void
) => {
  const markSelection = (event: React.MouseEvent<HTMLInputElement>) => {
    eleRef.current.value = (event.target as HTMLInputElement).value;
  };

  const onBlurHandler = React.useCallback((e) => {
    if (enableInlineValidation && runValidator) runValidator();
  }, []);

  const result = radioButtonList.map((rd: RadioButtonOption, index: number) => {
    const _id = `${name.replace(' ', '_')}_${index}`;
    const markup = rd.checked ? (
      <input
        type="radio"
        id={_id}
        name={name}
        value={rd.value}
        onClick={markSelection}
        onBlur={onBlurHandler}
        aria-describedby={name + '_error'}
        checked={true}
        onChange={(e) => {
          if (pubsub) pubsub.publish(name, { data: e.target.value });
        }}
      />
    ) : (
      <input
        type="radio"
        id={_id}
        name={name}
        value={rd.value}
        onClick={markSelection}
        onBlur={onBlurHandler}
        aria-describedby={name + '_error'}
        onChange={(e) => {
          if (pubsub) pubsub.publish(name, { data: e.target.value });
        }}
      />
    );
    return (
      <div key={index}>
        {markup}
        <label htmlFor={_id}>{rd.text}</label>
      </div>
    );
  });

  return (
    <fieldset>
      <legend>{legend}</legend>
      {result}
    </fieldset>
  );
};

export default RadioButtonList;
