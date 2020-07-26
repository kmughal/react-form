const attributeValueMustBeSame = (
  ele,
  attributeName: string,
  actualValue: string
) => {
  if (!ele)
    return {
      message: () => 'ele is null check selector!',
      pass: false,
    };

  let pass = !!ele.getAttribute(attributeName);
  if (pass) {
    pass = ele.getAttribute(attributeName) === actualValue;
    if (pass)
      return {
        message: () => `${ele.getAttribute(attributeName)} ==  ${actualValue}`,
        pass,
      };
    else {
      return {
        message: () => `${ele.getAttribute(attributeName)} !==  ${actualValue}`,
        pass,
      };
    }
  } else {
    return {
      message: () => `\nTest failed:${attributeName} not found on the node!`,
      pass,
    };
  }
};

export { attributeValueMustBeSame };
