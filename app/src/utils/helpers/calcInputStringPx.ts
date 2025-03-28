export function calcInputStringPx(text: string, basePx: number): number {
  let width = 0;
  for (let i = 0; i < text.length; i++) {
    const ch = text.charAt(i);
    if (/[\u4e00-\u9fa5]/.test(ch)) {
      width += basePx * 2;
    } else {
      width += basePx * 1.5;
    }
  }

  return width;
}
