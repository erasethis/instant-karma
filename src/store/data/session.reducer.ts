import { Action } from 'flux-standard-action';
import { Reducer } from 'redux';
import * as Immutable from 'immutable';
import * as md5 from 'md5-hex';
import { KARMA_ACTIONS } from '../../services/karma.actions';
import { testResult, ITestResultState, TEST_RESULT_INIT_STATE } from './test-result.reducer';

export interface ISessionState {
    toJS: () => any;
    updateIn: (keyPath: string[], updater: (value: any) => any) => ISessionState;
    get(key: 'browser'): string;
    get(key: 'results'): Immutable.Map<string, ITestResultState>;
    get(key: 'suites'): Immutable.Map<string, string>;
    set(key: 'browser', browsers: string);
    set(key: 'results', results: Immutable.Map<string, ITestResultState>);
    set(key: 'suites', map: Immutable.Map<string, string>);
};

export const SESSION_INIT_STATE: ISessionState = Immutable.fromJS({
    browser: undefined,
    results: {},
    suites: {}
});

const VOID: Action<any> = {
    type: undefined,
    payload: {}
};

export const session: Reducer<ISessionState> =
    (state: ISessionState = SESSION_INIT_STATE, action: Action<any> = VOID): ISessionState => {
        switch (action.type) {
            case KARMA_ACTIONS.KARMA_BROWSER_START:
                return state.set('browser', action.payload.browser);
            case KARMA_ACTIONS.KARMA_RUN_COMPLETE:
                return state;
            case KARMA_ACTIONS.KARMA_SPEC_COMPLETE:
                let result = action.payload.result;
                if (result.suite) {
                    let suite: string[] = result.suite;
                    for (let i = 0; i < suite.length; i++) {
                        state = createOrUpdateSuite(suite, i, result.success, state);
                    }
                }
                let specId = md5([...result.suite, result.description]);
                state = state.updateIn(['results', specId], (_state) => testResult(_state, {
                    type: KARMA_ACTIONS.KARMA_NEW_SPEC,
                    payload: {
                        id: specId,
                        description: result.description,
                        suite: hash(result.suite),
                        success: result.success,
                        log: result.log
                    }
                }));
            default:
                return state;
        }
    };

function hash(suite: string[]) {
    return suite && suite.length > 0
        ? md5(suite.join('|')) : null;
}

function createOrUpdateSuite(
    suite: string[], index: number, success: boolean,
    state: ISessionState): ISessionState {
    let id = hash(suite.slice(0, index + 1));
    if (state.get('suites').has(id)) {
        state = state.updateIn(['suites', id, 'success'], (_success) => _success && success);
    } else {
        state = state.set('suites', state.get('suites').set(id, Immutable.fromJS({
            id,
            name: suite[index],
            suite: hash(suite.slice(0, index)),
            success
        })));
    }
    return state;
}

function createOrUpdateTestResult(state: ISessionState) {
        
}
