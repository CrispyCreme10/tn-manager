export class LocalStorageHandler {
  static keyPrefix: string = "app-";

  static setItem(key: string, value: any) {
    localStorage.setItem(this.keyPrefix + key, JSON.stringify(value));
  }

  static getItem<T>(key: string): T | null {
    const value = localStorage.getItem(this.keyPrefix + key);
    return value ? JSON.parse(value) as T : null;
  }
}