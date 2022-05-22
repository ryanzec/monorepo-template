// this file is used a proxy to make mocking in tests possible
import createAuth0Client, { Auth0Client } from '@auth0/auth0-spa-js';

export const getClient = async (): Promise<Auth0Client> => {
  return await createAuth0Client({
    domain: window.globalConfiguration.auth0Domain,
    client_id: window.globalConfiguration.auth0ClientId,
    useRefreshTokens: true,

    // this forces the user to re-authenticate when the user has logged out of the application
    prompt: 'login',

    // this need to match the audience that the server that we send jwt token to using for the token to be
    // considered valid
    audience: window.globalConfiguration.audience,
  });
};
