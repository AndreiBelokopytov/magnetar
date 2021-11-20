import { keyBy, values } from "lodash";

type Data<T> = T[] | undefined;

export class IndexedArray<T> {
  static empty<T>() {
    return new IndexedArray<T>([], () => "0");
  }

  get items() {
    return values(this._index);
  }

  private readonly _index: Record<string, T>;

  constructor(data: Data<T>, public readonly iteratee: (item: T) => string) {
    this._index = keyBy(data, this.iteratee);
  }

  getItem(key: string): T | undefined {
    return this._index[key];
  }

  setItem(item: T) {
    this._index[this.iteratee(item)] = item;
  }

  deleteItem(item: T) {
    delete this._index[this.iteratee(item)];
  }
}
