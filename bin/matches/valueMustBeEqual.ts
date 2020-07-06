const valueMustBeEqual = (ele, value: string) => {

  if (!ele) return {
    message: () => "ele is null check selector!", pass: false
  }

  const pass = ele.value === value
  if (pass) {
    return {
      message: () => `${value} === ${ele.value}`,
      pass,
    }
  } else {
    return {
      message: () =>
        `\nTest failed:${value} !== ${ele.value}`,
      pass,
    }
  }
}

export { valueMustBeEqual }