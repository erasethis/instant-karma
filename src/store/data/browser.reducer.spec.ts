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
import * as resultGroupReducer from './result-group.reducer';

describe('browser reducer', () => {
    describe('initial state', () => {
        it('should have its "id" property set to "undefined"', () => {
            expect(BROWSER_INIT_STATE.get('id')).toBeUndefined();
        });
        it('should have its "name" property set to "undefined"', () => {
            expect(BROWSER_INIT_STATE.get('name')).toBeUndefined();
        });
        it('should have its "groups" property set to an empty array', () => {
            expect(BROWSER_INIT_STATE.get('groups').toJS()).toBeEmptyArray();
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
                    id: 'foo',
                    name: 'bar'
                }
            };
        });
        it('should set the browser\'s ID', () => {
            expect(browser(BROWSER_INIT_STATE, action).get('id')).toBe('foo');
        });
        it('should set the browser\'s name', () => {
            expect(browser(BROWSER_INIT_STATE, action).get('name')).toBe('bar');
        });
        it('should set its status to "running"', () => {
            expect(browser(BROWSER_INIT_STATE, action).get('running')).toBeTrue();
        });
        it('should pass the action on to its result groups', () => {
            let group = Immutable.fromJS({ foo: 'bar' });
            let state = BROWSER_INIT_STATE.update('groups', (_groups) => _groups.push(group));
            spyOn(resultGroupReducer, 'resultGroup');
            browser(state, action);
            expect(resultGroupReducer.resultGroup).toHaveBeenCalledWith(group, action);
        });
    });
    describe('on KARMA_SPEC_COMPLETE', () => {
        let action: Action<any>;
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
        describe('results array is empty', () => {
            it('should create a result group for each element in the spec\'s path', () => {
                expect(browser(BROWSER_INIT_STATE, action).get('groups').count()).toBe(3);
            });
        });
        describe('results array is shorter than spec\'s path', () => {
            it('should create additional result groups', () => {
                let state = BROWSER_INIT_STATE.update('groups', (_groups) =>
                    _groups.push({ foo: 'bar' }));
                expect(browser(state, action).get('groups').count()).toBe(3);
            });
        });
        describe('results array is shorter than spec\'s path', () => {
            it('should not create additional result groups', () => {
                let group = { foo: 'bar' };
                let state = BROWSER_INIT_STATE.update('groups', (_groups) =>
                    _groups.push(...[group, group, group, group]));
                expect(browser(state, action).get('groups').count()).toBe(4);
            });
        });
        it('should pass the action on to its result groups', () => {
            spyOn(resultGroupReducer, 'resultGroup');
            browser(BROWSER_INIT_STATE, action);
            expect(resultGroupReducer.resultGroup).toHaveBeenCalledTimes(3);
        });
    });
    describe('on KARMA_BROWSER_COMPLETE', () => {
        it('should set its status to "complete"', () => {
            let state = BROWSER_INIT_STATE.set('running', true);
            expect(browser(state, {
                type: KARMA_ACTIONS.KARMA_BROWSER_COMPLETE
            }).get('running')).toBeFalse();
        });
    });
});
