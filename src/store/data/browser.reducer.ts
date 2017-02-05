import { Action } from 'flux-standard-action';
import { Reducer } from 'redux';
import * as Immutable from 'immutable';
import * as md5 from 'md5-hex';
import { KARMA_ACTIONS } from '../../services';
import { resultGroup, IResultGroupState, RESULT_GROUP_INIT_STATE } from './result-group.reducer';

export interface IBrowserState {
    toJS: () => any;
    update: (key: string, updater: (value: any) => any) => IBrowserState;
    updateIn: (keyPath: string[], updater: (value: any) => any) => IBrowserState;
    withMutations(mutator: (mutable: IBrowserState) => IBrowserState): IBrowserState;
    get(key: 'id'): string;
    get(key: 'name'): string;
    get(key: 'groups'): Immutable.List<IResultGroupState>;
    get(key: 'running'): boolean;
    get(key: 'visible'): boolean;
    set(key: 'id', id: string);
    set(key: 'name', name: string);
    set(key: 'groups', groups: Immutable.List<IResultGroupState>);
    set(key: 'running', running: boolean);
    set(key: 'visible', visible: boolean);
};

export const BROWSER_INIT_STATE: IBrowserState = Immutable.fromJS({
    id: undefined,
    name: undefined,
    groups: [],
    running: false,
    visible: false
});

const VOID: Action<any> = {
    type: undefined,
    payload: {}
};

export const browser: Reducer<IBrowserState> =
    (state: IBrowserState = BROWSER_INIT_STATE, action: Action<any> = VOID): IBrowserState => {
    switch (action.type) {
        case KARMA_ACTIONS.KARMA_BROWSER_START: {
            return state.withMutations((_state) => _state
                .set('id', action.payload.id)
                .set('name', action.payload.name)
                .set('running', true)
                .update('groups', (_groups: Immutable.List<IResultGroupState>) =>
                    _groups.map((_group) => resultGroup(_group, action))));
        }
        case KARMA_ACTIONS.KARMA_SPEC_COMPLETE: {
            return state.update('groups', (_groups) => {
                let level = 0;
                for (let item of action.payload.result.suite) {
                    if (_groups.count() < level++ + 1) {
                        _groups = _groups.push(RESULT_GROUP_INIT_STATE);
                    }
                }
                return _groups.map((_group: IResultGroupState) =>
                    resultGroup(_group, action));
            });
        }
        case KARMA_ACTIONS.KARMA_BROWSER_COMPLETE: {
            return state.set('running', false);
        }
        default:
            return state;
    }
};
