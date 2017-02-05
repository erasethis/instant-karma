import { async, inject, TestBed } from '@angular/core/testing';

import {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

import { Action } from 'flux-standard-action';
import * as Immutable from 'immutable';
import 'jasmine-expect';
import { KARMA_ACTIONS, RESULT_ACTIONS } from '../../services';
import { resultGroup, IResultGroupState, RESULT_GROUP_INIT_STATE } from './result-group.reducer';
import * as resultReducer from './result.reducer';

describe('result group reducer', () => {
    describe('initial state', () => {
        it('should have its "id" property set to "undefined"', () => {
            expect(RESULT_GROUP_INIT_STATE.get('id')).toBeUndefined();
        });
        it('should have its "parentId" property set to "undefined"', () => {
            expect(RESULT_GROUP_INIT_STATE.get('parentId')).toBeUndefined();
        });
        it('should have its "results" property set to an empty array', () => {
            expect(RESULT_GROUP_INIT_STATE.get('results').toJS()).toBeEmptyArray();
        });
        it('should have its "visible" property set to "false"', () => {
            expect(RESULT_GROUP_INIT_STATE.get('visible')).toBeFalse();
        });
    });
    describe('unknown action', () => {
        it('should return the unmodified state', () => {
            let state = RESULT_GROUP_INIT_STATE;
            expect(resultGroup(state, {
                type: 'foo'
            })).toBe(state);
        });
    });
    describe('on KARMA_BROWSER_START', () => {
        it('should pass the action on to its results', () => {
            let result = Immutable.fromJS({ foo: 'bar' });
            let state = RESULT_GROUP_INIT_STATE.update('results', (_results) =>
                _results.push(result));

            let action = {
                type: KARMA_ACTIONS.KARMA_BROWSER_START,
                payload: {
                    id: 'foo',
                    name: 'bar'
                }
            };
            spyOn(resultReducer, 'result');
            resultGroup(state, action);
            expect(resultReducer.result).toHaveBeenCalledWith(result, action);
        });
    });
    describe('on RESULT_ADD_OR_UPDATE', () => {
        let action: Action<any>;
        beforeEach(() => {
            action = {
                type: RESULT_ACTIONS.RESULT_ADD_OR_UPDATE,
                payload: {
                    id: 'foo',
                    description: 'bar'
                }
            };
        });
        describe('result with that description doesn\'t exist yet', () => {
            it('should create the result', () => {
                let result = resultReducer.RESULT_INIT_STATE.withMutations((_result) => _result
                    .set('id', 'foo')
                    .set('description', 'bar')
                );
                let state = RESULT_GROUP_INIT_STATE.set('results',
                    Immutable.List([result]));

                expect(resultGroup(state, action).get('results'))
                    .toEqual(Immutable.List([result]));
            });
        });
        describe('result with that description already exists', () => {
            it('should replace the result', () => {
                let state = Immutable.fromJS({
                    results: [
                        { id: 'foo', description: 'bar' }
                    ]
                });
                expect(resultGroup(state, action).get('results').toJS())
                    .toEqual([{ id: 'foo', description: 'bar' }]);
            });
        });
    });
});
