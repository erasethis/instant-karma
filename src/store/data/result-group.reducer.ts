import { Action } from 'flux-standard-action';
import { Reducer } from 'redux';
import * as Immutable from 'immutable';
import * as md5 from 'md5-hex';
import { KARMA_ACTIONS, RESULT_ACTIONS } from '../../services';
import { result, IResultState, RESULT_INIT_STATE } from './result.reducer';

export interface IResultGroupState {
    toJS: () => any;
    update: (key: string, updater: (value: any) => any) => IResultGroupState;
    updateIn: (keyPath: string[], updater: (value: any) => any) => IResultGroupState;
    get(key: 'id'): string;
    get(key: 'parentId'): string;
    get(key: 'results'): Immutable.List<IResultState>;
    get(key: 'visible'): boolean;
    set(key: 'id', id: string);
    set(key: 'parentId', parentId: string);
    set(key: 'results', results: Immutable.List<IResultState>);
    set(key: 'visible', visible: boolean);
};

export const RESULT_GROUP_INIT_STATE: IResultGroupState = Immutable.fromJS({
    id: undefined,
    parentId: undefined,
    results: [],
    visible: false
});

const VOID: Action<any> = {
    type: undefined,
    payload: {}
};

export const resultGroup: Reducer<IResultGroupState> = (
    state: IResultGroupState = RESULT_GROUP_INIT_STATE,
    action: Action<any> = VOID): IResultGroupState => {
    switch (action.type) {
        case KARMA_ACTIONS.KARMA_BROWSER_START: {
            return state.update('results', (_results) =>
                _results.map((_result) => result(_result, action)));
        }
        case RESULT_ACTIONS.RESULT_ADD_OR_UPDATE: {
            return state.update('results', (_results) => {
                let index = _results.findIndex((_result) =>
                    _result.get('id') === action.payload.id);

                return index >= 0
                    ? _results.update(index, (_result) => result(_result, action))
                    : _results.push(result(RESULT_INIT_STATE, action));
            });
        }
        default:
            return state;
    }
};
