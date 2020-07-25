import BaseComponentProps from "../../basic-components/BaseComponent.Props";

export default interface GenderProps extends BaseComponentProps {
  validators?: Record<string, () => []>;
}
