import { FormProps } from "../../components/basic-components";

function generateTemplate(type, name, label, placeholder) {

  const metadata = {
    text: {
      typeProps: "BaseComponentProps",
      typeName: "TextBox",
      typePropsName: "textBoxProps"
    }
  };

  return "";

  // const { typeProps, typePropsName, typeName = metadata[type]
  // return (`
  // const props:${typeProps} : {
  //   name : "${name}",
  //   id : "${name}",
  //   label : "${label}",
  //   placeholder : "${placeholder}"
  // };
  // <${typeName} ${typePropsName}={props}/>
  // `)



}

const formBuilderProps: FormProps = {
  submitForm: (_, plainJson) => {
    debugger
    const componentType = plainJson["form-builder_component-options"]
    const name = plainJson["component-name"]
    const label = plainJson["label-name"]
    const placeholder = plainJson["placeholder-text"]

    generateTemplate(componentType, name, label, placeholder)
  }
}

export { formBuilderProps }