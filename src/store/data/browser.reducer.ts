import { Action } from 'flux-standard-action';
import { Reducer } from 'redux';
import * as Immutable from 'immutable';
import { KARMA_ACTIONS } from '../../services';

export interface IBrowserState {
    merge(values: any): IBrowserState;
    get(key: 'id'): string;
    get(key: 'name'): string;
};

export const BROWSER_INIT_STATE: IBrowserState = Immutable.fromJS({
    id: '',
    name: ''
});

const VOID: Action<any> = {
    type: undefined,
    payload: {}
};

export const browser: Reducer<IBrowserState> =
    (state: IBrowserState = BROWSER_INIT_STATE, action: Action<any> = VOID): IBrowserState => {
    switch (action.type) {
        case KARMA_ACTIONS.KARMA_BROWSER_START: {
            return state.merge({
                id: action.payload.browser.id,
                name: action.payload.browser.name
            });
        }
        default:
            return state;
    }
};
