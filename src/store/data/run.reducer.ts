import { Action } from 'flux-standard-action';
import { Reducer } from 'redux';
import * as Immutable from 'immutable';
import * as md5 from 'md5-hex';
import { KARMA_ACTIONS, RESULT_ACTIONS } from '../../services';
import { browser, IBrowserState, BROWSER_INIT_STATE } from './browser.reducer';
import { suite, ISuiteState, SUITE_INIT_STATE } from './suite.reducer';

export interface IRunState {
    toJS: () => any;
    update: (key: string, updater: (value: any) => any) => IRunState;
    withMutations(mutator: (mutable: IRunState) => IRunState): IRunState;
    merge(values: any): IRunState;
    get(key: 'id'): string;
    get(key: 'completed'): boolean;
    set(key: 'id', id: string);
    set(key: 'completed', active: boolean);
};

export const RUN_INIT_STATE: IRunState = Immutable.fromJS({
    id: '',
    browsers: [],
    suite: SUITE_INIT_STATE,
    completed: false
});

const VOID: Action<any> = {
    type: undefined,
    payload: {}
};

export const run: Reducer<IRunState> =
    (state: IRunState = RUN_INIT_STATE, action: Action<any> = VOID): IRunState => {
    switch (action.type) {
        case KARMA_ACTIONS.KARMA_RUN_START: {
            return state.merge({
                id: createId(),
                browsers: [],
                suite: SUITE_INIT_STATE,
                completed: false
            });
        }
        case KARMA_ACTIONS.KARMA_BROWSER_START: {
            return state.update('browsers', (_browsers) =>
                _browsers.push(browser(BROWSER_INIT_STATE, action)));
        }
        case KARMA_ACTIONS.KARMA_SPEC_COMPLETE:
        case RESULT_ACTIONS.RESULT_SELECT: {
            return state
                .update('suite', (_suite) => suite(_suite, action))
                .update('browsers', (_browsers) =>
                    _browsers.map((_browser) => browser(_browser, action)))
        }
        case KARMA_ACTIONS.KARMA_RUN_COMPLETE: {
            return state.set('completed', true);
        }
        default:
            return state;
    }
};

function createId(): string {
    return Math.floor((Math.random() * 899999 + 100000)).toString();
}
