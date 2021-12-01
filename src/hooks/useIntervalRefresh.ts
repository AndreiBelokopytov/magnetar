import { interval, repeatWhen, switchMap, retryWhen, tap, delayWhen, timer, of, Observable, defer } from "rxjs";
import React from "react";

export function useIntervalRefresh(callback: () => Promise<void>, time: number, source$?: Observable<unknown>) {
  const refresh$ = defer(() => callback()).pipe(
    repeatWhen(() => interval(time)),
    retryWhen((errors) =>
      errors.pipe(
        tap((err) => console.log(`error when refreshing ${err}`)),
        delayWhen(() => timer(time))
      )
    )
  );

  const makeObservable = () => (source$ != null ? source$ : of(null)).pipe(switchMap(() => refresh$));

  const observable = React.useRef(makeObservable());
  return observable.current;
}
