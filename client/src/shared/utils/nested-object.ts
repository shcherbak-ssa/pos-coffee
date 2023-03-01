export function isNestedObject<T>(obj: T): boolean {
  return typeof obj === 'object' && obj !== null && !(obj instanceof Date);
}
