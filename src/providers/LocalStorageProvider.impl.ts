import { PersistentStorageProvider } from "./PersistentStorageProvider";
import { v5 as uuid } from "uuid";

const MY_NAMESPACE = "1b671a64-40d5-491e-99b0-da01ff1f3341";

export class LocalStorageProviderImpl<T> implements PersistentStorageProvider<T> {
  private readonly _key: string;

  async fetch(): Promise<T | undefined> {
    const item = localStorage.getItem(this._key);

    return item ? JSON.parse(item) : undefined;
  }

  async update(value: T) {
    localStorage.setItem(this._key, JSON.stringify(value));
  }

  async clear() {
    localStorage.removeItem(this._key);
  }

  constructor(key: string) {
    this._key = uuid(key, MY_NAMESPACE);
  }
}
