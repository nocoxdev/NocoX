export const WIDGET_NAME_MARK = '--widget-name--';
export const WIDGET_CAN_DROP = '--can-drop';
export const WIDGET_CAN_DRAG = '--can-drag';
export const IS_WIDGET_CLASS = '--is-widget';
export const IS_WIDGET_DRAG_HANDLE_CLASS = '--is-widget-drag-handle';
export const WIDGET_DROP_AREA = '--is-widget-drop-area';
export const WIDGET_DROP_AREA_SELECTOR = `.${WIDGET_DROP_AREA}`;
export const DRAG_HANDLE_SELECTOR = `.${IS_WIDGET_DRAG_HANDLE_CLASS}`;
export const WIDGET_SELECTOR = `.${IS_WIDGET_CLASS}`;
export const WIDGET_CAN_DRAG_SELECTOR = `.${IS_WIDGET_CLASS}.${WIDGET_CAN_DRAG}`;
export const WIDGET_NAME_REGEX = /--widget-name--([^\s]+)/;
