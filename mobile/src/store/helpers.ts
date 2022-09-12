import {
  AnyAction,
  AsyncThunkOptions,
  AsyncThunkPayloadCreator,
  createAsyncThunk,
  ThunkAction,
} from '@reduxjs/toolkit';
import { AppThunkApiConfig, AppThunkApiContext, RootState } from './index';

export function createAppAsyncThunk<Returned, ThunkArg = void>(
  typePrefix: string,
  payloadCreator: AsyncThunkPayloadCreator<Returned, ThunkArg, AppThunkApiConfig>,
  options?: AsyncThunkOptions<ThunkArg, {}>
) {
  return createAsyncThunk<Returned, ThunkArg>(typePrefix, payloadCreator, options);
}

type ThunkPayloadCreator<ReturnType, ThunkArg> = (arg: ThunkArg, context: AppThunkApiContext) => ReturnType;
export function createThunk<ReturnType, ThunkArg = void>(action: ThunkPayloadCreator<ReturnType, ThunkArg>) {
  return (arg: ThunkArg): ThunkAction<ReturnType, RootState, undefined, AnyAction> => {
    return (dispatch, getState) => action(arg, { dispatch, getState });
  };
}
