import { Action } from 'flux-standard-action';
import { Reducer } from 'redux';
import * as Immutable from 'immutable';
import * as md5 from 'md5-hex';
import { KARMA_ACTIONS } from '../../services';
import { suite, ISuiteState, SUITE_INIT_STATE } from './suite.reducer';

export interface IRunState {
    toJS: () => any;
    update: (key: string, updater: (value: any) => any) => IRunState;
    merge(values: any): IRunState;
    get(key: 'id'): string;
    get(key: 'completed'): boolean;
    set(key: 'id', id: string);
    set(key: 'completed', active: boolean);
};

export const RUN_INIT_STATE: IRunState = Immutable.fromJS({
    id: '',
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
                suite: SUITE_INIT_STATE,
                completed: false
            });
        }
        case KARMA_ACTIONS.KARMA_SPEC_COMPLETE: {
            return state.update('suite', (_suite) =>
                suite(_suite, action));
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
