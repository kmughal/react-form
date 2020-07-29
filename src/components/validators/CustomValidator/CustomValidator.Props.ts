import { BaseValidatorProps } from '..';

export default interface CustomValidatorProps extends BaseValidatorProps {
  validate: (ele: HTMLInputElement | HTMLSelectElement) => boolean;
}
