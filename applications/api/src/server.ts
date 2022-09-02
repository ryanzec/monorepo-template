import path from 'path';
import { fileURLToPath } from 'url';

import { faker } from '@faker-js/faker';
import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import { Low, JSONFile } from 'lowdb';

dotenv.config();

// needed because we are running node is esm mode
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export interface Database {
  authenticationTokens: Array<{
    authenticationToken: string;
  }>;
}

const file = path.join(__dirname, '../lowdb/db.json');
const adapter = new JSONFile<Database>(file);
const db = new Low(adapter);

await db.read();

if (!db.data) {
  db.data = { authenticationTokens: [] };

  await db.write();
}

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

api.get('/health', async (request: Request, response: Response): Promise<Response> => {
  return response.status(200).send({
    message: 'Hello World!',
  });
});

api.post('/api/authenticate', async (request: Request, response: Response): Promise<Response> => {
  // @todo(feature) check username / password

  const authenticationToken = faker.datatype.uuid();

  // just overriding the authentication token to make sure it does not get too big and nothing fancier is needed right
  // now

  // this is just a side effect of lowdb for needing the non null assertion
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  db.data!.authenticationTokens = [{ authenticationToken }];

  await db.write();

  return response.status(200).send({
    authenticationToken,
  });
});

api.get('/api/authenticate/:checkToken', async (request: Request, response: Response): Promise<Response> => {
  const checkToken = request.params.checkToken;

  // this is just a side effect of lowdb for needing the non null assertion
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const existingToken = db.data!.authenticationTokens.find(
    (authenticationToken) => authenticationToken.authenticationToken === checkToken,
  );

  if (!existingToken) {
    return response.status(401).send();
  }

  return response.status(200).send();
});

api.get('/api/pawns', async (request: Request, response: Response): Promise<Response> => {
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
