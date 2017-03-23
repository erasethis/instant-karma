import { Action } from 'flux-standard-action';
import { Reducer } from 'redux';
import * as Immutable from 'immutable';
import { KARMA_ACTIONS, RESULT_ACTIONS } from '../../services';

export interface IBrowserState {
    merge(values: any): IBrowserState;
    get(key: 'id'): string;
    get(key: 'name'): string;
    get(key: 'selected'): boolean;
    set(key: 'selected', selected: boolean);
};

export const BROWSER_INIT_STATE: IBrowserState = Immutable.fromJS({
    id: '',
    name: '',
    selected: false
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
                name: action.payload.browser.name,
                selected: false
            });
        }
        case RESULT_ACTIONS.RESULT_SELECT: {
            if (state.get('id') === action.payload.browserId) {
                return state.set('selected', true);
            }
            return state.get('selected') === true
                ? state.set('selected', false) : state;
        }
        default:
            return state;
    }
};
