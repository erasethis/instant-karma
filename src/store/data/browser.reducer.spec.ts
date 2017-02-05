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
import * as suiteReducer from './suite.reducer';

describe('browser reducer', () => {
    describe('initial state', () => {
        it('should have its "id" property set to "undefined"', () => {
            expect(BROWSER_INIT_STATE.get('id')).toBeUndefined();
        });
        it('should have its "name" property set to "undefined"', () => {
            expect(BROWSER_INIT_STATE.get('name')).toBeUndefined();
        });
        it('should have its "suites" property set to an empty array', () => {
            expect(BROWSER_INIT_STATE.get('suites').toJS()).toBeEmptyArray();
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
        it('should pass the action on to its suites', () => {
            let suite = Immutable.fromJS({ foo: 'bar' });
            let state = BROWSER_INIT_STATE.update('suites', (_suites) => _suites.push(suite));
            spyOn(suiteReducer, 'suite');
            browser(state, action);
            expect(suiteReducer.suite).toHaveBeenCalledWith(suite, action);
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
