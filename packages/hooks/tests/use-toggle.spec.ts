import 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';

import * as hook from '$/hooks/use-toggled';

describe('use toggle hook', () => {
  describe('internalToggle', () => {
    it('toggles value', () => {
      const isToggled = false;
      const setIsToggled = sinon.stub();

      hook.internalToggle({ isToggled, setIsToggled });

      expect(setIsToggled.callCount).to.equal(1);
      expect(setIsToggled.getCall(0).args).to.deep.equal([true]);
    });
  });
});
