/**
 * @deprecated
 */
import { createStore, combineReducers, Store, AnyAction } from 'redux';
export { Store } from 'redux';
export const APP_STORE = 'appStore';

export interface AppState {
  active: boolean;
}

const active$ = (state = false, action: AnyAction) => {
  switch (action.type) {
    case 'SET_ACTIVE':
      return action.value;
    default:
      return state;
  }
};

export const store: Store = createStore(
  combineReducers({
    active: active$,
  })
);
