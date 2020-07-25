import * as React from "react";
import BaseComponentProps from "../BaseComponent.Props";
import ValidationError from "../ValidationError";
import {
  addFormDataSetterCallback,
  setupShowIfPresent,
  cloneChildrenForShowIf,
} from "../../../utils/helpers";
import { CheckBoxProps } from ".";

const CheckBox: React.FC<{ checkBoxProps: CheckBoxProps }> = ({
  checkBoxProps,
  children,
}) => {
  const isSetupShowIfPresent = setupShowIfPresent(checkBoxProps);
  if (isSetupShowIfPresent) return null;

  checkBoxProps.eleRef = checkBoxProps.eleRef ?? React.useRef(null);
  addFormDataSetterCallback(checkBoxProps);

  return (
    <div>
      <label htmlFor={checkBoxProps.name}>{checkBoxProps.label + " "}</label>
      <input
        type="checkbox"
        id={checkBoxProps.id}
        ref={checkBoxProps.eleRef as React.MutableRefObject<HTMLInputElement>}
        name={checkBoxProps.name}
        value={checkBoxProps.value}
        aria-describedby={checkBoxProps.id + "_error"}
        checked={checkBoxProps.checked}
        onChange={(e) => {
          if (checkBoxProps.pubsub)
            checkBoxProps.pubsub.publish(checkBoxProps.name, {
              data: e.target.value,
            });
        }}
      />
      <ValidationError
        valid={checkBoxProps.valid}
        message={checkBoxProps.validationMessage}
      />
      {cloneChildrenForShowIf(children, checkBoxProps)}
    </div>
  );
};

export default CheckBox;
