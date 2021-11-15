import { interval, repeatWhen, switchMap, retryWhen, tap, delayWhen, timer, of } from "rxjs";
import { Disposer } from "~/utils";

export function useIntervalRefresh(callback: () => Promise<void>, time: number): Disposer {
  const observable = of(null).pipe(
    switchMap(() => callback()),
    retryWhen((errors) =>
      errors.pipe(
        tap((err) => console.log(`error when refreshing ${err}`)),
        delayWhen(() => timer(time))
      )
    ),
    repeatWhen(() => interval(time))
  );

  const subscription = observable.subscribe();
  return () => subscription.unsubscribe();
}
