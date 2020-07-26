const typeMustBe = (ele, value: string) => {
  if (!ele)
    return {
      message: () => 'ele is null check selector!',
      pass: false,
    };

  const pass = ele.type === value;
  if (pass) {
    return {
      message: () => `${value} === ${ele.type}`,
      pass,
    };
  } else {
    return {
      message: () => `\nTest failed:${value} !== ${ele.type}`,
      pass,
    };
  }
};

export { typeMustBe };
