import EventEmitter from 'eventemitter3';
import type { EventArgs, Noop } from '@/types';

export class EventManager {
  private readonly _eventEmitter: EventEmitter = new EventEmitter();
  private readonly _events: string[] = [];

  get events() {
    return this._events;
  }

  on(event: string, listener: (args: EventArgs) => void): Noop {
    this._eventEmitter.on(event, listener);
    this._events.push(event);

    return () => this.off(event, listener);
  }

  off(event: string, listener: (args: EventArgs) => void) {
    this._events.splice(this._events.indexOf(event), 1);
    this._eventEmitter.off(event, listener);
  }

  emit(event: string, args: EventArgs) {
    console.log('args', args);
    this._eventEmitter.emit(event, args);
  }
}
