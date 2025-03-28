export function calcPositon(x: number, y: number, radius: number) {
  let newX = x;
  let newY = y;

  if (Math.abs(x) > radius || Math.abs(y) > radius) {
    if (x === 0) {
      newX = 0;
      newY = Math.sign(y) * radius;
    } else {
      if (Math.abs(y / x) > 1) {
        newX = Math.sign(x) * Math.abs((x * radius) / y);
        newY = Math.sign(y) * radius;
      } else {
        newX = Math.sign(x) * radius;
        newY = Math.sign(y) * Math.abs((y * radius) / x);
      }
    }
  }
  return { x: newX, y: newY };
}
