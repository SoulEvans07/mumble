import { AsyncThunkOptions, AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';
import { AppThunkApiConfig } from './index';

export function createAppAsyncThunk<Returned, ThunkArg = void>(
  typePrefix: string,
  payloadCreator: AsyncThunkPayloadCreator<Returned, ThunkArg, AppThunkApiConfig>,
  options?: AsyncThunkOptions<ThunkArg, {}>
) {
  return createAsyncThunk<Returned, ThunkArg>(typePrefix, payloadCreator, options);
}
