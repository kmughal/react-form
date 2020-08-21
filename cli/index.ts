import { prompt, QuestionCollection, Answers } from 'inquirer';
import * as prettier from 'prettier';
import * as fs from 'fs';

const startCli = async () => {
  const firstInput = await startInput([
    {
      type: 'confirm',
      message: 'Do you want to create a new form ?',
      default: true,
      name: 'createForm',
    },
    {
      type: 'input',
      message: 'Provide a location to save the form on the disk ',
      name: 'pathToSaveFile',
      validate: function (ele) {
        const isEmpty = ele.split(' ').join('').length === 0;
        const done = this.async();
        if (isEmpty) {
          done('You must provide a path to store the file');
          return;
        }
        done(null, true);
      },
    },
    {
      type: 'confirm',
      message: 'Do you want to enable offline submission ?',
      default: true,
      name: 'enableOffline',
      when: (ans: Answers) => ans.createForm,
    },
    {
      type: 'confirm',
      message: 'Do you want to show the validation summary ?',
      default: true,
      name: 'showValidationSummary',
      when: (ans: Answers) => ans.createForm,
    },
    {
      type: 'confirm',
      message: 'Do you want to show the inline validation message ?',
      default: true,
      name: 'enableInlineValidation',
      when: (ans: Answers) => ans.createForm,
    },
    {
      type: 'input',
      message: 'Provide the heading of the form',
      name: 'heading',
      when: (ans: Answers) => ans.createForm,
    },
    {
      type: 'input',
      message: 'How many components you want to add ?',
      filter: Number,
      name: 'totalComponents',
      when: (ans: Answers) => ans.createForm,
    },
  ]);

  if (firstInput.createForm) {
    const everyThing = await startAskingAboutComponents(
      firstInput.totalComponents
    );

    everyThing.formProps = {
      enableOffline: firstInput.enableOffline,
      heading: firstInput.heading,
      enableInlineValidation: firstInput.enableInlineValidation,
      showValidationSummary: firstInput.showValidationSummary,
      submitForm: (formData: FormData) => {
        for (const [key, value] of Object.entries(formData)) {
        }
      },
    };
    everyThing.pathToSaveFile = firstInput.pathToSaveFile;
    everyThing.imports = new Set();

    createAndSaveForm(everyThing);
  }
};

function generateValidatorArg(
  validator: Answers,
  name: String,
  everyThing: Answers
): String[] {
  if (validator.validatorType === 'Required') {
    everyThing.imports.add('BaseValidatorProps');
    return [
      `
      const ${name}RequiredValidatorProps:BaseValidatorProps = { name : '${name}'}
    `,
      `${name}RequiredValidatorProps`,
    ];
  }

  if (validator.validatorType === 'Range') {
    everyThing.imports.add('RangeValidatorProps');
    return [
      `
      const ${name}RangeValidatorProps:RangeValidatorProps = { name : '${name}' , max : ${validator.max} , min: ${validator.min}}
    `,
      `${name}RangeValidatorProps`,
    ];
  }
  if (validator.validatorType === 'RegEx') {
    everyThing.imports.add('RegexValidatorProps');
    return [
      `
      const ${name}RegExValidatorProps:RegexValidatorProps = { name : '${name}' , regExp : new RegExp(item.regExp), min: ${validator.min}}
    `,
      `${name}RegExValidatorProps`,
    ];
  }
  if (validator.validatorType === 'Custom') {
    everyThing.imports.add('CustomValidatorProps');
    return [
      `
      const ${name}CustomValidatorProps:CustomValidatorProps = { name : '${name}' , validate : ele => {
        return true;
      }}
    `,
      `${name}CustomValidatorProps`,
    ];
  }
}

function createAndSaveForm(everyThing: Answers): void {
  const paramParts = [];
  const markParts = [];

  for (let index = 0; index < everyThing.length; index++) {
    const item = everyThing[index];

    const hasValidator = item.validator;
    let validatorParts = null;
    if (hasValidator)
      validatorParts = generateValidatorArg(
        item.validator,
        item.parameterName,
        everyThing
      );

    item.props.validationMessage = hasValidator
      ? item.validator.validationMessage
      : null;

    everyThing.imports.add(item.metaData.parameterType ?? 'BaseComponentProps');
    everyThing.imports.add(item.metaData.componentName);

    const param = `
        const ${item.parameterName}Arg : ${
      item.metaData.parameterType ?? 'BaseComponentProps'
    } = ${JSON.stringify(item.props, null, 2)};
      
        ${hasValidator ? validatorParts[0] : ''}
      `;

    const componentMarkup = `
      <${item.metaData.componentName} ${item.metaData.propsName}={${item.parameterName}Arg}>
      </${item.metaData.componentName}>
      `;

    everyThing.imports.add(item.validator.validatorType);

    const markup = hasValidator
      ? `
         <${item.validator.validatorType} ${item.validator.validatorProps}={${validatorParts[1]}}>
         ${componentMarkup}
         </${item.validator.validatorType}>
      `
      : componentMarkup;

    paramParts.push(param);
    markParts.push(markup);
  }

  const allParams = paramParts.join(' ');
  const allMarkups = markParts.join('');

  everyThing.imports.add('FormProps');
  everyThing.imports.add('Form');

  const importString = Array.from(everyThing.imports).join(',');
  const result = prettier.format(
    `
    import React from "react";
    import {${importString}} from "react-form-typescript";
    
      const form = () => {

        const formProps:FormProps = ${JSON.stringify(
          everyThing.formProps,
          null,
          2
        )};
        
        ${allParams}
        return (<Form formProps={formProps}>
          ${allMarkups}
          </Form>);
      }

    `,
    { singleQuote: true, parser: 'typescript', jsxSingleQuote: true }
  );

  fs.writeFileSync(everyThing.pathToSaveFile, result, { encoding: 'utf-8' });
  console.log(
    `The form ${everyThing.formProps.heading} have been created to ${everyThing.pathToSaveFile}`
  );
}

async function startAskingAboutComponents(
  totalComponents: number
): Promise<Answers> {
  const result = [];
  for (let index = 0; index < totalComponents; index++) {
    const componentType = await startInput({
      type: 'list',
      name: `type`,
      message: 'Please select the component you want to add ',
      choices: [
        'TextBox',
        'Password',
        'NumberBox',
        'Radio Button',
        'CheckBox',
        'Single File upload',
        'Multiple File upload',
        'Multiline TextBox',
        'Select Box',
      ],
    });
    const componentArgs = await getArgsForComponent(componentType);
    const validators = await startAskingAboutValidators();
    const componentMetaData = {
      metaData: getComponentMetaData(componentType.type),
    };
    const fullArgs = Object.assign(
      {},

      { props: componentArgs },
      { validator: validators },
      componentMetaData,
      {
        parameterName: String(componentArgs.name)
          .replace(' ', '')
          .replace('-', '')
          .replace('_', ''),
      }
    );
    // console.log(fullArgs);
    result.push(fullArgs);
  }
  return result;
}

function getComponentMetaData(componentType: string): Record<string, string> {
  if (componentType === 'TextBox')
    return { componentName: 'TextBox', propsName: 'textBoxProps' };
  if (componentType === 'Password')
    return { componentName: 'Password', propsName: 'passwordProps' };
  if (componentType === 'NumberBox')
    return { componentName: 'NumberBox', propsName: 'numberProps' };
  if (componentType === 'CheckBox')
    return {
      componentName: 'CheckBox',
      propsName: 'checkBoxProps',
      parameterType: 'CheckBoxProps',
    };
  if (componentType === 'Radio Button')
    return {
      componentName: 'RadioButton',
      propsName: 'radioButtonProps',
      parameterType: 'RadioButtonProps',
    };
  if (componentType === 'Select Box')
    return {
      componentName: 'SelectBox',
      propsName: 'selectBoxProps',
      parameterType: 'SelectBoxProps',
    };
  if (componentType === 'Single File upload')
    return {
      componentName: 'SingleFileUpload',
      propsName: 'singleFileUploadProps',
      parameterType: 'SingleFileUploadProps',
    };
  if (componentType === 'Multiple File upload')
    return {
      componentName: 'MultiFileUpload',
      propsName: 'multiFileUploadProps',
    };
  if (componentType === 'Multiline TextBox')
    return {
      componentName: 'MultilineTextBox',
      propsName: 'multilineTextBoxProps',
      parameterType: 'MultilineTextBoxProps',
    };
}

async function startAskingAboutValidators(): Promise<Answers> {
  const { addValidator } = await startInput([
    {
      type: 'confirm',
      message: 'Do you want to add a validator ?',
      name: 'addValidator',
      default: false,
    },
  ]);

  if (!addValidator) return null;

  const ans = await startInput([
    {
      type: 'list',
      message: 'Choose the validator :',
      choices: ['Required', 'RegEx', 'Range', 'Custom'],
      name: 'validatorType',
    },
    {
      type: 'input',
      message: 'Provide the maximum value :',
      fitler: Number,
      when: (a) => a.validatorType === 'Range',
      name: 'max',
    },
    {
      type: 'input',
      message: 'Provide the minimum value :',
      fitler: Number,
      when: (a) => a.validatorType === 'Range',
      name: 'min',
    },
    {
      type: 'input',
      message: 'Provide the regex expression :',
      fitler: Number,
      when: (a) => a.validatorType === 'RegEx',
      name: 'regExp',
    },
    {
      type: 'input',
      message: 'Provide a custom validation message :',
      fitler: String,
      name: 'validationMessage',
    },
  ]);

  if (ans.validatorType === 'Required')
    ans.validatorProps = 'requiredValidatorProps';
  else if (ans.validatorType === 'RegEx')
    ans.validatorProps = 'regexValidatorProps';
  else if (ans.validatorType === 'Range')
    ans.validatorProps = 'rangeValidatorProps';
  else if (ans.validatorType === 'Custom')
    ans.validatorProps = 'customValidator';

  return ans;
}

async function getArgsForComponent(componentType: Answers): Promise<Answers> {
  const questions = [
    {
      type: 'input',
      message: 'Provide the name of the component :',
      name: `name`,
    },
    {
      type: 'input',
      message: 'Provide the id of the component :',
      name: `id`,
    },
    {
      type: 'input',
      message: 'Provide the label of the component :',
      name: `label`,
    },
    {
      type: 'input',
      message: 'Provide the value :',
      name: `value`,
    },
    {
      type: 'input',
      message: 'Provide the columns :',
      name: `columns`,
      when: (_) => componentType.type === 'Multiline TextBox',
    },
    {
      type: 'input',
      message: 'Provide the columns :',
      name: `accept`,
      when: (_) => componentType.type === 'Single File upload',
    },
    {
      type: 'input',
      message: 'Provide the columns :',
      name: `rows`,
      when: (_) => componentType.type === 'Multiline TextBox',
    },
  ];

  const args = await startInput(questions);
  if (
    componentType.type === 'Radio Button' ||
    componentType.type === 'Select Box'
  ) {
    const optionsReplies = await startAskingAboutOptions();
    args.options = optionsReplies;
  }
  return args;
}

async function startAskingAboutOptions(): Promise<Answers> {
  const { totalOptions } = await startInput([
    {
      type: 'input',
      message: 'How many options you want to add ?',
      filter: Number,
      name: 'totalOptions',
    },
  ]);

  const result = [];
  for (let index = 0; index < totalOptions; index++) {
    {
      const { text, value } = await startInput([
        {
          type: 'input',
          message: 'Provide text of option?',
          filter: String,
          name: 'text',
        },
        {
          type: 'input',
          message: 'Provide value of option?',
          filter: String,
          name: 'value',
        },
      ]);
      result.push({ text, value });
    }
  }

  return result;
}

async function startInput(questions: QuestionCollection) {
  try {
    const result = await prompt(questions);
    return result;
  } catch (e) {
    console.log(e);
  }
}

startCli()
  .then((_) => {})
  .catch(console.error);
