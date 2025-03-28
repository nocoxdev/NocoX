import { action, computed, makeObservable, observable } from 'mobx';
import type { DragData, DraggingInfo, DropInfo, Indication } from '@/types';
import type { App } from './App';
import type { Canvas } from './Canvas';

export class Dnd {
  readonly app: App;
  readonly canvas: Canvas;

  @observable private _dragging: boolean = false;
  @observable.ref private _dragData?: DragData;
  @observable.ref private _dropInfo?: DropInfo;
  @observable.ref private _draggingInfo?: DraggingInfo;
  @observable.ref private _indication?: Indication;

  constructor(app: App, canvasStore: Canvas) {
    makeObservable(this);
    this.app = app;
    this.canvas = canvasStore;
  }

  @computed
  get dragging() {
    return this._dragging;
  }

  @computed
  get position() {
    return this._draggingInfo?.position;
  }

  @computed
  get dragData() {
    return this._dragData;
  }

  @computed
  get dropInfo() {
    return this._dropInfo;
  }

  @computed
  get draggingInfo() {
    return this._draggingInfo;
  }

  @computed
  get indication() {
    return this._indication;
  }

  @computed
  get dragNode() {
    return this.app.curPage?.findNode(this._dragData?.dragId);
  }

  @computed
  get dropNode() {
    return this.app.curPage?.findNode(this._dropInfo?.dropId);
  }

  @computed
  get allowDrop() {
    return this.checkCanDrop();
  }

  @action
  drag(data: DragData) {
    this._dragging = true;
    this._dragData = data;
  }

  @action
  move(draggingInfo?: DraggingInfo) {
    this._draggingInfo = draggingInfo;
  }

  @action
  drop() {
    if (!this._dragData || !this.allowDrop || !this._dropInfo) {
      this.reset();
      return;
    }

    const { dragId: dragNodeId, name: dragWidgetName, type } = this._dragData;
    const { dropId: dropNodeId, placement } = this._dropInfo;

    const node = this.app.curPage?.findNode(dropNodeId);

    if (dropNodeId && this.app.curPage && node && placement) {
      let pid = node.parent?.id || '';
      let index = node.index;

      if (placement === 'inner') {
        pid = dropNodeId || '';
        index = 0;
      } else if (placement === 'after') {
        index++;
      }

      if (type === 'add') {
        if (dragWidgetName) {
          this.app.curPage?.addNode(
            pid,
            index,
            dragWidgetName,
            'children',
            false,
          );
        }
      } else {
        const soruceNode = this.app.curPage?.findNode(dragNodeId);

        const toIndex =
          soruceNode?.parent?.id === pid && index > soruceNode.index
            ? index - 1
            : index;

        this.app.curPage?.moveNode(dragNodeId, pid, toIndex);
      }
    }
    this.reset();
  }

  @action
  setDropInfo(info?: DropInfo) {
    this._dropInfo = info;
  }

  @action
  setIndication(indication?: Indication) {
    this._indication = indication;
  }

  @action
  reset() {
    this._dragging = false;
    this._dropInfo = undefined;
    this._dragData = undefined;
    this._indication = undefined;
    this._draggingInfo = undefined;
  }

  checkCanDrop() {
    const {
      dragId: dragNodeId,
      name: dragWidgetName,
      type,
    } = this._dragData || {};

    const { dropId: dropNodeId, placement } = this._dropInfo || {};

    const dragNode = this.app.curPage?.findNode(dragNodeId);

    const dragWidget =
      type === 'add'
        ? this.app.widgetStore.find(dragWidgetName)
        : dragNode?.widget;

    const dropNode = this.app.curPage?.findNode(dropNodeId);

    if (!dropNode || !dragWidget) {
      return false;
    }

    const dropInNode = placement === 'inner' ? dropNode : dropNode?.parent;

    if (!dropInNode) {
      return false;
    }

    if (dropInNode.widget.canDrop === false) {
      return false;
    }

    const srcLimit = dragWidget?.limit;

    if (srcLimit?.ancestor && srcLimit.ancestor.length > 0) {
      const isAncestorAllowed = dropInNode.ancestors
        .concat(dropInNode)
        .some((item) => srcLimit.ancestor?.includes(item.widget.name));

      if (!isAncestorAllowed) {
        return false;
      }
    }

    if (
      srcLimit?.parent &&
      srcLimit.parent.length > 0 &&
      !srcLimit.parent.includes(dropInNode.widget.name)
    ) {
      return false;
    }

    const dstLimit = dropInNode?.widget.limit;

    if (dstLimit?.childrenMaxCount !== undefined) {
      const count = dropInNode?.children.length || 0;
      if (count >= dstLimit.childrenMaxCount) {
        return false;
      }
    }

    if (
      dstLimit?.children &&
      dstLimit.children.length > 0 &&
      !dstLimit.children.includes(dragWidget.name)
    ) {
      return false;
    }

    if (type === 'update') {
      if (!dragNode) {
        return false;
      }

      const isSelf = dragNode.id === dropInNode.id;

      const IsInner = dropInNode.ancestors
        .concat(dropInNode)
        .map((item) => item.id)
        .includes(dragNode.id);

      if (isSelf || IsInner) {
        return false;
      }
    }

    return true;
  }
}
