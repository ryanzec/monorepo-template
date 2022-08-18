export enum HttpStatusCode {
  INTERNAL_ERROR = 500,
}

export const HttpStatusCodeMessage: Record<HttpStatusCode, string> = {
  [HttpStatusCode.INTERNAL_ERROR]: 'Unknown Error Occurred',
};

export type HttpErrorContext = {
  response: Response;

  // the context can be anything so we need to allow that
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export interface HttpErrorParams {
  message?: string;
  context: HttpErrorContext;
}

export interface HttpErrorConstructorParams {
  statusCode: HttpStatusCode;
  options: HttpErrorParams;
}

// since we want to extend from Error, we need to use a class
export class HttpError extends Error {
  statusCode: number;
  context: HttpErrorContext;

  constructor({ statusCode, options }: HttpErrorConstructorParams) {
    super(options.message ?? HttpStatusCodeMessage[statusCode]);

    this.statusCode = statusCode;
    this.context = options.context;
  }
}

export interface HttpRequest extends Omit<RequestInit, 'credentials'> {
  withCredentials?: boolean;

  // since this is a common type, we need to allow any (forcing a generic type just adds to much overhead than it
  // is worth)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: Record<string, any>;

  // returns false indicates the error does not need to be propagated further
  onError?: (response: Response) => Promise<boolean>;
}

export enum HttpMethod {
  CONNECT = 'CONNECT',
  DELETE = 'DELETE',
  GET = 'GET',
  HEAD = 'HEAD',
  POST = 'POST',
  PATCH = 'PATCH',
  PUT = 'PUT',
  TRACE = 'TRACE',
}

const http = async (url: string, requestOptions: HttpRequest = {}): Promise<Response> => {
  const { withCredentials, payload, headers, onError, ...defaultOptions } = requestOptions;

  const fetchOptions: RequestInit = {
    ...defaultOptions,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
    credentials: withCredentials !== false ? 'include' : 'same-origin',
    mode: 'cors',
  };

  if (payload) {
    fetchOptions.body = JSON.stringify(payload);
  }

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    let throwError = true;

    if (onError) {
      throwError = await onError(response);
    }

    if (throwError) {
      throw new HttpError({
        statusCode: response.status,
        options: {
          message: `http request failed: ${response.status} ${response.statusText}`,
          context: {
            response,
          },
        },
      });
    }
  }

  return response;
};

const parseJson = async <TData>(response: Response): Promise<TData> => {
  return response.json();
};

export const httpUtils = {
  http,
  parseJson,
};
