import { Action } from 'flux-standard-action';
import { Reducer } from 'redux';
import * as Immutable from 'immutable';
import { data, IDataState } from './data';
import { ui, IUiState } from './ui';
import { KARMA_ACTIONS } from '../services/karma.actions';

export * from './data';

export interface IAppState {
    withMutations: (state: IAppState) => IAppState;
    get(key: 'data'): IDataState;
    get(key: 'ui'): IUiState;
};

const INIT_STATE = Immutable.fromJS({
    data: data(undefined, undefined),
    ui: ui(undefined, undefined)
});

const VOID: Action<any> = {
    type: undefined,
    payload: { }
};

export const rootReducer = (state = INIT_STATE, action = VOID) => {
    switch (action.type) {
        case KARMA_ACTIONS.KARMA_BROWSER_START:
        case KARMA_ACTIONS.KARMA_RUN_COMPLETE:
        case KARMA_ACTIONS.KARMA_RUN_START:
        case KARMA_ACTIONS.KARMA_SPEC_COMPLETE:
            return state.withMutations((_state) =>
                _state.set('ui', ui(state.get('ui'), action))
                    .set('data', data(_state.get('data'), action)));
        default:
            return state;
    }
};
