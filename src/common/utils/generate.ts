import { ulid } from 'ulid';

export function generateId(prefix?: string): string {
  const id = ulid();
  prefix = prefix ? `${prefix}_` : '';
  return `${prefix}${id}`;
}
