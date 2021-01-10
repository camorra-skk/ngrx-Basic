import { createReducer, on, createAction, createFeatureSelector, createSelector } from '@ngrx/store';
import * as UserActions from './user.actions';

export interface UserState {
  maskUserName: boolean
}

const initialState : UserState = {
  maskUserName : true,
}

const getUserState = createFeatureSelector<UserState>('users');

export const getmaskUserName = createSelector(
  getUserState,
  state => state.maskUserName
)

export const userReducer = createReducer(
  initialState,
  on(UserActions.maskUserName, state => {
    return {
      ...state,
      maskUserName: !state.maskUserName
    };
  })
);
