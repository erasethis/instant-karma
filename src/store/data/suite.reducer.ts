import { Action } from 'flux-standard-action';
import { Reducer } from 'redux';
import * as Immutable from 'immutable';
import * as md5 from 'md5-hex';
import { KARMA_ACTIONS } from '../../services';
import { result, IResultState } from './result.reducer';

export interface ISuiteState {
    toJS: () => any;
    update: (key: string, updater: (value: any) => any) => ISuiteState;
    updateIn: (keyPath: string[], updater: (value: any) => any) => ISuiteState;
    get(key: 'id'): string;
    get(key: 'parentId'): string;
    get(key: 'results'): Immutable.List<IResultState>;
    get(key: 'visible'): boolean;
    set(key: 'id', id: string);
    set(key: 'parentId', parentId: string);
    set(key: 'results', results: Immutable.List<IResultState>);
    set(key: 'visible', visible: boolean);
};

export const SUITE_INIT_STATE: ISuiteState = Immutable.fromJS({
    id: undefined,
    parentId: undefined,
    results: [],
    visible: false
});

const VOID: Action<any> = {
    type: undefined,
    payload: {}
};

export const suite: Reducer<ISuiteState> =
    (state: ISuiteState = SUITE_INIT_STATE, action: Action<any> = VOID): ISuiteState => {
    switch (action.type) {
        case KARMA_ACTIONS.KARMA_BROWSER_START: {
            return state.update('results', (_results) =>
                _results.map((_result) => result(_result, action)));
        }
        default:
            return state;
    }
};
