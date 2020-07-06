export { };
declare global {
  namespace jest {
    interface Matchers<R> {
      mustHaveAnAttribute(actual: string): R;
      attributeValueMustBeSame(attributeName: string, attributeValue: string): R;
      valueMustBeEqual(value: string): R;
    }
  }
}