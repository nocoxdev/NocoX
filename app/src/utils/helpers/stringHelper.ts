export function isGuid(value: string | undefined): boolean {
  if (!value) return false;

  const guidPattern =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return guidPattern.test(value);
}

export function toCamelCase(input: string): string {
  return input.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

export function generateNewLabel(baseName: string, options: string[]) {
  const numericIndexes = options.map((option) => {
    const num = option.match(/^.*?(\d*)$/)?.[1];
    return num ? parseInt(num) : 0;
  });

  const maxIndex = Math.max(options.length, ...numericIndexes);

  return `${baseName} ${maxIndex + 1}`;
}
