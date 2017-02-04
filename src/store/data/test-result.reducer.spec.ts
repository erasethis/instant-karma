import { async, inject, TestBed } from '@angular/core/testing';

import {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

import 'jasmine-expect';
import { KARMA_ACTIONS } from '../../services/karma.actions';
import { testResult, ITestResultState, TEST_RESULT_INIT_STATE } from './test-result.reducer';

describe('test result reducer', () => {
    describe('initial state', () => {
        it('should have its "success" property set to "false"', () => {
            expect(TEST_RESULT_INIT_STATE.get('success')).toBeTrue();
        });
        it('should have its "log" property set to an empty array', () => {
            expect(TEST_RESULT_INIT_STATE.get('log').toJS()).toBeEmptyArray();
        });
    });
});
