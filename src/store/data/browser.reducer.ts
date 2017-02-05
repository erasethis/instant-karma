import { Action } from 'flux-standard-action';
import { Reducer } from 'redux';
import * as Immutable from 'immutable';
import * as md5 from 'md5-hex';
import { KARMA_ACTIONS } from '../../services';
import { suite, ISuiteState } from './suite.reducer';

export interface IBrowserState {
    toJS: () => any;
    update: (key: string, updater: (value: any) => any) => IBrowserState;
    updateIn: (keyPath: string[], updater: (value: any) => any) => IBrowserState;
    withMutations(mutator: (mutable: IBrowserState) => IBrowserState): IBrowserState;
    get(key: 'id'): string;
    get(key: 'name'): string;
    get(key: 'suites'): Immutable.List<ISuiteState>;
    get(key: 'running'): boolean;
    get(key: 'visible'): boolean;
    set(key: 'id', id: string);
    set(key: 'name', name: string);
    set(key: 'suites', suites: Immutable.List<ISuiteState>);
    set(key: 'running', running: boolean);
    set(key: 'visible', visible: boolean);
};

export const BROWSER_INIT_STATE: IBrowserState = Immutable.fromJS({
    id: undefined,
    name: undefined,
    suites: [],
    running: false,
    visible: false
});

const VOID: Action<any> = {
    type: undefined,
    payload: {}
};

export const browser: Reducer<IBrowserState> =
    (state: IBrowserState = BROWSER_INIT_STATE, action: Action<any> = VOID): IBrowserState => {
    switch (action.type) {
        case KARMA_ACTIONS.KARMA_BROWSER_START: {
            return state.withMutations((_state) => _state
                .set('id', action.payload.id)
                .set('name', action.payload.name)
                .set('running', true)
                .update('suites', (_suites: Immutable.List<ISuiteState>) =>
                    _suites.map((_suite) => suite(_suite, action))));
        }
        case KARMA_ACTIONS.KARMA_BROWSER_COMPLETE: {
            return state.set('running', false);
        }
        default:
            return state;
    }
};
