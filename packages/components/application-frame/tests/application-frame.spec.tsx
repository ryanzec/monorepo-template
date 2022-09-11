import 'mocha';
import { expect } from 'chai';
import React from 'react';
import sinon from 'sinon';

import * as component from '$/components/application-frame/application-frame';
import { ThemeName } from '$/utils/style';
import { unitTestingUtils } from '$/utils/unit-testing';

describe('application frame component', () => {
  describe('internalOnLogout', () => {
    it('works', () => {
      const event = {
        preventDefault: sinon.stub(),
        stopPropagation: sinon.stub(),
      };
      const logout = sinon.stub();

      component.internalOnLogout({
        event: unitTestingUtils.castAnyAs<React.MouseEvent<HTMLButtonElement, MouseEvent>>(event),
        logout,
      });

      expect(event.preventDefault.callCount).to.equal(1);
      expect(event.preventDefault.getCall(0).args).to.deep.equal([]);
      expect(event.stopPropagation.callCount).to.equal(1);
      expect(event.stopPropagation.getCall(0).args).to.deep.equal([]);
      expect(logout.callCount).to.equal(1);
      expect(logout.getCall(0).args).to.deep.equal([]);
    });
  });

  describe('internalOnToggleTheme', () => {
    it('toggle to light', () => {
      const event = {
        preventDefault: sinon.stub(),
        stopPropagation: sinon.stub(),
      };
      const theme = ThemeName.DARK;
      const setTheme = sinon.stub();

      component.internalOnToggleTheme({
        event: unitTestingUtils.castAnyAs<React.MouseEvent<HTMLButtonElement, MouseEvent>>(event),
        theme,
        setTheme,
      });

      expect(event.preventDefault.callCount).to.equal(1);
      expect(event.preventDefault.getCall(0).args).to.deep.equal([]);
      expect(event.stopPropagation.callCount).to.equal(1);
      expect(event.stopPropagation.getCall(0).args).to.deep.equal([]);
      expect(setTheme.callCount).to.equal(1);
      expect(setTheme.getCall(0).args).to.deep.equal([ThemeName.LIGHT]);
    });

    it('toggle to dark', () => {
      const event = {
        preventDefault: sinon.stub(),
        stopPropagation: sinon.stub(),
      };
      const theme = ThemeName.LIGHT;
      const setTheme = sinon.stub();

      component.internalOnToggleTheme({
        event: unitTestingUtils.castAnyAs<React.MouseEvent<HTMLButtonElement, MouseEvent>>(event),
        theme,
        setTheme,
      });

      expect(event.preventDefault.callCount).to.equal(1);
      expect(event.preventDefault.getCall(0).args).to.deep.equal([]);
      expect(event.stopPropagation.callCount).to.equal(1);
      expect(event.stopPropagation.getCall(0).args).to.deep.equal([]);
      expect(setTheme.callCount).to.equal(1);
      expect(setTheme.getCall(0).args).to.deep.equal([ThemeName.DARK]);
    });
  });
});
