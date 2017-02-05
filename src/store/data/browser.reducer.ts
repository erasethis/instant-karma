import { Action } from 'flux-standard-action';
import { Reducer } from 'redux';
import * as Immutable from 'immutable';
import * as md5 from 'md5-hex';
import { KARMA_ACTIONS, RESULT_ACTIONS } from '../../services';
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
                .set('id', action.payload.browser.id)
                .set('name', action.payload.browser.name)
                .set('running', true)
                .update('groups', (_groups: Immutable.List<IResultGroupState>) =>
                    _groups.map((_group) => resultGroup(_group, action))));
        }
        case KARMA_ACTIONS.KARMA_SPEC_COMPLETE: {
            return state.update('groups', (_groups) => {
                let level = 0;
                let path: string[] = action.payload.result.suite;
                for (let item of path) {
                    if (_groups.count() < level++ + 1) {
                        _groups = _groups.push(RESULT_GROUP_INIT_STATE);
                    }
                }
                return _groups.map((_group: IResultGroupState, index: number) =>
                    resultGroup(_group, {
                        type: RESULT_ACTIONS.RESULT_ADD_OR_UPDATE,
                        payload: {
                            id: getId(path, index + 1),
                            parentId: getId(path, index),
                            icon: 'layers',
                            description: path[index]
                        }
                    }));
            });
        }
        case KARMA_ACTIONS.KARMA_BROWSER_COMPLETE: {
            return state.get('id') === action.payload.browser.id
                ? state.set('running', false) : state;
        }
        default:
            return state;
    }
};

function getId(path: string[], index: number): string {
    return index > 0 ? /*md5(*/path.slice(0, index).join('|')/*)*/ : null;
}
