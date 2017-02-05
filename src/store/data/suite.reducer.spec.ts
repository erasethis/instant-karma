import { async, inject, TestBed } from '@angular/core/testing';

import {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

import * as Immutable from 'immutable';
import 'jasmine-expect';
import { KARMA_ACTIONS } from '../../services/karma.actions';
import { suite, ISuiteState, SUITE_INIT_STATE } from './suite.reducer';
import * as resultReducer from './result.reducer';

describe('suite reducer', () => {
    describe('initial state', () => {
        it('should have its "id" property set to "undefined"', () => {
            expect(SUITE_INIT_STATE.get('id')).toBeUndefined();
        });
        it('should have its "parentId" property set to "undefined"', () => {
            expect(SUITE_INIT_STATE.get('parentId')).toBeUndefined();
        });
        it('should have its "results" property set to an empty array', () => {
            expect(SUITE_INIT_STATE.get('results').toJS()).toBeEmptyArray();
        });
        it('should have its "visible" property set to "false"', () => {
            expect(SUITE_INIT_STATE.get('visible')).toBeFalse();
        });
    });
    describe('unknown action', () => {
        it('should return the unmodified state', () => {
            let state = SUITE_INIT_STATE;
            expect(suite(state, {
                type: 'foo'
            })).toBe(state);
        });
    });
    describe('on KARMA_BROWSER_START', () => {
        it('should pass the action on to its results', () => {
            let result = Immutable.fromJS({ foo: 'bar' });
            let state = SUITE_INIT_STATE.update('results', (_results) => _results.push(result));
            let action = {
                type: KARMA_ACTIONS.KARMA_BROWSER_START,
                payload: {
                    id: 'foo',
                    name: 'bar'
                }
            };
            spyOn(resultReducer, 'result');
            suite(state, action);
            expect(resultReducer.result).toHaveBeenCalledWith(result, action);
        });
    });
});
