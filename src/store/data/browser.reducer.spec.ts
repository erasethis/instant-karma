import { async, inject, TestBed } from '@angular/core/testing';

import {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

import { Action } from 'flux-standard-action';
import * as Immutable from 'immutable';
import 'jasmine-expect';
import { KARMA_ACTIONS } from '../../services/karma.actions';
import { browser, IBrowserState, BROWSER_INIT_STATE } from './browser.reducer';
import * as resultReducer from './result.reducer';

describe('browser reducer', () => {
    describe('initial state', () => {
        it('should have its "id" property set to "undefined"', () => {
            expect(BROWSER_INIT_STATE.get('id')).toBeUndefined();
        });
        it('should have its "name" property set to "undefined"', () => {
            expect(BROWSER_INIT_STATE.get('name')).toBeUndefined();
        });
        it('should have its "results" property set to an empty array', () => {
            expect(BROWSER_INIT_STATE.get('results').toJS()).toBeEmptyArray();
        });
        it('should have its "running" property set to "false"', () => {
            expect(BROWSER_INIT_STATE.get('running')).toBeFalse();
        });
        it('should have its "visible" property set to "false"', () => {
            expect(BROWSER_INIT_STATE.get('visible')).toBeFalse();
        });
    });
    describe('unknown action', () => {
        it('should return the unmodified state', () => {
            let state = BROWSER_INIT_STATE;
            expect(browser(state, {
                type: 'foo'
            })).toBe(state);
        });
    });
    describe('on KARMA_BROWSER_START', () => {
        let action: Action<any>;
        beforeEach(() => {
            action = {
                type: KARMA_ACTIONS.KARMA_BROWSER_START,
                payload: {
                    browser: {
                        id: 'foo',
                        name: 'bar'
                    }
                }
            };
        });
        describe('browser ID is undefined', () => {
            it('should set the browser\'s ID', () => {
                expect(browser(BROWSER_INIT_STATE, action).get('id')).toBe('foo');
            });
            it('should set the browser\'s name', () => {
                expect(browser(BROWSER_INIT_STATE, action).get('name')).toBe('bar');
            });
            it('should set its status to "running"', () => {
                expect(browser(BROWSER_INIT_STATE, action).get('running')).toBeTrue();
            });
        });
        describe('browser ID is match', () => {
            let state: IBrowserState;
            let result: resultReducer.IResultState;
            beforeEach(() => {
                result = resultReducer.RESULT_INIT_STATE;
                state = BROWSER_INIT_STATE.withMutations((_browser) => _browser
                    .set('id', 'foo')
                    .set('running', false)
                    .set('results', Immutable.fromJS([result])));
            });
            it('should set its status to "running"', () => {
                expect(browser(state, action).get('running')).toBeTrue();
            });
            it('should pass the action on to its results', () => {
                spyOn(resultReducer, 'result');
                browser(state, action);
                expect(resultReducer.result).toHaveBeenCalledWith(result, action);
            });
        });
        describe('browser ID is no match', () => {
            let state: IBrowserState;
            beforeEach(() => {
                state = BROWSER_INIT_STATE.withMutations((_browser) => _browser
                    .set('id', 'bar'));
            });
            it('should return the unmodified state', () => {
                expect(browser(state, action)).toBe(state);
            });
        });
    });
    describe('on KARMA_SPEC_COMPLETE', () => {
        let action: any;
        beforeEach(() => {
            action = {
                type: KARMA_ACTIONS.KARMA_SPEC_COMPLETE,
                payload: {
                    result: {
                        description: 'bar',
                        suite: ['foo1', 'foo2', 'foo3'],
                        success: true
                    }
                }
            };
        });
        it(`should pass the action on to its results`, () => {
            let result = Immutable.fromJS({ foo: 'bar' });
            let state = BROWSER_INIT_STATE.update('results', (_results) => _results.push(result));
            spyOn(resultReducer, 'result');
            browser(state, action);
            expect(resultReducer.result).toHaveBeenCalledWith(result, action);
        });
    });
    describe('on KARMA_BROWSER_COMPLETE', () => {
        describe('browser ID is match', () => {
            it('should set its status to "complete"', () => {
                let state = BROWSER_INIT_STATE.withMutations((_state) => _state
                    .set('id', 'foo')
                    .set('running', true)
                );
                expect(browser(state, {
                    type: KARMA_ACTIONS.KARMA_BROWSER_COMPLETE,
                    payload: {
                        browser: {
                            id: 'foo'
                        }
                    }
                }).get('running')).toBeFalse();
            });
        });
        describe('browser ID does not match', () => {
            it('should not change its status', () => {
                let state = BROWSER_INIT_STATE.withMutations((_state) => _state
                    .set('id', 'foo')
                    .set('running', true)
                );
                expect(browser(state, {
                    type: KARMA_ACTIONS.KARMA_BROWSER_COMPLETE,
                    payload: {
                        browser: {
                            id: 'bar'
                        }
                    }
                }).get('running')).toBeTrue();
            });
        });
    });
});
