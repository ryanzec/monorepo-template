import React, { useState } from 'react';
import * as reactUtils from '$utils/react';
import { mount } from '@cypress/react';

interface TestContext {
  test: string;
  setTest: (value: string) => void;
}

const testContextDefaultValues: TestContext = {
  test: 'default value',
  setTest: () => {},
};

const testContext = reactUtils.buildContext<TestContext>(testContextDefaultValues, () => {
  const [test, setTest] = useState<string>(testContextDefaultValues.test);

  return {
    test,
    setTest,
  };
});

const MockConsumerComponent = () => {
  const { test, setTest } = testContext.useContext();
  return (
    <div>
      <button data-id="set-test-button" onClick={() => setTest('updated')}>
        set is loading
      </button>
      <div data-id="test-check">test: {test}</div>
    </div>
  );
};

const MockComponent = () => {
  return (
    <testContext.Provider>
      <MockConsumerComponent />
    </testContext.Provider>
  );
};

const selectors = {
  setTestButton: '[data-id="set-test-button"]',
  testCheck: '[data-id="test-check"]',
};

describe('authentication context', () => {
  it('works properly when logged in check is valid', () => {
    mount(<MockComponent />);

    cy.get(selectors.testCheck).contains('default value');

    cy.get(selectors.setTestButton).click();

    cy.get(selectors.testCheck).contains('updated');
  });
});
