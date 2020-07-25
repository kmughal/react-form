export {};
declare global {
  namespace jest {
    interface Matchers<R> {
      mustHaveAnAttribute(actual: string): R;
      attributeValueMustBeSame(
        attributeName: string,
        attributeValue: string
      ): R;
      valueMustBeEqual(value: string): R;
      textContentEqual(value: string): R;
      typeMustBe(value: string): R;
      valueMustBeEqualWithTimeout(
        value: string,
        done: jest.DoneCallback,
        timeout: number = 200
      ): R;
    }
  }
}
