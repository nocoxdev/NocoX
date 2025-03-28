export const convert = (value: string | undefined) => {
  if (!value) {
    return {
      x: 0,
      y: 0,
      blur: 0,
      spread: 0,
      color: '#00000000',
    };
  }

  const [x, y, blur, spread, color] = value.split(' ');
  return {
    x: parseInt(x),
    y: parseInt(y),
    blur: parseInt(blur),
    spread: parseInt(spread),
    color,
  };
};
