import { expect, describe, it } from 'vitest';

import { autoCompleteUtils } from '$/components/auto-complete/utils';

describe('auto complete utils', () => {
  describe('defaultItemToString', () => {
    it('works', () => {
      // valid values
      expect(autoCompleteUtils.defaultItemToString(1)).to.equal('1');
      expect(autoCompleteUtils.defaultItemToString(true)).to.equal('true');
      expect(autoCompleteUtils.defaultItemToString('test')).to.equal('test');

      // falsely value the should convert
      expect(autoCompleteUtils.defaultItemToString(0)).to.equal('0');
      expect(autoCompleteUtils.defaultItemToString(false)).to.equal('false');
      expect(autoCompleteUtils.defaultItemToString('')).to.equal('');

      // falsely values the should not convert
      expect(autoCompleteUtils.defaultItemToString(null)).to.equal('');
      expect(autoCompleteUtils.defaultItemToString(undefined)).to.equal('');
    });
  });

  it.skip('TODO', () => {});
});
