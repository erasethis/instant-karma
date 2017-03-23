import { Action } from 'flux-standard-action';
import { Reducer } from 'redux';
import * as Immutable from 'immutable';
import * as md5 from 'md5-hex';
import { KARMA_ACTIONS, RESULT_ACTIONS } from '../../services';
import { result, IResultState, RESULT_INIT_STATE } from './result.reducer';
import { ResultStatus } from '../../common';

export interface ISuiteState {
    get(key: 'results'): Immutable.List<IResultState>;
    update(key: string, updater: (_value: any) => any);
};

export const SUITE_INIT_STATE: ISuiteState = Immutable.fromJS({
    results: []
});

const VOID: Action<any> = {
    type: undefined,
    payload: {}
};

export const suite: Reducer<ISuiteState> =
    (state: ISuiteState = SUITE_INIT_STATE, action: Action<any> = VOID): ISuiteState => {
    switch (action.type) {
        case KARMA_ACTIONS.KARMA_SPEC_COMPLETE: {
            return state.update('results', (_results) =>
                _results.push(result(RESULT_INIT_STATE, action)));
        }
        case RESULT_ACTIONS.RESULT_SELECT: {
            return state.update('results', (_results: IResultState[]) =>
                _results.map((_result) => result(_result, action)));
        }
        default:
            return state;
    }
};
