import { expect } from "@jest/globals"

expect.extend({
  attributeValueMustBeSame(ele, attributeName: string, actualValue: string) {
    if (!ele) return {
      message: () => "ele is null check selector!", pass: false
    }

    let pass = !!ele.getAttribute(attributeName)
    if (pass) {

      pass = ele.getAttribute(attributeName) === actualValue
      if (pass)
        return {
          message: () => `${ele.getAttribute(attributeName)} ==  ${actualValue}`,
          pass,
        }
      else {
        return {
          message: () =>
            `${ele.getAttribute(attributeName)} !==  ${actualValue}`,
          pass,
        }
      }
    } else {
      return {
        message: () =>
          `\nTest failed:${attributeName} not found on the node!`,
        pass,
      }
    }
  },
  mustHaveAnAttribute(ele, attributeName: string) {

    if (!ele) return {
      message: () => "ele is null check selector!", pass: false
    }

    const pass = !!ele.getAttribute(attributeName)
    if (pass) {
      return {
        message: () => `${attributeName} found on the node!`,
        pass,
      }
    } else {
      return {
        message: () =>
          `\nTest failed:${attributeName} not found on the node!`,
        pass,
      }
    }
  },
  sameTextContents(received, actual) {
    const pass = received === actual
    if (pass) {
      return {
        message: () => `${received} === ${actual}`,
        pass,
      }
    } else {
      return {
        message: () =>
          `\nTest failed:\n\tReceived : ${received}\n\tExpected : ${actual}`,
        pass,
      }
    }
  },
})