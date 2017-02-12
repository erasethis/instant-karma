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
        it('should have its "browserId" property set to "undefined"', () => {
            expect(RESULT_INIT_STATE.get('browserId')).toBeUndefined();
        });
        it('should have its "description" property set to "undefined"', () => {
            expect(RESULT_INIT_STATE.get('description')).toBeUndefined();
        });
        it('should have its "suite" property set to an empty array', () => {
            expect(RESULT_INIT_STATE.get('suite').toJS()).toBeEmptyArray();
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
        let action: Action<any>;
        beforeEach(() => {
            action = {
                type: KARMA_ACTIONS.KARMA_SPEC_COMPLETE,
                payload: {
                    browser: {
                        id: '34569876',
                    },
                    result: {
                        id: 'spec42',
                        description: 'foobar',
                        suite: ['foo', 'bar']
                    }
                }
            };
        });
        it('should set its "id" property', () => {
            expect(result(RESULT_INIT_STATE, action).get('id'))
                .toEqual('spec42');
        });
        it('should set its "browserId" property', () => {
            expect(result(RESULT_INIT_STATE, action).get('browserId'))
                .toEqual('34569876');
        });
        it('should set its "description" property"', () => {
            expect(result(RESULT_INIT_STATE, action).get('description'))
                .toEqual('foobar');
        });
        it('should set its "suite" property"', () => {
            expect(result(RESULT_INIT_STATE, action).get('suite').toJS())
                .toEqual(['foo', 'bar']);
        });
        describe('spec successful', () => {
            beforeEach(() => {
                action.payload.result.success = true;
            });
            it('should set its "status" property to "Success"', () => {
                expect(result(RESULT_INIT_STATE, action).get('status'))
                    .toEqual(ResultStatus.Success);
            });
        });
        describe('spec failed', () => {
            beforeEach(() => {
                action.payload.result.success = false;
                action.payload.result.log = ['foo.\r\nbar'];
            });
            it('should set its "status" property to "Failed"', () => {
                expect(result(RESULT_INIT_STATE, action).get('status'))
                    .toEqual(ResultStatus.Failed);
            });
            it('should set its "messages" property', () => {
                expect(result(RESULT_INIT_STATE, action).get('messages'))
                    .toEqual(Immutable.fromJS(['foo.']));
            });
            it('should set its "log" property', () => {
                expect(result(RESULT_INIT_STATE, action).get('log'))
                    .toEqual(Immutable.fromJS(['foo.\r\nbar']));
            });
        });
    });
});
