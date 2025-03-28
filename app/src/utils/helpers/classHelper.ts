export function getClassWithPrefix(
  classList: DOMTokenList | undefined,
  prefix: string,
): string {
  if (!classList) return '';

  let result = '';

  for (let i = 0; i < classList.length; i++) {
    const item = classList.item(i);
    if (item && item.startsWith(prefix)) {
      result = item;
      break;
    }
  }

  return result;
}
