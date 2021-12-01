import { computed, observe } from "mobx";
import { Observable, Observer } from "rxjs";

type Options = {
  fireImmediately?: boolean;
};

export function toStream<T>(expression: () => T, options: Options = {}): Observable<T> {
  const value = computed(expression);
  const fireImmediately = options.fireImmediately ?? true;

  return new Observable((observer: Observer<T>) => {
    const unsubscribe = observe(value, (change) => observer.next(change.object.get()), fireImmediately);
    return {
      unsubscribe,
    };
  });
}
