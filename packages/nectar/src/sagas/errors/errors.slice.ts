import {
  createSlice,
  EntityState,
  PayloadAction,
  Dictionary
} from '@reduxjs/toolkit'

import { StoreKeys } from '../store.keys'
import { errorsAdapter } from './errors.adapter'
import { ErrorPayload } from './errors.types'

type ErrorsState = Dictionary<EntityState<ErrorPayload>>
const initialState: ErrorsState = {}

export const errorsSlice = createSlice({
  initialState,
  name: StoreKeys.Errors,
  reducers: {
    addError: (state, action: PayloadAction<ErrorPayload>) => {
      state[action.payload.communityId] = errorsAdapter.upsertOne(
        state[action.payload.communityId] ?? errorsAdapter.getInitialState(),
        action.payload
      )
    }
  }
})

export const errorsActions = errorsSlice.actions
export const errorsReducer = errorsSlice.reducer
