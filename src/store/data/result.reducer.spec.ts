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
    describe('on RESULT_NEW_RESULT', () => {
        let action: Action<any>;
        beforeEach(() => {
            action = {
                type: RESULT_ACTIONS.RESULT_NEW_RESULT,
                payload: {
                    id: 'foo',
                    icon: 'bar',
                    description: 'foobar'
                }
            };
        });
        it('should set its "id" property', () => {
            expect(result(RESULT_INIT_STATE, action).get('id'))
                .toEqual('foo');
        });
        it('should set its "icon" property', () => {
            expect(result(RESULT_INIT_STATE, action).get('icon'))
                .toEqual('bar');
        });
        it('should set its "description" property"', () => {
            expect(result(RESULT_INIT_STATE, action).get('description'))
                .toEqual('foobar');
        });
    });
    describe('on RESULT_UPDATE_RESULT', () => {
        let action: Action<any>;
        let state;
        beforeEach(() => {
            action = {
                type: RESULT_ACTIONS.RESULT_UPDATE_RESULT,
                payload: {
                    status: ResultStatus.Success,
                    log: ['foo', 'bar']
                }
            };
            state = result(RESULT_INIT_STATE, {
                type: RESULT_ACTIONS.RESULT_NEW_RESULT,
                payload: {
                    id: 'foo'
                }
            });
        });
        it('should set its "status" property', () => {
            expect(result(state, action).get('status'))
                .toEqual(ResultStatus.Success);
        });
        it('should set its "log" property', () => {
            expect(result(state, action).get('log'))
                .toEqual(Immutable.fromJS(['foo', 'bar']));
        });
    });
});
