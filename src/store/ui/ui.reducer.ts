import { Action } from 'flux-standard-action';
import { Reducer } from 'redux';
import * as Immutable from 'immutable';
import { progress, IProgressState } from './progress.reducer';
import { KARMA_ACTIONS } from '../../services/karma.actions';

export interface IUiState {
    get(key: 'progress'): IProgressState;
    set(key: 'progress', progress: IProgressState)
};

const INIT_STATE = Immutable.fromJS({
    progress: progress(undefined, undefined)
});

const VOID: Action<any> = {
    type: undefined,
    payload: { }
};

export const ui: Reducer<IUiState> =
    (state: IUiState = INIT_STATE, action: Action<IUiState> = VOID) => {
    switch (action.type) {
        case KARMA_ACTIONS.KARMA_BROWSER_START:
        case KARMA_ACTIONS.KARMA_RUN_START:
        case KARMA_ACTIONS.KARMA_RUN_COMPLETE:
            return state.set('progress', progress(state.get('progress'), action));
        default:
            return state;
    }
};
