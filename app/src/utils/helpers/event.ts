type EventListenerCallback = (event: any) => void;

export function on(
  eventName: string,
  callback: EventListenerCallback,
  target: Element | Document,
  useCapture = false,
) {
  if (target.addEventListener) {
    target.addEventListener(eventName, callback, useCapture);
  }

  return () => off(eventName, callback, target, useCapture);
}

export function off(
  eventName: string,
  callback: EventListenerCallback,
  target: Element | Document,
  useCapture = false,
) {
  if (target.removeEventListener) {
    target.removeEventListener(eventName, callback, useCapture);
  }
}
