export function base64Encode(str: string) {
  return window.btoa(
    str.replace(/[\u00A0-\u2666]/g, (c) => `&#${c.charCodeAt(0)};`),
  );
}

export function base64Decode(str: string) {
  return window.atob(str);
}
