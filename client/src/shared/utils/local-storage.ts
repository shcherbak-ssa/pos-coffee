import type { LocalStorageKey } from 'shared/constants';

export class LocalStorage {

  public static has(key: LocalStorageKey): boolean {
    return !!localStorage.getItem(key);
  }

  public static get<T>(key: LocalStorageKey): T | null {
    const value: string | null = localStorage.getItem(key);

    return value ? JSON.parse(value) as T : null;
  }

  public static set<T>(key: LocalStorageKey, value: T): void {
    const jsonValue: string = JSON.stringify(value);

    localStorage.setItem(key, jsonValue);
  }

  public static remove(key: LocalStorageKey): void {
    localStorage.removeItem(key);
  }

}
