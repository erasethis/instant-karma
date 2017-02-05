import { Action } from 'flux-standard-action';
import { Reducer } from 'redux';
import * as Immutable from 'immutable';
import { browser, IBrowserState } from './browser.reducer';
import { run, IRunState } from './run.reducer';
import { session, ISessionState } from './session.reducer';
import { KARMA_ACTIONS } from '../../services/karma.actions';

export interface IDataState {
    update: (key: string, updater: (value: any) => any) => IDataState;
    withMutations(mutator: (mutable: IDataState) => IDataState): IDataState;
    get(key: 'run'): IRunState;
    get(key: 'session'): ISessionState;
    set(key: 'run', run: IRunState);
    set(key: 'session', session: ISessionState);
};

const INIT_STATE = Immutable.fromJS({
    run: run(undefined, undefined),
    session: session(undefined, undefined)
});

const VOID: Action<any> = {
    type: undefined,
    payload: { }
};

export const data: Reducer<IDataState> =
    (state: IDataState = INIT_STATE, action: Action<any> = VOID) => {
    switch (action.type) {
        case KARMA_ACTIONS.KARMA_RUN_START:
        case KARMA_ACTIONS.KARMA_BROWSER_START:
        case KARMA_ACTIONS.KARMA_SPEC_COMPLETE:
        case KARMA_ACTIONS.KARMA_BROWSER_COMPLETE:
        case KARMA_ACTIONS.KARMA_RUN_COMPLETE: {
            return state.withMutations((_state) => _state
                .update('run', (_run) => run(_run, action))
                .update('session', (_session) => session(_session, action)));
        }
        default:
            return state;
    }
};
