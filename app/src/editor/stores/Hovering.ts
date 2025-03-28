import { action, computed, makeObservable, observable } from 'mobx';
import type { Rect } from '@/types';
import { ceilRect } from '@/utils/helpers';
import { NODE_TOOLBAR_HEIGHT } from '../constants';
import type { App } from './App';
import type { Canvas } from './Canvas';
import type { Dnd } from './Dnd';

export class Hovering {
  readonly app: App;
  readonly canvas: Canvas;

  readonly dnd: Dnd;

  @observable.ref private _id?: string;
  @observable.ref private _rect?: Rect;

  constructor(app: App, canvas: Canvas, dnd: Dnd) {
    makeObservable(this);
    this.app = app;
    this.canvas = canvas;
    this.dnd = dnd;
  }

  @computed
  get id() {
    return this._id;
  }

  @computed
  get node() {
    return this.app.curPage?.findNode(this.id);
  }

  @computed
  get label() {
    return this.node?.label;
  }

  @computed
  get rect() {
    return ceilRect(this._rect);
  }

  @computed
  get visible() {
    return (
      this.node &&
      !this.dnd.dragging &&
      this.rect &&
      this.canvas.rect &&
      this.canvas.selection.id !== this.id
    );
  }

  @computed
  get styles() {
    if (!this.rect || !this.canvas.rect) return;

    const left = this.rect.left - this.canvas.rect.left;
    const top = this.rect.top - this.canvas.rect.top;

    const titleStyle = {
      left: left - 1,
      top: top - NODE_TOOLBAR_HEIGHT - 2,
    };

    const containerStyle = {
      left,
      top,
    };

    const borderStyle = {
      borderStyle: 'solid',
      borderWidth: 1,
      width: this.rect.width + 1,
      height: this.rect.height + 1,
    };

    return {
      title: titleStyle,
      container: containerStyle,
      border: borderStyle,
    };
  }

  @action
  hover(id: string | undefined) {
    if (this._id !== id) this._id = id;
  }

  @action
  resize(rect: Rect | undefined) {
    this._rect = rect;
  }

  @action
  reset() {
    this._id = '';
  }
}
