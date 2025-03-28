import { action, computed, makeObservable, observable } from 'mobx';

export interface MessageType {
  type: 'error' | 'warning' | 'info' | 'success';
  content?: string;
}

export class MessageManager {
  @observable.shallow private _messages: MessageType[] = [];

  constructor() {
    makeObservable(this);
  }

  @computed
  public get messages() {
    return this._messages;
  }

  @action
  public pop() {
    if (this._messages.length > 0) {
      const item = this._messages[this._messages.length - 1];

      this._messages = this._messages.slice(0, this._messages.length - 1);

      return item;
    }
  }

  @action
  public push(message: MessageType) {
    const item = {
      type: message.type,
      content: message.content || 'Unknow error',
    };

    this._messages = [item, ...this._messages];
  }

  public error(content?: string) {
    this.push({ type: 'error', content });
  }

  public info(content?: string) {
    this.push({ type: 'info', content });
  }

  public warning(content?: string) {
    this.push({ type: 'warning', content });
  }

  public success(content?: string) {
    this.push({ type: 'success', content });
  }

  public show(message: MessageType) {
    this.push(message);
  }

  public clear() {
    this._messages = [];
  }
}
