import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';

export const RESULT_ACTIONS = {
    RESULT_NEW_RESULT: 'RESULT_NEW_RESULT',
    RESULT_UPDATE_RESULT: 'RESULT_UPDATE_RESULT',
    RESULT_SELECT: 'RESULT_SELECT'
};

@Injectable()
export class ResultActions {
    constructor(private ngRedux: NgRedux<any>) { }

    public select(browserId: string, specId: string) {
        this.ngRedux.dispatch({
            type: RESULT_ACTIONS.RESULT_SELECT,
            payload: {
                browserId,
                specId
            }
        });
    }
};
