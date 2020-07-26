export default class PubSub {
  private _list: [];

  constructor() {
    this._list = [];
  }
  addSubscriber(eventName: string, callback: any) {
    if (!(eventName in this._list)) this._list[eventName] = [];
    if (this._list[eventName].length === 0) this._list[eventName] = [];
    this._list[eventName].push(callback);
  }

  publish(eventName: string, data: any) {
    const specific = this._list[eventName];
    if (specific) {
      specific.forEach((s) => s(data));
    }
  }
}
