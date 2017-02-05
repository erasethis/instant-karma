import { Action } from 'flux-standard-action';
import { Reducer } from 'redux';
import * as Immutable from 'immutable';
import * as md5 from 'md5-hex';
import { KARMA_ACTIONS } from '../../services';

export const enum TestStatus {
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
    get(key: 'id'): string;
    get(key: 'parentId'): string;
    get(key: 'icon'): string;
    get(key: 'description'): string;
    get(key: 'status'): TestStatus;
    get(key: 'log'): Immutable.List<string>;
    get(key: 'visible'): boolean;
    get(key: 'selected'): boolean;
    set(key: 'id', id: string);
    set(key: 'parentId', parentId: string);
    set(key: 'icon', icon: string);
    set(key: 'description', description: string);
    set(key: 'status', status: TestStatus);
    set(key: 'log', log: Immutable.List<string>);
    set(key: 'visible', visible: boolean);
    set(key: 'selected', selected: boolean);
};

export const RESULT_INIT_STATE: IResultState = Immutable.fromJS({
    id: undefined,
    parentId: undefined,
    icon: undefined,
    description: undefined,
    status: TestStatus.None,
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
            return state.update('status', (_status) => TestStatus.Pending);
        }
        default:
            return state;
    }
};
