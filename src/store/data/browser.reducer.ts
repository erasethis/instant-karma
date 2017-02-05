import { Action } from 'flux-standard-action';
import { Reducer } from 'redux';
import * as Immutable from 'immutable';
import * as md5 from 'md5-hex';
import { KARMA_ACTIONS } from '../../services';
import { ISuiteState } from './suite.reducer';

export interface IBrowserState {
    toJS: () => any;
    updateIn: (keyPath: string[], updater: (value: any) => any) => IBrowserState;
    get(key: 'id'): string;
    get(key: 'name'): string;
    get(key: 'suites'): ISuiteState[];
    get(key: 'visible'): boolean;
    set(key: 'id', id: string);
    set(key: 'name', name: string);
    set(key: 'suites', suites: ISuiteState[]);
    set(key: 'visible', visible: boolean);
};

export const BROWSER_INIT_STATE: IBrowserState = Immutable.fromJS({
    id: undefined,
    name: undefined,
    suites: [],
    visible: false
});

const VOID: Action<any> = {
    type: undefined,
    payload: {}
};

export const browser: Reducer<IBrowserState> =
    (state: IBrowserState = BROWSER_INIT_STATE, action: Action<any> = VOID): IBrowserState => {
    switch (action.type) {
        default:
            return state;
    }
};
