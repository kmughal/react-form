const sameTextContents = (received, actual) => {
  const pass = received === actual;
  if (pass) {
    return {
      message: () => `${received} === ${actual}`,
      pass,
    };
  } else {
    return {
      message: () =>
        `\nTest failed:\n\tReceived : ${received}\n\tExpected : ${actual}`,
      pass,
    };
  }
};
export { sameTextContents };
