import { time } from "console"

const valueMustBeEqualWithTimeout = (ele, value: string, done: jest.DoneCallback, timeout: number = 200) => {

  return new Promise((resolve, reject) => {

    if (!ele) resolve({
      message: () => "ele is null check selector!", pass: false
    })

    setTimeout(() => {
      const pass = ele.value === value
      const result = pass ? { pass, message: () => "test passed" } :
        { pass, message: () => `Test failed : ${value} !== ${ele.value}` }
      resolve(result)
      done()
    }, timeout)

  })



}

export { valueMustBeEqualWithTimeout }