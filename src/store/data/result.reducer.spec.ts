import { async, inject, TestBed } from '@angular/core/testing';

import {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

import * as Immutable from 'immutable';
import 'jasmine-expect';
import { KARMA_ACTIONS } from '../../services/karma.actions';
import { result, IResultState, RESULT_INIT_STATE, ResultStatus } from './result.reducer';

describe('result reducer', () => {
    describe('initial state', () => {
        it('should have its "id" property set to "undefined"', () => {
            expect(RESULT_INIT_STATE.get('id')).toBeUndefined();
        });
        it('should have its "parentId" property set to "undefined"', () => {
            expect(RESULT_INIT_STATE.get('parentId')).toBeUndefined();
        });
        it('should have its "icon" property set to "undefined"', () => {
            expect(RESULT_INIT_STATE.get('icon')).toBeUndefined();
        });
        it('should have its "description" property set to "undefined"', () => {
            expect(RESULT_INIT_STATE.get('description')).toBeUndefined();
        });
        it('should have its "status" property set to "None"', () => {
            expect(RESULT_INIT_STATE.get('status')).toBe(ResultStatus.None);
        });
        it('should have its "log" property set to an empty array', () => {
            expect(RESULT_INIT_STATE.get('log').toJS()).toBeEmptyArray();
        });
        it('should have its "visible" property set to "false"', () => {
            expect(RESULT_INIT_STATE.get('visible')).toBeFalse();
        });
    });
    describe('unknown action', () => {
        it('should return the unmodified state', () => {
            let state = RESULT_INIT_STATE;
            expect(result(state, {
                type: 'foo'
            })).toBe(state);
        });
    });
    describe('on KARMA_BROWSER_START', () => {
        it('should set the "status" property to "Pending"', () => {
            expect(result(RESULT_INIT_STATE, {
                type: KARMA_ACTIONS.KARMA_BROWSER_START
            }).get('status')).toBe(ResultStatus.Pending);
        });
    });
});
