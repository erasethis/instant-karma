import { Action } from 'flux-standard-action';
import { Reducer } from 'redux';
import * as Immutable from 'immutable';
import * as md5 from 'md5-hex';
import { KARMA_ACTIONS, RESULT_ACTIONS } from '../../services';

export const enum ResultStatus {
    Disabled,
    Failed,
    None,
    Pending,
    Skipped,
    Success
};

export interface IResultState {
    toJS: () => any;
    update: (key: string, updater: (value: any) => any) => IResultState;
    updateIn: (keyPath: string[], updater: (value: any) => any) => IResultState;
    withMutations(mutator: (mutable: IResultState) => IResultState): IResultState;
    get(key: 'id'): string;
    get(key: 'parentId'): string;
    get(key: 'results'): Immutable.List<IResultState>;
    get(key: 'icon'): string;
    get(key: 'description'): string;
    get(key: 'status'): ResultStatus;
    get(key: 'log'): Immutable.List<string>;
    get(key: 'visible'): boolean;
    get(key: 'selected'): boolean;
    set(key: 'id', id: string);
    set(key: 'parentId', parentId: string);
    set(key: 'results', results: Immutable.List<IResultState>);
    set(key: 'icon', icon: string);
    set(key: 'description', description: string);
    set(key: 'status', status: ResultStatus);
    set(key: 'log', log: Immutable.List<string>);
    set(key: 'visible', visible: boolean);
    set(key: 'selected', selected: boolean);
};

export const RESULT_INIT_STATE: IResultState = Immutable.fromJS({
    id: undefined,
    results: [],
    icon: undefined,
    description: undefined,
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
            let idFromAction = getId(_result.suite, _result.id);
            let id = state.get('id');

            if (id) {
                if (idFromAction !== id) {
                    return state;
                }
            } else {
                state = state.set('id', idFromAction);
            }

            state = state.withMutations((_state) => _state
                .set('description', getDescription(_result.suite, _result.description))
                .set('icon', getIcon(_result.suite)));

            if (_result.success) {
                state = state.set('status', ResultStatus.Success);
            }
            if (_result.log) {
                state = state.set('log', Immutable.fromJS(_result.log));
            }

        }
        default:
            return state;
    }
};

function getId(path: string[], specId: string): string {
    return path && path.length > 0
        ? md5([...path, specId].join('|'))
        : md5(specId);
}

function getDescription(path: string[], description: string): string {
    return path && path.length > 0
        ? path[0]
        : description;
}

function getIcon(path: string[]): string {
    return path && path.length > 0
        ? 'layers'
        : 'colorize';
}

function createOrUpdateResult(state: IResultState, action: Action<any>) {
    let _result;
}
