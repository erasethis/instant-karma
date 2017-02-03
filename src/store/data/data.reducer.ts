import { Action } from 'flux-standard-action';
import { Reducer } from 'redux';
import * as Immutable from 'immutable';
import { session, ISessionState } from './session.reducer';
import { KARMA_ACTIONS } from '../../services/karma.actions';

export interface IDataState {
    get(key: 'session'): ISessionState;
    set(key: 'session', session: ISessionState);
};

const INIT_STATE = Immutable.fromJS({
    session: session(undefined, undefined)
});

const VOID: Action<any> = {
    type: undefined,
    payload: { }
};

export const data: Reducer<IDataState> =
    (state: IDataState = INIT_STATE, action: Action<any> = VOID) => {
    switch (action.type) {
        case KARMA_ACTIONS.KARMA_BROWSER_START:
        case KARMA_ACTIONS.KARMA_RUN_COMPLETE:
        case KARMA_ACTIONS.KARMA_SPEC_COMPLETE:
            return state.set('session', session(state.get('session'), action));
        default:
            return state;
    }
};
