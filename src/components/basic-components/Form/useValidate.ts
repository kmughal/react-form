import React from 'react';

const useValidators = () => {
  const [validationSummary, setValidationSummary] = React.useState([]);

  const validate = (validators) => {
    const validatorResult = new Array<boolean>();
    const validationSummaryResult = [];
    for (const index in validators) {
      const validator = validators[index];
      const vResult = validator();
      if (!vResult[0]) {
        validatorResult.push(false);
        validationSummaryResult.push({
          [vResult[1] as string]: vResult[2],
          fieldId: vResult[3],
        });
      }
    }
    setValidationSummary(validationSummaryResult);
    const anyValidationFailed = validatorResult.some((c) => !c);
    return anyValidationFailed;
  };

  return {
    validate,
    validationSummary,
  };
};

export default useValidators;
