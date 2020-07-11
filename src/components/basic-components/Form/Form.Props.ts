


export type SetterFunc = ((formData: FormData) => Record<string, string>);

interface FormProps {
  heading?: string;
  enableOfflineFeature?: boolean;
  showValidationSummary?: boolean;
  name?: string;
  id?: string;
  submitForm: (formData: FormData, plainJson: Record<string, string>) => void;
  validators?: Record<string, () => Array<string | boolean>>,
  formDataSetters?: Record<string, SetterFunc>;
  pubsub?: PubSub
}

export default FormProps


export class PubSub {
  private _list: []

  constructor() {
    this._list = []
  }
  addSubscriber(eventName: string, callback: any) {
    if (!(eventName in this._list)) this._list[eventName] = []
    if (this._list[eventName].length === 0) this._list[eventName] = []
    this._list[eventName].push(callback)

  }

  publish(eventName: string, data: any) {

    const specific = this._list[eventName]
    if (specific) {
      specific.forEach(s => s(data))
    }
  }
}