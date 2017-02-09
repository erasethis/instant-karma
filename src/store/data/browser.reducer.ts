import { Action } from 'flux-standard-action';
import { Reducer } from 'redux';
import * as Immutable from 'immutable';
import * as md5 from 'md5-hex';
import { KARMA_ACTIONS, RESULT_ACTIONS } from '../../services';
import { result, IResultState, RESULT_INIT_STATE, ResultStatus } from './result.reducer';

export interface IBrowserState {
    toJS: () => any;
    update: (key: string, updater: (value: any) => any) => IBrowserState;
    updateIn: (keyPath: string[], updater: (value: any) => any) => IBrowserState;
    withMutations(mutator: (mutable: IBrowserState) => IBrowserState): IBrowserState;
    get(key: 'id'): string;
    get(key: 'name'): string;
    get(key: 'results'): Immutable.List<IResultState>;
    get(key: 'running'): boolean;
    get(key: 'visible'): boolean;
    getIn(searchKeyPath: any[]);
    set(key: 'id', id: string);
    set(key: 'name', name: string);
    set(key: 'results', groups: Immutable.List<IResultState>);
    set(key: 'running', running: boolean);
    set(key: 'visible', visible: boolean);
};

export const BROWSER_INIT_STATE: IBrowserState = Immutable.fromJS({
    id: undefined,
    name: undefined,
    results: [],
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
            let browserId = state.get('id');
            if (browserId) {
                if (browserId !== action.payload.browser.id) {
                    return state;
                }
            } else {
                state = state.withMutations((_state) => _state
                    .set('id', action.payload.browser.id)
                    .set('name', action.payload.browser.name));
            }
            return state.withMutations((_state) => _state
                .set('running', true)
                .update('results', (_results: Immutable.List<IResultState>) =>
                    _results.map((_result) => result(_result, {
                        type: RESULT_ACTIONS.RESULT_UPDATE_RESULT,
                        payload: {
                            status: ResultStatus.Pending,
                            log: []
                        }
                    }))));
        }
        case KARMA_ACTIONS.KARMA_SPEC_COMPLETE: {
            let specResult = action.payload.result;
            let specPath = [...specResult.suite, specResult.description];
            return state.update('results', (_results) => {
                let id = md5(specPath);
                let index = _results.findIndex((_result) => _result.get('id') === id);
                if (index >= 0) {
                    return _results.update(index, (_result) =>
                        result(_result, {
                            type: RESULT_ACTIONS.RESULT_UPDATE_RESULT,
                            payload: {
                                status: specResult.success
                                    ? ResultStatus.Success
                                    : ResultStatus.Failed,
                                log: specResult.log
                            }
                        }));
                }
                return _results.push(result(RESULT_INIT_STATE, {
                    type: RESULT_ACTIONS.RESULT_NEW_RESULT,
                    payload: {
                        id,
                        icon: specPath.length > 1
                            ? 'layers' : 'colorize',
                        description: specPath.shift()
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
