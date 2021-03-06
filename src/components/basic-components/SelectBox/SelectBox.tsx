import * as React from 'react';
import SelectBoxProps from './SelectBox.Props';
import SelectBoxOption from './SelectBoxOption';
import {
  addFormDataSetterCallback,
  bindValuePropertyIfProvided,
  cloneChildrenForShowIf,
} from '../../../utils/helpers';
import ValidationError from '../ValidationError';

const SelectBox: React.FC<{ selectBoxProps: SelectBoxProps }> = ({
  children,
  selectBoxProps,
}) => {
  selectBoxProps.eleRef = selectBoxProps.eleRef ?? React.useRef(null);
  addFormDataSetterCallback(selectBoxProps);

  const onBlurHandler = React.useCallback((e) => {
    if (selectBoxProps.enableInlineValidation) selectBoxProps.runValidator();
  }, []);

  const selectOptions = selectBoxProps.options.map(
    (option: SelectBoxOption, index: number) => (
      <option key={index} value={option.value}>
        {option.text}
      </option>
    )
  );

  if (!selectBoxProps.value) {
    const selectedItem = selectBoxProps.options.filter((x) => x.selected);
    if (selectedItem.length) selectBoxProps.value = selectedItem[0].value;
  }

  bindValuePropertyIfProvided(
    selectBoxProps.value,
    selectBoxProps.pubsub,
    selectBoxProps.name,
    selectBoxProps.eleRef as React.MutableRefObject<HTMLSelectElement>
  );

  return (
    <div>
      <label htmlFor={selectBoxProps.name}>{selectBoxProps.label}</label>
      <select
        defaultValue={selectBoxProps.value ?? null}
        ref={selectBoxProps.eleRef as React.MutableRefObject<HTMLSelectElement>}
        name={selectBoxProps.name}
        id={selectBoxProps.id}
        aria-describedby={selectBoxProps.id + '_error'}
        onBlur={onBlurHandler}
        onChange={(e) => {
          if (selectBoxProps.pubsub) {
            selectBoxProps.pubsub.publish(selectBoxProps.name, {
              data: e.target.value,
            });
          }
        }}
      >
        {selectOptions}
      </select>
      <ValidationError
        valid={selectBoxProps.valid}
        message={selectBoxProps.validationMessage}
      />

      {cloneChildrenForShowIf(children, selectBoxProps)}
    </div>
  );
};

export default SelectBox;
