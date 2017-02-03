import { Action } from 'flux-standard-action';
import { Reducer } from 'redux';
import * as Immutable from 'immutable';
import * as md5 from 'md5-hex';
import { KARMA_ACTIONS } from '../../services/karma.actions';

export interface ITestResultState {
    withMutations(mutator: (mutable: ITestResultState) => ITestResultState): ITestResultState;
    get(key: 'description'): string;
    set(key: 'description', browsers: string);
};

export const TEST_RESULT_INIT_STATE: ITestResultState = Immutable.fromJS({
    description: undefined,
    suite: undefined
});

const VOID: Action<any> = {
    type: undefined,
    payload: { }
};

export const testResult: Reducer<ITestResultState> =
    (state: ITestResultState = TEST_RESULT_INIT_STATE, action: Action<any> = VOID):
        ITestResultState => {
    switch (action.type) {
        // case KARMA_ACTIONS.KARMA_BROWSER_START:
        // case KARMA_ACTIONS.KARMA_RUN_COMPLETE:
        case KARMA_ACTIONS.KARMA_NEW_SPEC:
            return TEST_RESULT_INIT_STATE.withMutations((_state) => _state
                .set('description', action.payload.description)
                .set('suite', action.payload.suite)
                .set('success', action.payload.success));
        default:
            return state;
    }
};
