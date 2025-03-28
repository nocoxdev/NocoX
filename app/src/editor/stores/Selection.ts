import { action, computed, makeObservable, observable } from 'mobx';
import type { Rect } from '@/types';
import { ceilRect } from '@/utils/helpers';
import { NODE_TOOLBAR_HEIGHT } from '../constants';
import type { App } from './App';
import type { Canvas } from './Canvas';
import type { Dnd } from './Dnd';

export class Selection {
  readonly app: App;
  readonly canvas: Canvas;
  readonly dnd: Dnd;

  @observable private _id: string | undefined = undefined;
  @observable private _rect: Rect | undefined = undefined;

  constructor(app: App, canvas: Canvas, dnd: Dnd) {
    makeObservable(this);
    this.app = app;
    this.dnd = dnd;
    this.canvas = canvas;
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
  get icon() {
    return this.node?.widget.icon;
  }

  @computed
  get rect() {
    return ceilRect(this._rect);
  }

  @computed
  get visible() {
    return this.node && this.rect && this.canvas.rect && !this.dnd.dragging;
  }

  @computed
  get styles() {
    if (!this.rect || !this.canvas.rect) return;
    const left = this.rect.left - this.canvas.rect.left;
    const top = this.rect.top - this.canvas.rect.top;

    const containerStyle = {
      ...this.rect,
      left,
      top,
    };

    const borderStyle = {
      borderStyle: 'solid',
      borderWidth: 1,
      width: this.rect.width + 1,
      height: this.rect.height + 1,
    };

    const toolbarStyle = {
      left: left - 1,
      top: top - NODE_TOOLBAR_HEIGHT - 2,
    };
    return {
      container: containerStyle,
      border: borderStyle,
      toolbar: toolbarStyle,
    };
  }

  @action
  select(id?: string) {
    if (this._id !== id) {
      this._id = id;
    }
  }

  @action
  resize(rect: Rect | undefined) {
    this._rect = rect;
  }

  @action
  clear() {
    this._id = undefined;
    this._rect = undefined;
  }
}
