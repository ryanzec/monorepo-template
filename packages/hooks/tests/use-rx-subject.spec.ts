import 'mocha';
import { expect } from 'chai';
import { BehaviorSubject } from 'rxjs';
import sinon from 'sinon';

import * as hook from '$/hooks/use-rx-subject';
import { unitTestingUtils } from '$/utils/unit-testing';

interface State {
  value?: string;
}

describe('use rx subject hook', () => {
  describe('subjectSubscribeEffect', () => {
    it('works', () => {
      const subscribeReturns = {
        unsubscribe: sinon.stub(),
      };
      const subject = {
        subscribe: sinon.stub().returns(subscribeReturns),
      };
      const setState = sinon.stub();

      const cleanUpEffect = hook.subjectSubscribeEffect({
        subject: unitTestingUtils.castAnyAs<BehaviorSubject<State>>(subject),
        setState,
      });

      expect(subject.subscribe.callCount).to.equal(1);
      expect(subscribeReturns.unsubscribe.callCount).to.equal(0);

      cleanUpEffect();

      expect(subject.subscribe.callCount).to.equal(1);
      expect(subscribeReturns.unsubscribe.callCount).to.equal(1);
    });
  });
});
