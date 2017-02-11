import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { select } from 'ng2-redux';
import * as Immutable from 'immutable';
import { IBrowserState, IResultState } from '../../store/data';
import { IResult } from './result.model';

@Component({
    selector: 'ink-result-details',
    templateUrl: './result-details.component.html',
    styleUrls: ['./result-details.component.scss']
})
export class ResultDetailsComponent {
    public result: Observable<IResult>;

    @select(['data', 'run', 'browsers'])
    private browsers: Observable<Immutable.List<IBrowserState>>;

    private browserId: Observable<number>;
    private specId: Observable<string>;

    constructor(route: ActivatedRoute) {
        let browserId = route.parent.params.map((_params) =>
            _params['browserId']).distinctUntilChanged();

        let specId = route.params.map((_params) =>
            _params['specId']).distinctUntilChanged();

        this.result = Observable.combineLatest(this.browsers, browserId, specId,
            (_browsers, _browserId, _specId) => ({ _browsers, _browserId, _specId })).map((c) => {
            let _browser = c._browsers.find((b) => b.get('id') === c._browserId);
            if (_browser) {
                return _browser.get('results').find(((r) => r.get('id') === c._specId)).toJS();
            }
        }).filter((_result) => _result !== undefined);
    }
};
