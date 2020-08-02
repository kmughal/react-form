# React Form

This library provides an easy way to build forms independent of styling!
There is no extra class added to any html element so you might have to apply styling on the native html controls.

### How to use it 

```
npm i react-forms-typescript
```

or 

```
yarn add react-forms-typescript
```

## Base Components

Following controls are build in for first iteration.

- TextBox
- NumberBox
- Password
- RadioButton
- CheckBox
- SingleFileUplaod
- MultipleFileUpload
- MultiLineTextBox
- SelectBox
- ValidationError

## Validation Components

You can create your own validation components as well

- Range Validator
- Regex Validator
- Required Validator
- Custom Validator: this will enable you to write any kind of custom validation by providing a simple call back to the validate property of the validator

## Utility Components

- PlainMarkup
- ShowIf

## Extra

Allows you to continue with form completion regardless of internet. It will notify user if there is no internet once internet is back if form is valid it will be submitted automatically!

### How it works

The components which are provided as part of react-form framework by default have no validation when form is submitted then all the components which are
with in the form there values are provided as FormData which can be passed to backend server for further processing. The moment you add a validation component on
top of a normal component it behaves inline with the validation applied.

Following are few examples:

### Login Form Example Code snippet

```tsx

const [payload, setPayload] = React.useState(null)

 const userNameProps: BaseComponentProps = {
   label: "Username",
   name: "user-name",
   id: "user-name",
   placeholder: "Provide Username",
   validationMessage: "Please provide username",
 }

 const passwordProps: BaseComponentProps = {
   label: "Password",
   name: "password",
   id: "password",
   placeholder: "Provide Password",
   validationMessage: "Please provide password",
 }

 const formProps: FormProps = {
   enableOffline: true,
   showValidationSummary: true,
   submitForm: (formData) => {
     fetch(/*api-ul*/, {
       body: formData,
       method: "POST",
     })
       .then((response) => response.json())
       .then(setPayload)
       .catch(console.log)
     console.log("login")
   },
 }
 const requiredValidator1: BaseValidatorProps = { name: "username_required" }
 const requiredValidator2: BaseValidatorProps = { name: "password_required" }

 return (
   <>
     <Form formProps={formProps}>
       <RequiredValidator requiredValidatorProps={requiredValidator1}>
         <TextBox textBoxProps={userNameProps} />
       </RequiredValidator>
       <RequiredValidator requiredValidatorProps={requiredValidator2}>
         <Password passwordProps={passwordProps} />
       </RequiredValidator>
       <div className="button-container">
         <button>Login</button>
       </div>
     </Form>
     {payload && (
       <>
         <h1>Pay load from server :</h1>
         <pre>{JSON.stringify(payload, null, 2)}</pre>
       </>
     )}

```

Let's try to understand what this is!

- The snippet is as follows:

| Component         | Description                                                                                                                                                                                     |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RequiredValidator | This is HOC which will make the username text box mandatory, name is mandatory attribute.                                                                                                       |
| TextBox           | This is the text box component which is provided by the library. You have to pass the textbox props that contains some common properties you have to set like name , id , label and palceholder |

```tsx

      const userNameProps: BaseComponentProps = {
          label: "Username",
          name: "user-name",
          id: "user-name",
          placeholder: "Provide Username",
          validationMessage: "Please provide username",
        }

        const requiredValidator1: BaseValidatorProps = { name: "username_required" }

        <RequiredValidator requiredValidatorProps={requiredValidator1}>
          <TextBox textBoxProps={userNameProps} />
        </RequiredValidator>


```

- The important snippet which we need to understand is <Form>

```tsx

const formProps: FormProps = {
    showValidationSummary: true,
    submitForm: (formData:FormData) => {
      fetch(/*api-ul*/, {
        body: formData,
        method: "POST",
      })
        .then((response) => response.json())
        .then(setPayload)
        .catch(console.log)
      console.log("login")
    },
  }

 <Form formProps={formProps}>
.....
</Form>

```

There are few properties on FormProps we need to understand

| PropertyName          | Description                                                                                                                                                       |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| showValidationSummary | This property will display the validation message summary at the top of the form                                                                                  |
| submitForm            | This is the callback which executes when user submits form, it has only one parameter which is of FormData type. You can simply send this to your backend server. |

### Complete Example

```tsx
import * as React from "react";
import { render } from "react-dom";

import {
  Form,
  TextBox,
  RequiredValidator,
  Password,
} from "react-form-typescript";

const App = () => {
  const formProps = {
    heading: "Login Form",
    showValidationSummary: true,
    submitForm: (formData) => {
      console.log("login");
    },
  };
  const userNameProps = {
    label: "Username",
    name: "user-name",
    id: "user-name",
    placeholder: "Provide Username",
    validationMessage: "Username is required!",
  };
  const userNameRequiredValidator = { name: "userNameRequiredValidator" };

  const passwordProps = {
    label: "Password :",
    name: "password",
    id: "password",
    placeholder: "Provide password",
    validationMessage: "Password is required!",
  };
  const passwordRequiredValidator = { name: "passwordRequiredValidator" };

  return (
    <Form formProps={formProps}>
      <RequiredValidator requiredValidatorProps={userNameRequiredValidator}>
        <TextBox textBoxProps={userNameProps} />
      </RequiredValidator>

      <RequiredValidator requiredValidatorProps={passwordRequiredValidator}>
        <Password passwordProps={passwordProps} />
      </RequiredValidator>

      <div className="button-container">
        <input type="submit" />
      </div>
    </Form>
  );
};

render(<App />, document.getElementById("app"));
```
