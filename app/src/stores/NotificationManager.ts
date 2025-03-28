import type { NotificationPlacement } from 'antd/es/notification/interface';
import { action, computed, makeObservable, observable } from 'mobx';

export interface NotificationType {
  type: 'error' | 'warning' | 'info' | 'success';
  content?: string;
  placement?: NotificationPlacement;
  duration?: number;
}

export class NotificationManager {
  @observable.shallow private _notifications: NotificationType[] = [];

  constructor() {
    makeObservable(this);
  }

  @computed
  public get notifications() {
    return this._notifications;
  }

  @action
  public pop() {
    if (this._notifications.length > 0) {
      const item = this._notifications[this._notifications.length - 1];

      this._notifications = this._notifications.slice(
        0,
        this._notifications.length - 1,
      );

      return item;
    }
  }

  @action
  public push(notification: NotificationType) {
    const item = {
      type: notification.type,
      message: notification.content || 'unknow error',
      placement: notification.placement || 'topRight',
      duration: notification.duration || 2,
    };

    this._notifications = [item, ...this._notifications];
  }

  public error(
    content?: string,
    placement?: NotificationPlacement,
    duration?: number,
  ) {
    this.push({ type: 'error', content, placement, duration });
  }

  public info(
    content?: string,
    placement?: NotificationPlacement,
    duration?: number,
  ) {
    this.push({ type: 'info', content, placement, duration });
  }

  public warning(
    content?: string,
    placement?: NotificationPlacement,
    duration?: number,
  ) {
    this.push({ type: 'warning', content, placement, duration });
  }

  public success(
    content?: string,
    placement?: NotificationPlacement,
    duration?: number,
  ) {
    this.push({ type: 'success', content, placement, duration });
  }

  public show(notification: NotificationType) {
    this.push(notification);
  }

  public clear() {
    this._notifications = [];
  }
}
