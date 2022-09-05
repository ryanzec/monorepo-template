import 'mocha';
import { expect } from 'chai';
import React from 'react';
import sinon from 'sinon';

import * as component from '$/components/application-frame/application-frame-navigation-item';

describe('application frame navigation item component', () => {
  describe('internalOnNavigation', () => {
    it('works', () => {
      const navigate = sinon.stub();
      const navigateTo = '/test';

      component.internalOnNavigation({
        navigate,
        navigateTo,
      });

      expect(navigate.callCount).to.equal(1);
      expect(navigate.getCall(0).args).to.deep.equal([navigateTo]);
    });
  });
});
