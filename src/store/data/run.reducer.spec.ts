import { async, inject, TestBed } from '@angular/core/testing';

import {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

import { Action } from 'flux-standard-action';
import * as Immutable from 'immutable';
import 'jasmine-expect';
import { KARMA_ACTIONS } from '../../services/karma.actions';
import { run, IRunState, RUN_INIT_STATE } from './run.reducer';

describe('run reducer', () => {
    describe('initial state', () => {
        it('should have its "id" property set to "undefined"', () => {
            expect(RUN_INIT_STATE.get('id')).toBeUndefined();
        });
        it('should have its "completed" property set to "false"', () => {
            expect(RUN_INIT_STATE.get('completed')).toBeFalse();
        });
    });
    describe('unknown action', () => {
        it('should return the unmodified state', () => {
            let state = RUN_INIT_STATE;
            expect(run(state, {
                type: 'foo'
            })).toBe(state);
        });
    });
    describe('on KARMA_RUN_START', () => {
        let action: Action<any>;
        beforeEach(() => {
            action = {
                type: KARMA_ACTIONS.KARMA_RUN_START
            };
        });
        it('should set its ID', () => {
            expect(run(RUN_INIT_STATE, action).get('id')).not.toBeUndefined();
        });
        it('should set its status to "running"', () => {
            let state = RUN_INIT_STATE.set('completed', true);
            expect(run(state, action).get('completed')).toBeFalse();
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
    });
    describe('on KARMA_RUN_COMPLETE', () => {
        it('should set its status to "completed"', () => {
            expect(run(RUN_INIT_STATE, {
                type: KARMA_ACTIONS.KARMA_RUN_COMPLETE
            }).get('completed')).toBeTrue();
        });
    });
});
