import RangeValidator from "./RangeValidator";
import BaseValidatorProps from "../BaseValidator.Props";

interface RangeValidatorProps extends BaseValidatorProps {
  max?: number;
  min?: number;
}

export default RangeValidatorProps;
