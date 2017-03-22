import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { select } from 'ng2-redux';
import * as Immutable from 'immutable';
import { IBrowserState, IResultState } from '../../../store/data';
import { IResultDetails } from './result-details.model';

@Component({
    selector: 'ink-result-preview',
    templateUrl: './result-preview.component.html',
    styleUrls: ['./result-preview.component.scss']
})
export class ResultPreviewComponent {
    public details: Observable<IResultDetails>;

    @select(['data', 'run', 'browsers'])
    private browsers: Observable<Immutable.List<IBrowserState>>;

    @select(['data', 'run', 'suite', 'results'])
    private results: Observable<Immutable.List<IResultState>>;

    private browserId: Observable<number>;
    private specId: Observable<string>;

    constructor(route: ActivatedRoute) {
        let browserId = route.params.map((_params) =>
            _params['browserId']).distinctUntilChanged();

        let specId = route.params.map((_params) =>
            _params['specId']).distinctUntilChanged();

        this.details = Observable.combineLatest(this.browsers, this.results, browserId, specId,
            (_browsers, _results, _browserId, _specId) =>
                ({ _browsers, _results, _browserId, _specId })).map((c) => {

            let result = c._results.find(((r) => r.get('id') === c._specId &&
                r.get('browserId') === c._browserId));

            if (result) {
                let browser = c._browsers.find((_browser) =>
                    _browser.get('id') === result.get('browserId'));

                return {
                    browserName: browser ? browser.get('name') : result.get('browserId'),
                    result: result.toJS()
                };
            }

            return undefined;
        }).filter((_result) => _result !== undefined);
    }
};
