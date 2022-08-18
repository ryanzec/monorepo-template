import 'mocha';
import { expect } from 'chai';
import { BehaviorSubject } from 'rxjs';

import { applicationSettingsStoreUtils } from '$/stores/application-settings-store';
import { ThemeName } from '$/types/styles';

interface State {
  value?: string;
}

describe('application settings store', () => {
  describe('setTheme', () => {
    it('works', () => {
      const subject = new BehaviorSubject(applicationSettingsStoreUtils.initialState);
      expect(subject.getValue().theme).to.equal(ThemeName.LIGHT);

      applicationSettingsStoreUtils.setTheme(subject, ThemeName.DARK);

      expect(subject.getValue().theme).to.equal(ThemeName.DARK);
    });
  });
});
