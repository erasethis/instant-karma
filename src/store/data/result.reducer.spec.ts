import { async, inject, TestBed } from '@angular/core/testing';

import {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

import { Action } from 'flux-standard-action';
import * as Immutable from 'immutable';
import 'jasmine-expect';
import * as md5 from 'md5-hex';
import { KARMA_ACTIONS, RESULT_ACTIONS } from '../../services';
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
    describe('on KARMA_SPEC_COMPLETE', () => {
        let action: any;
        beforeEach(() => {
            action = {
                type: KARMA_ACTIONS.KARMA_SPEC_COMPLETE,
                payload: {
                    result: {
                        id: 'spec42',
                        description: 'foo'
                    }
                },
                meta: {
                    parentId: 'bar'
                }
            };
        });
        describe('result ID is undefined', () => {
            it('should compute its own ID correctly', () => {
                let suite = ['foo1', 'foo2', 'foo3'];
                let id = md5([...suite, action.payload.result.id].join('|'));
                action.payload.result.suite = suite;
                expect(result(RESULT_INIT_STATE, action).get('id')).toEqual(id);
            });
            describe('path is empty', () => {
                beforeEach(() => {
                    action.payload.result.suite = [];
                });
                it('should set its "description" property to the spec\'s description', () => {
                    expect(result(RESULT_INIT_STATE, action).get('description'))
                        .toEqual(action.payload.result.description);
                });
                it('should set its "icon" property to "colorize"', () => {
                    expect(result(RESULT_INIT_STATE, action).get('icon')).toEqual('colorize');
                });
            });
            describe('path is not empty', () => {
                beforeEach(() => {
                    action.payload.result.suite = ['foo1', 'foo2', 'foo3'];
                });
                it('should set its "icon" property to "layers"', () => {
                    expect(result(RESULT_INIT_STATE, action).get('icon')).toEqual('layers');
                });
                it('should set its "description" property to the first path element', () => {
                    expect(result(RESULT_INIT_STATE, action).get('description'))
                        .toEqual(action.payload.result.suite[0]);
                });
            });
        });
        describe('spec successful', () => {
            it('should set its "status" property to "Success"', () => {
                action.payload.result.success = true;
                expect(result(RESULT_INIT_STATE, action).get('status'))
                    .toEqual(ResultStatus.Success);
            });
        });
        it('should set its "log" property', () => {
            action.payload.result.log = ['foo'];
            expect(result(RESULT_INIT_STATE, action).get('log'))
                .toEqual(Immutable.fromJS(['foo']));
        });
    });
});
