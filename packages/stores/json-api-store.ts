import produce from 'immer';
import { BehaviorSubject } from 'rxjs';

export enum JsonApiRequestState {
  IDLE = 'idle',
  LOADING = 'loading',
  LOADED = 'loaded',
  ERRORED = 'errored',
}

export interface JsonApiState<TJsonData> {
  makeRequest?: () => Promise<Response>;
  json?: TJsonData;

  // the data can be anything so we need to allow any here
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  response?: Record<any, any>;
  requestState: JsonApiRequestState;
  statusCode?: number;
}

interface GenerateSubjectParams<TJsonData> extends Omit<Partial<JsonApiState<TJsonData>>, 'makeRequest'> {
  makeRequest: () => Promise<Response>;
}

const generateSubject = <TJsonData>(overrideInitialValues: GenerateSubjectParams<TJsonData>) => {
  return new BehaviorSubject<JsonApiState<TJsonData>>(
    Object.assign({ requestState: JsonApiRequestState.IDLE }, overrideInitialValues ?? {}),
  );
};

const makeRequest = async <TJsonData>(subject: BehaviorSubject<JsonApiState<TJsonData>>) => {
  const state = subject.getValue();

  if (!state.makeRequest) {
    return;
  }

  let nextState = produce(state, (draft) => {
    draft.requestState = JsonApiRequestState.LOADING;
  });

  subject.next(nextState);

  try {
    const response = await state.makeRequest();
    const json = await response.json();

    nextState = produce(nextState, (draft) => {
      draft.response = response;
      draft.json = json;
      draft.requestState = JsonApiRequestState.LOADED;
      draft.statusCode = response.status;
    });

    subject.next(nextState);
  } catch (error) {
    nextState = produce(nextState, (draft) => {
      draft.requestState = JsonApiRequestState.ERRORED;
    });

    subject.next(nextState);
  }
};

export const jsonApiStoreUtils = {
  generateSubject,
  makeRequest,
};
