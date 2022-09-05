import 'mocha';
import { expect } from 'chai';
import React from 'react';
import sinon from 'sinon';

import * as component from '$/components/auto-complete/auto-complete-selected-item';

describe('auto complete selected item component', () => {
  describe('internalOnDelete', () => {
    it('works', () => {
      const onDelete = sinon.stub();
      const value = 'test';

      component.internalOnDelete({ onDelete, value });

      expect(onDelete.callCount).to.equal(1);
      expect(onDelete.getCall(0).args).to.deep.equal([value]);
    });
  });
});
