import { BehaviorSubject } from 'rxjs';
import { expect, describe, it, vi } from 'vitest';

import * as hook from '$/hooks/use-rx-subject';
import { unitTestingUtils } from '$/utils/unit-testing';

interface State {
  value?: string;
}

describe('use rx subject hook', () => {
  describe('subjectSubscribeEffect', () => {
    it.only('works', () => {
      const subscribeReturns = {
        unsubscribe: vi.fn(),
      };
      const subject = {
        subscribe: vi.fn().mockImplementation(() => subscribeReturns),
      };
      const setState = vi.fn();

      const cleanUpEffect = hook.subjectSubscribeEffect({
        subject: unitTestingUtils.castAnyAs<BehaviorSubject<State>>(subject),
        setState,
      });

      expect(subject.subscribe).toHaveBeenCalledTimes(1);
      expect(subscribeReturns.unsubscribe).toHaveBeenCalledTimes(0);

      cleanUpEffect();

      expect(subject.subscribe).toHaveBeenCalledTimes(1);
      expect(subscribeReturns.unsubscribe).toHaveBeenCalledTimes(1);

      // @todo figure out how to change set to set the setState() mock
    });
  });
});
