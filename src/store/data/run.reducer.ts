import { Action } from 'flux-standard-action';
import { Reducer } from 'redux';
import * as Immutable from 'immutable';
import * as md5 from 'md5-hex';
import { KARMA_ACTIONS } from '../../services';
import { browser, IBrowserState } from './browser.reducer';

export interface IRunState {
    toJS: () => any;
    update: (key: string, updater: (value: any) => any) => IRunState;
    updateIn: (keyPath: string[], updater: (value: any) => any) => IRunState;
    withMutations(mutator: (mutable: IRunState) => IRunState): IRunState;
    get(key: 'id'): string;
    get(key: 'browsers'): Immutable.List<IBrowserState>;
    get(key: 'completed'): boolean;
    set(key: 'id', id: string);
    set(key: 'browsers', suites: Immutable.List<IBrowserState>);
    set(key: 'completed', active: boolean);
};

export const RUN_INIT_STATE: IRunState = Immutable.fromJS({
    id: undefined,
    browsers: [],
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
            return state.withMutations((_state) => _state
                .set('id', createId())
                .set('completed', false));
        }
        case KARMA_ACTIONS.KARMA_BROWSER_START:
        case KARMA_ACTIONS.KARMA_BROWSER_COMPLETE: {
            return state.update('browsers', (_browsers: Immutable.List<IBrowserState>) =>
                _browsers.map((_browser) => browser(_browser, action)));
        }
        case KARMA_ACTIONS.KARMA_RUN_COMPLETE: {
            return state.set('completed', true);
        }
        default:
            return state;
    }
};

function createId(): string {
    return (Math.random() * 899999 + 100000).toString();
}
