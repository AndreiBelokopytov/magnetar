import { interval, repeatWhen, switchMap, retryWhen, tap, delayWhen, timer, of } from "rxjs";
import React from "react";

export function useIntervalRefresh(callback: () => Promise<void>, time: number) {
  const makeObservable = () =>
    of(null).pipe(
      switchMap(() => callback()),
      retryWhen((errors) =>
        errors.pipe(
          tap((err) => console.log(`error when refreshing ${err}`)),
          delayWhen(() => timer(time))
        )
      ),
      repeatWhen(() => interval(time))
    );

  const observable = React.useRef(makeObservable());
  return observable.current;
}
