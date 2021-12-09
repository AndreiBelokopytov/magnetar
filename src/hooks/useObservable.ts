import React from "react";
import { Observable, Subscription } from "rxjs";

export const useObservable = (observable: Observable<unknown>) => {
  const subscriptionRef = React.useRef<Subscription | undefined>();
  if (!subscriptionRef.current) {
    subscriptionRef.current = observable.subscribe();
  }
  React.useEffect(() => {
    return () => {
      subscriptionRef.current?.unsubscribe();
    };
  }, []);
};
