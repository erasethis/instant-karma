import { Action } from 'flux-standard-action';
import { Reducer } from 'redux';
import * as Immutable from 'immutable';
import * as md5 from 'md5-hex';
import { KARMA_ACTIONS, SPEC_ACTIONS } from '../../services';

export interface ITestResultState {
    withMutations(mutator: (mutable: ITestResultState) => ITestResultState): ITestResultState;
    get(key: 'id'): string;
    get(key: 'description'): string;
    get(key: 'suite'): string;
    get(key: 'success'): boolean;
    get(key: 'log'): Immutable.List<string>;
    set(key: 'id', id: string);
    set(key: 'description', browsers: string);
    set(key: 'success', success: boolean);
    set(key: 'log', log: Immutable.List<string>);
};

export const TEST_RESULT_INIT_STATE: ITestResultState = Immutable.fromJS({
    id: undefined,
    description: undefined,
    suite: undefined,
    success: false,
    log: []
});

const VOID: Action<any> = {
    type: undefined,
    payload: { }
};

export const testResult: Reducer<ITestResultState> =
    (state: ITestResultState = TEST_RESULT_INIT_STATE, action: Action<any> = VOID):
        ITestResultState => {
    switch (action.type) {
        case SPEC_ACTIONS.SPEC_CREATE:
            return state.withMutations((_state) => _state
                .set('id', action.payload.id)
                .set('description', action.payload.description)
                .set('suite', action.payload.suite)
                .set('success', action.payload.success)
                .set('log', action.payload.log));
        default:
            return state;
    }
};
