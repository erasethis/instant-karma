import { Action } from 'flux-standard-action';
import { Reducer } from 'redux';
import * as Immutable from 'immutable';
import { KARMA_ACTIONS } from '../../services/karma.actions';

export interface IProgressState {
    get(key: 'busy'): boolean;
    set(key: 'busy', busy: boolean);
};

const INIT_STATE = Immutable.Map({
    busy: false
});

const VOID: Action<any> = {
    type: undefined,
    payload: { }
};

export const progress: Reducer<IProgressState> =
    (state: IProgressState = INIT_STATE, action: Action<any> = VOID) => {
    switch (action.type) {
        //case KARMA_ACTIONS.KARMA_RUN_START:
        case KARMA_ACTIONS.KARMA_BROWSER_START:
            return state.set('busy', true);
        case KARMA_ACTIONS.KARMA_RUN_COMPLETE:
            return state.set('busy', false);
        default:
            return state;
    }
};
