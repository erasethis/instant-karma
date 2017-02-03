import { async, inject, TestBed } from '@angular/core/testing';

import {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

import 'jasmine-expect';
import { KARMA_ACTIONS } from '../../services/karma.actions';
import { progress, IProgressState } from './progress.reducer';

describe('progress reducer', () => {
    describe('initial state', () => {
        it('should have its "busy" property set to "false"', () => {
            expect(progress(undefined, undefined).get('busy')).toBeFalse();
        });
    });
    describe('when test run is starting', () => {
        it('should set its "busy" property to "true"', () => {
            expect(progress(undefined, {
                type: KARMA_ACTIONS.KARMA_BROWSER_START,
                payload: { }
            }).get('busy')).toBeTrue();
        });
    });
    describe('when test run is completed', () => {
         it('should set its "busy" property to "false"', () => {
         expect(progress(undefined, {
                type: KARMA_ACTIONS.KARMA_RUN_COMPLETE,
                payload: { }
            }).get('busy')).toBeFalse();
        });
    });
});
