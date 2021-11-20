import { computed, makeObservable, observable } from "mobx";

type Data<T> = T[];

export class IndexedArray<T> {
  static empty<T>() {
    return new IndexedArray<T>([], () => "0");
  }

  @computed
  get items() {
    return [...this.index.values()];
  }

  @observable
  readonly index: Map<string, T>;

  constructor(data: Data<T>, public readonly iteratee: (item: T) => string) {
    this.index = new Map<string, T>(data.map((item) => [iteratee(item), item]));
    makeObservable(this);
  }
}
