import { action, computed, makeObservable, observable } from 'mobx';
import type { Position, Rect } from '@/types';
import { ceilRect } from '@/utils/helpers';
import type { App } from './App';
import { Dnd } from './Dnd';
import { Hovering } from './Hovering';
import { Selection } from './Selection';

export class Canvas {
  readonly app: App;
  readonly selection: Selection;
  readonly hovering: Hovering;
  readonly dnd: Dnd;

  @observable.ref private _rect?: Rect;
  @observable.ref private _scollPosition?: Position;
  constructor(app: App) {
    makeObservable(this);
    this.app = app;
    this.dnd = new Dnd(app, this);
    this.selection = new Selection(app, this, this.dnd);
    this.hovering = new Hovering(app, this, this.dnd);
  }

  @computed
  get rect() {
    return ceilRect(this._rect);
  }

  @computed
  get scollPosition() {
    return this._scollPosition;
  }

  @action
  resize(value: Rect | undefined) {
    this._rect = value;
  }

  @action
  scroll(value: Position | undefined) {
    this._scollPosition = value;
  }
}
