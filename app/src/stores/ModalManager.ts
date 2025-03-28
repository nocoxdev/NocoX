import type { ModalFuncProps } from 'antd';
import { action, computed, makeObservable, observable } from 'mobx';

type ModalTypeWithoutType = Omit<ModalFuncProps, 'type'>;

export class ModalManager {
  @observable.shallow private _modals: ModalFuncProps[] = [];

  constructor() {
    makeObservable(this);
  }

  @computed
  public get modals() {
    return this._modals;
  }

  @action
  public pop() {
    if (this._modals.length > 0) {
      const item = this._modals[this._modals.length - 1];

      this._modals = this._modals.slice(0, this._modals.length - 1);

      return item;
    }
  }

  @action
  public push(modal: ModalFuncProps) {
    this._modals = [modal, ...this._modals];
  }

  public error(modal: ModalTypeWithoutType) {
    this.push({ ...modal, type: 'error' });
  }

  public info(modal: ModalTypeWithoutType) {
    this.push({ ...modal, type: 'info' });
  }

  public warning(modal: ModalTypeWithoutType) {
    this.push({ ...modal, type: 'warning' });
  }

  public success(modal: ModalTypeWithoutType) {
    this.push({ ...modal, type: 'success' });
  }

  public confirm(modal: ModalTypeWithoutType) {
    this.push({ ...modal, type: 'confirm' });
  }

  public clear() {
    this._modals = [];
  }
}
