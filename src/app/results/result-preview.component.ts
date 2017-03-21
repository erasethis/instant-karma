import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { select } from 'ng2-redux';
import * as Immutable from 'immutable';
import { IBrowserState, IResultState } from '../../store/data';
import { IResult } from './result.model';

@Component({
    selector: 'ink-result-preview',
    templateUrl: './result-preview.component.html',
    styleUrls: ['./result-preview.component.scss']
})
export class ResultPreviewComponent {
    @Input()
    public result: Observable<IResult>;

    @select(['data', 'run', 'suite', 'results'])
    private results: Observable<Immutable.List<IResultState>>;

    private browserId: Observable<number>;
    private specId: Observable<string>;

    constructor(route: ActivatedRoute) {
        let browserId = route.params.map((_params) =>
            _params['browserId']).distinctUntilChanged();

        let specId = route.params.map((_params) =>
            _params['specId']).distinctUntilChanged();

        this.result = Observable.combineLatest(this.results, browserId, specId,
            (_results, _browserId, _specId) => ({ _results, _browserId, _specId })).map((c) => {

            console.log(`browserId=${c._browserId}, specId=${c._specId}`);

            let item = c._results.find(((r) => r.get('id') === c._specId &&
                r.get('browserId') === c._browserId));

            return item ? item.toJS() : undefined;
        }).filter((_result) => _result !== undefined);
    }
};
