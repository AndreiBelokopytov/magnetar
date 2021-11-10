import { Dictionary, keyBy } from "lodash";

type Data<T> = T[] | undefined;

export class IndexedArray<T> {
  static empty<T>() {
    return new IndexedArray<T>([], () => 0);
  }

  readonly index: Dictionary<T>;

  get items() {
    return this._data ?? [];
  }

  constructor(private _data: Data<T>, public readonly iteratee: (item: T) => string | number) {
    this.index = keyBy(this.items, this.iteratee);
  }
}
