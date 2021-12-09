import { interval, repeatWhen, switchMap, retryWhen, tap, delayWhen, timer, of, Observable, defer } from "rxjs";

export function createIntervalObservable(callback: () => Promise<void>, time: number, source$?: Observable<unknown>) {
  const callback$ = defer(() => callback()).pipe(
    repeatWhen(() => interval(time)),
    retryWhen((errors) =>
      errors.pipe(
        tap((err) => console.log(`Interval observable can't execute a callback function: ${err}`)),
        delayWhen(() => timer(time))
      )
    )
  );

  return (source$ != null ? source$ : of(null)).pipe(switchMap(() => callback$));
}
