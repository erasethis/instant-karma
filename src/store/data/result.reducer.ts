import { Action } from 'flux-standard-action';
import { Reducer } from 'redux';
import * as Immutable from 'immutable';
import * as md5 from 'md5-hex';
import { KARMA_ACTIONS, RESULT_ACTIONS } from '../../services';

export const enum ResultStatus {
    Disabled = 1,
    Failed = 2,
    None = 3,
    Pending = 4,
    Skipped = 5,
    Success = 6
};

export interface IResultState {
    toJS: () => any;
    update: (key: string, updater: (value: any) => any) => IResultState;
    updateIn: (keyPath: string[], updater: (value: any) => any) => IResultState;
    withMutations(mutator: (mutable: IResultState) => IResultState): IResultState;
    get(key: 'id'): string;
    get(key: 'description'): string;
    get(key: 'suite'): Immutable.List<string>;
    get(key: 'status'): ResultStatus;
    get(key: 'log'): Immutable.List<string>;
    get(key: 'visible'): boolean;
    get(key: 'selected'): boolean;
    set(key: 'id', id: string);
    set(key: 'description', description: string);
    set(key: 'suite', suite: Immutable.List<string>);
    set(key: 'status', status: ResultStatus);
    set(key: 'log', log: Immutable.List<string>);
    set(key: 'visible', visible: boolean);
    set(key: 'selected', selected: boolean);
};

export const RESULT_INIT_STATE: IResultState = Immutable.fromJS({
    id: undefined,
    description: undefined,
    suite: [],
    status: ResultStatus.None,
    log: [],
    visible: false,
    selected: false
});

const VOID: Action<any> = {
    type: undefined,
    payload: {}
};

export const result: Reducer<IResultState> =
    (state: IResultState = RESULT_INIT_STATE, action: Action<any> = VOID): IResultState => {
    switch (action.type) {
        case KARMA_ACTIONS.KARMA_BROWSER_START: {
            return state.update('status', (_status) => ResultStatus.Pending);
        }
        case KARMA_ACTIONS.KARMA_SPEC_COMPLETE: {
            let _result = action.payload.result;
            return state.withMutations((_state) => _state
                .set('id', _result.id)
                .set('description', _result.description)
                .set('suite', Immutable.fromJS(_result.suite))
                .set('status', getStatus(_result))
                .set('log', Immutable.fromJS(_result.log)));
        }
        default:
            return state;
    }
};

function getStatus(_result: any): ResultStatus {
    if (_result.success) {
        return ResultStatus.Success;
    }
    if (!_result.success && _result.log && _result.log.length > 0) {
        return ResultStatus.Failed;
    }
    return ResultStatus.None;
}
