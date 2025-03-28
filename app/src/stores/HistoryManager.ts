import { action, computed, makeObservable, observable } from 'mobx';

export class HistoryManager<T> {
  @observable.shallow _past: T[];
  @observable.ref _present: T;
  @observable.shallow _future: T[];

  constructor(initialPresent: T) {
    makeObservable(this);
    this._past = [];
    this._present = initialPresent;
    this._future = [];
  }

  @computed
  get past() {
    return this._past;
  }

  @computed
  get present() {
    return this._present;
  }

  @computed
  get future() {
    return this._future;
  }

  @computed
  get canUndo() {
    return this._past.length > 0;
  }

  @computed
  get canRedo() {
    return this._future.length > 0;
  }

  @action
  set(newPresent: T) {
    this._past = [...this._past, this._present];
    this._present = newPresent;
    this._future = [];
  }

  @action
  reset(newPresent: T) {
    this._past = [];
    this._present = newPresent;
    this._future = [];
  }

  @action
  undo() {
    if (this._past.length === 0) {
      return;
    }

    const present = this._past[this.past.length - 1];

    this._future = [this._present, ...this._future];
    this._present = present;
    this._past = this._past.slice(0, this._past.length - 1);
  }

  @action
  redo() {
    if (this._future.length === 0) {
      return;
    }
    const present = this._future[0];

    this._past = [...this._past, this._present];
    this._present = present;

    this._future = this._future.slice(1);
  }
}
