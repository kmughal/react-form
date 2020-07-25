const textContentEqual = (ele, value: string) => {
  if (!ele)
    return {
      message: () => "ele is null check selector!",
      pass: false,
    };

  const pass = ele.innerHTML === value;
  if (pass) {
    return {
      message: () => `${value} === ${ele.textContentEqual}`,
      pass,
    };
  } else {
    return {
      message: () => `\nTest failed:${value} !== ${ele.textContentEqual}`,
      pass,
    };
  }
};

export { textContentEqual };
