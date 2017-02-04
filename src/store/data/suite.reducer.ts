import { Action } from 'flux-standard-action';
import { Reducer } from 'redux';
import * as Immutable from 'immutable';
import * as md5 from 'md5-hex';
import { KARMA_ACTIONS, SUITE_ACTIONS } from '../../services';
import { testResult, ITestResultState, TEST_RESULT_INIT_STATE } from './test-result.reducer';

export interface ISuiteState {
    toJS: () => any;
    updateIn: (keyPath: string[], updater: (value: any) => any) => ISuiteState;
    get(key: 'id'): string;
    get(key: 'name'): string;
    get(key: 'parentId'): string;
    get(key: 'success'): boolean;
    set(key: 'id', id: string);
    set(key: 'name', name: string);
    set(key: 'parentId', parentId: string);
    set(key: 'success', success: boolean);
};

export const SUITE_INIT_STATE: ISuiteState = Immutable.fromJS({
    browser: undefined,
    results: {},
    suites: {},
    success: false
});

const VOID: Action<any> = {
    type: undefined,
    payload: {}
};

export const suite: Reducer<ISuiteState> =
    (state: ISuiteState = SUITE_INIT_STATE, action: Action<any> = VOID): ISuiteState => {
        switch (action.type) {
            case SUITE_ACTIONS.SUITE_CREATE:
                return state;
            default:
                return state;
        }
    };

/*
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
*/
