import { customAlphabet } from 'nanoid';

const ALPHABET =
  '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function generateKey(prefix = '', split = '') {
  const nanoid = customAlphabet(ALPHABET, 20);
  return prefix + (split || '') + nanoid();
}
