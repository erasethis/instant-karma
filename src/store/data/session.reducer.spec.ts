import { async, inject, TestBed } from '@angular/core/testing';

import {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

import 'jasmine-expect';
import { KARMA_ACTIONS } from '../../services/karma.actions';
import { session, ISessionState, SESSION_INIT_STATE } from './session.reducer';

describe('session reducer', () => {
    describe('initial state', () => {
        it('should have its "success" property set to "false"', () => {
            expect(SESSION_INIT_STATE.get('success')).toBeFalse();
        });
        it('should have its "results" property set to an empty object', () => {
            expect(SESSION_INIT_STATE.get('results').toJS()).toBeEmptyObject();
        });
        it('should have its "suites" property set to an empty object', () => {
            expect(SESSION_INIT_STATE.get('suites').toJS()).toBeEmptyObject();
        });
    });
});
