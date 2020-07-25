import BaseComponentProps from "../BaseComponent.Props";

interface SingleFileUploadProps extends BaseComponentProps {
  /**
   * accept is the property which can used to limit the type of files
   */
  accept?: string;
}

export default SingleFileUploadProps;
