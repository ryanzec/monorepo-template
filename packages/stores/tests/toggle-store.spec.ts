import { expect, describe, it } from 'vitest';

import { toggleStoreUtils } from '$/stores/toggle-store';

interface State {
  value?: string;
}

describe('toggle store', () => {
  describe('generateSubject', () => {
    it('works with initial state', () => {
      const results = toggleStoreUtils.generateSubject();

      expect(results.getValue().isToggled).to.equal(false);
    });

    it('works with overriding initial state', () => {
      const results = toggleStoreUtils.generateSubject({ isToggled: true });

      expect(results.getValue().isToggled).to.equal(true);
    });
  });

  describe('toggleValue', () => {
    it('toggles when not toggled', () => {
      const subject = toggleStoreUtils.generateSubject();

      toggleStoreUtils.toggleValue(subject);

      expect(subject.getValue().isToggled).to.equal(true);
    });

    it('toggles when already toggled', () => {
      const subject = toggleStoreUtils.generateSubject({ isToggled: true });

      toggleStoreUtils.toggleValue(subject);

      expect(subject.getValue().isToggled).to.equal(false);
    });
  });

  describe('setIsToggled', () => {
    it('sets toggled to true', () => {
      const subject = toggleStoreUtils.generateSubject();

      toggleStoreUtils.setIsToggled(subject, true);

      expect(subject.getValue().isToggled).to.equal(true);
    });

    it('sets toggled to false', () => {
      const subject = toggleStoreUtils.generateSubject({ isToggled: true });

      toggleStoreUtils.setIsToggled(subject, false);

      expect(subject.getValue().isToggled).to.equal(false);
    });
  });
});
