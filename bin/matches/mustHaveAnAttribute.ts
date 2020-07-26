const mustHaveAnAttribute = (ele, attributeName: string) => {
  if (!ele)
    return {
      message: () => 'ele is null check selector!',
      pass: false,
    };

  const pass = !!ele.getAttribute(attributeName);
  if (pass) {
    return {
      message: () => `${attributeName} found on the node!`,
      pass,
    };
  } else {
    return {
      message: () => `\nTest failed:${attributeName} not found on the node!`,
      pass,
    };
  }
};
export { mustHaveAnAttribute };
