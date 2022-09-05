import 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';

import * as context from '$/contexts/authentication';
import { LOCAL_STORAGE_AUTHENTICATION_TOKEN_KEY } from '$/contexts/authentication';
import { apiUtils } from '$/utils/api';
import { localStorageCacheUtils } from '$/utils/local-storage-cache';

describe('authentication context', () => {
  describe('internalLogin', () => {
    it('internalLogin handles login with successful response', async () => {
      const authenticationToken = 'token';
      const setIsAuthenticated = sinon.stub();
      const setLoginRedirectUrl = sinon.stub();

      const postStubReturns = {
        data: {
          authenticationToken,
        },
      };
      const apiPostStub = sinon.stub(apiUtils.appApi, 'post').resolves(postStubReturns);

      const localStorageSetStub = sinon.stub(localStorageCacheUtils, 'set');

      await context.internalLogin({ setLoginRedirectUrl, setIsAuthenticated });

      apiPostStub.restore();
      localStorageSetStub.restore();

      expect(apiPostStub.callCount).to.equal(1);
      expect(apiPostStub.getCall(0).args).to.deep.equal(['/authenticate']);
      expect(localStorageSetStub.callCount).to.equal(1);
      expect(localStorageSetStub.getCall(0).args).to.deep.equal([
        LOCAL_STORAGE_AUTHENTICATION_TOKEN_KEY,
        authenticationToken,
      ]);
      expect(setIsAuthenticated.callCount).to.equal(1);
      expect(setIsAuthenticated.getCall(0).args).to.deep.equal([true]);
      expect(setLoginRedirectUrl.callCount).to.equal(1);
      expect(setLoginRedirectUrl.getCall(0).args).to.deep.equal(['/home']);
    });

    it('internalLogin handles login with failed response', async () => {
      const authenticationToken = 'token';
      const setIsAuthenticated = sinon.stub();
      const setLoginRedirectUrl = sinon.stub();

      const postStubReturns = {};
      const apiPostStub = sinon.stub(apiUtils.appApi, 'post').rejects(postStubReturns);

      const localStorageSetStub = sinon.stub(localStorageCacheUtils, 'set');

      await context.internalLogin({ setLoginRedirectUrl, setIsAuthenticated });

      apiPostStub.restore();
      localStorageSetStub.restore();

      expect(apiPostStub.callCount).to.equal(1);
      expect(apiPostStub.getCall(0).args).to.deep.equal(['/authenticate']);
      expect(localStorageSetStub.callCount).to.equal(0);
      expect(setIsAuthenticated.callCount).to.equal(1);
      expect(setIsAuthenticated.getCall(0).args).to.deep.equal([false]);
      expect(setLoginRedirectUrl.callCount).to.equal(1);
      expect(setLoginRedirectUrl.getCall(0).args).to.deep.equal(['/login']);
    });
  });

  describe('internalFinishLogin', () => {
    it('works', async () => {
      const setLoginRedirectUrl = sinon.stub();

      await context.internalFinishLogin({ setLoginRedirectUrl });

      expect(setLoginRedirectUrl.callCount).to.equal(1);
      expect(setLoginRedirectUrl.getCall(0).args).to.deep.equal(['']);
    });
  });

  describe('internalLogout', () => {
    it('works', async () => {
      const setIsAuthenticated = sinon.stub();
      const setLoginRedirectUrl = sinon.stub();

      const localStorageRemoveStub = sinon.stub(localStorageCacheUtils, 'remove');

      await context.internalLogout({ setLoginRedirectUrl, setIsAuthenticated });

      localStorageRemoveStub.restore();

      expect(localStorageRemoveStub.callCount).to.equal(1);
      expect(localStorageRemoveStub.getCall(0).args).to.deep.equal([LOCAL_STORAGE_AUTHENTICATION_TOKEN_KEY]);
      expect(setIsAuthenticated.callCount).to.equal(1);
      expect(setIsAuthenticated.getCall(0).args).to.deep.equal([false]);
      expect(setLoginRedirectUrl.callCount).to.equal(1);
      expect(setLoginRedirectUrl.getCall(0).args).to.deep.equal(['/login']);
    });
  });

  describe('internalCheckAuthentication', () => {
    it('handle when there is not cached authentication', async () => {
      const setIsAuthenticated = sinon.stub();
      const setIsLoading = sinon.stub();

      const localStorageGetStub = sinon.stub(localStorageCacheUtils, 'get');

      const apiGetStub = sinon.stub(apiUtils.appApi, 'get').resolves();

      await context.internalCheckAuthentication({ setIsAuthenticated, setIsLoading });

      localStorageGetStub.restore();
      apiGetStub.restore();

      expect(localStorageGetStub.callCount).to.equal(1);
      expect(localStorageGetStub.getCall(0).args).to.deep.equal([LOCAL_STORAGE_AUTHENTICATION_TOKEN_KEY]);
      expect(apiGetStub.callCount).to.equal(0);
      expect(setIsAuthenticated.callCount).to.equal(1);
      expect(setIsAuthenticated.getCall(0).args).to.deep.equal([false]);
      expect(setIsLoading.callCount).to.equal(1);
      expect(setIsLoading.getCall(0).args).to.deep.equal([false]);
    });

    it('handle when there is cached authentication with successful response', async () => {
      const cachedAuthenticationToken = 'token';
      const setIsAuthenticated = sinon.stub();
      const setIsLoading = sinon.stub();

      const localStorageGetStub = sinon.stub(localStorageCacheUtils, 'get').returns(cachedAuthenticationToken);

      const apiGetStub = sinon.stub(apiUtils.appApi, 'get').resolves();

      await context.internalCheckAuthentication({ setIsAuthenticated, setIsLoading });

      localStorageGetStub.restore();
      apiGetStub.restore();

      expect(localStorageGetStub.callCount).to.equal(1);
      expect(localStorageGetStub.getCall(0).args).to.deep.equal([LOCAL_STORAGE_AUTHENTICATION_TOKEN_KEY]);
      expect(apiGetStub.callCount).to.equal(1);
      expect(apiGetStub.getCall(0).args).to.deep.equal([`/authenticate/${cachedAuthenticationToken}`]);
      expect(setIsAuthenticated.callCount).to.equal(1);
      expect(setIsAuthenticated.getCall(0).args).to.deep.equal([true]);
      expect(setIsLoading.callCount).to.equal(1);
      expect(setIsLoading.getCall(0).args).to.deep.equal([false]);
    });

    it('handle when there is cached authentication with failed response', async () => {
      const cachedAuthenticationToken = 'token';
      const setIsAuthenticated = sinon.stub();
      const setIsLoading = sinon.stub();

      const localStorageGetStub = sinon.stub(localStorageCacheUtils, 'get').returns(cachedAuthenticationToken);

      const apiGetStub = sinon.stub(apiUtils.appApi, 'get').rejects();

      await context.internalCheckAuthentication({ setIsAuthenticated, setIsLoading });

      localStorageGetStub.restore();
      apiGetStub.restore();

      expect(localStorageGetStub.callCount).to.equal(1);
      expect(localStorageGetStub.getCall(0).args).to.deep.equal([LOCAL_STORAGE_AUTHENTICATION_TOKEN_KEY]);
      expect(apiGetStub.callCount).to.equal(1);
      expect(apiGetStub.getCall(0).args).to.deep.equal([`/authenticate/${cachedAuthenticationToken}`]);
      expect(setIsAuthenticated.callCount).to.equal(1);
      expect(setIsAuthenticated.getCall(0).args).to.deep.equal([false]);
      expect(setIsLoading.callCount).to.equal(1);
      expect(setIsLoading.getCall(0).args).to.deep.equal([false]);
    });
  });
});
