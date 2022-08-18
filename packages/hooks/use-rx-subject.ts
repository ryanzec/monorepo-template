import { useEffect, useState } from 'react';
import { BehaviorSubject } from 'rxjs';

interface SubjectSubscribeEffectParams<T> {
  subject: BehaviorSubject<T>;
  setState: (value: T) => void;
}

export const subjectSubscribeEffect = <T>({ subject, setState }: SubjectSubscribeEffectParams<T>) => {
  const subscription = subject.subscribe((state) => setState(state));

  return () => {
    subscription.unsubscribe();
  };
};

export const useRxSubject = <T>(subject: BehaviorSubject<T>) => {
  const [state, setState] = useState<T>(subject.getValue());

  useEffect(() => {
    subjectSubscribeEffect({ subject, setState });
  }, [subject]);

  return state;
};
