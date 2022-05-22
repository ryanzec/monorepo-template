import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import cors, { CorsOptions } from 'cors';
import axios from 'axios';
import { auth, AuthResult } from 'express-oauth2-jwt-bearer';

dotenv.config();

const api: Application = express();

const PORT = process.env.SERVER_PORT;

const options: CorsOptions = {
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: '*',
  optionsSuccessStatus: 200,
};

// Body parsing Middleware
api.use(cors(options));
api.use(express.json());
api.use(express.urlencoded({ extended: true }));

const checkJwt = auth({
  // since this in the general api, we need to make sure the the jwt token has the same audience
  audience: process.env.AUTH0_AUDIENCE_API,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
});

const isAuthTokenValid = (verifiedJwtToken: AuthResult | undefined): boolean => {
  if (!verifiedJwtToken) {
    return false;
  }

  // I am pretty sure if the token gets parsed, it is valid which mean we only have to validate the expire value
  const currentTimestamp = Date.now() / 1000;

  return (verifiedJwtToken.payload.exp ?? 0) > currentTimestamp;
};

api.get('/', async (request: Request, response: Response): Promise<Response> => {
  return response.status(200).send({
    message: 'Hello World!',
  });
});

// hitting this api will generate a access token for auth0 user management api which is used for permissions. normally
// this would be management automatically but that is outside the scope of this demo appliction right now
api.get(
  '/api/v1/admin.generateBackendTokens',
  checkJwt,
  async (request: Request, response: Response): Promise<Response> => {
    // get machine token for personal snadbox api
    const options2 = {
      method: 'POST',
      url: `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
      headers: { 'content-type': 'application/json' },
      data: {
        grant_type: 'client_credentials',
        client_id: process.env.AUTH0_CLIENT_ID_AUTH0_USERS,
        client_secret: process.env.AUTH0_CLIENT_SECRET_AUTH0_USERS,
        audience: process.env.AUTH0_AUDIENCE_AUTH0_USERS,
      },
    };

    axios
      .request(options2)
      .then(function (response) {
        console.log(JSON.stringify(response.data, null, 2));
      })
      .catch(function (error) {
        console.error(error);
      });

    return response.status(401).end();
  },
);

api.get('/api/v1/pawns', checkJwt, async (request: Request, response: Response): Promise<Response> => {
  console.log(JSON.stringify(request.auth, null, 2));

  if (!isAuthTokenValid(request.auth)) {
    return response.status(401).end();
  }

  // this is just for testing auth0 / this would normally be cache in a production codebase
  const options = {
    method: 'GET',
    url: `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${request.auth?.payload.sub}/permissions`,
    headers: {
      Authorization: `Bearer ${process.env.AUTH0_MACHINE_ACCESS_TOKEN_AUTH0_USERS}`,
    },
  };

  const userPermissions = await axios.request(options);

  console.log(JSON.stringify(userPermissions.data, null, 2));

  const pawns = [
    {
      Id: '1',
      MaximumHealth: 100,
      ActionPoints: 1,
      MovementPoints: 1,
      PortraitSpriteId: 'test',
    },
  ];

  return response.status(200).send(pawns);
});

try {
  api.listen(PORT, (): void => {
    console.log(`API served on port ${PORT}`);
  });
} catch (error) {
  if (error instanceof Error) {
    console.error(`error thrown: ${error.message}`);
  } else {
    console.error(`non-stand error thrown: ${error}`);
  }
}
