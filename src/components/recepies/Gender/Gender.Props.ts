
import BaseComponentProps from "../../basic-components/BaseComponent.Propts";

export default interface GenderProps extends BaseComponentProps {
  validators?: Record<string, () => []>,
}