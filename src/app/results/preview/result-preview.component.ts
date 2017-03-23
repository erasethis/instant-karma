import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';
import { select } from 'ng2-redux';
import * as Immutable from 'immutable';
import { ResultActions } from '../../../services';
import { IBrowserState, IResultState } from '../../../store/data';
import { IResultDetails } from './result-details.model';

@Component({
    selector: 'ink-result-preview',
    templateUrl: './result-preview.component.html',
    styleUrls: ['./result-preview.component.scss']
})
export class ResultPreviewComponent implements OnInit, OnDestroy {
    public browser: Observable<IBrowserState>;
    public result: Observable<IResultState>;

    @select(['data', 'run', 'browsers'])
    private browsers: Observable<Immutable.List<IBrowserState>>;

    @select(['data', 'run', 'suite', 'results'])
    private results: Observable<Immutable.List<IResultState>>;

    private browserId: Observable<string>;
    private specId: Observable<string>;
    private subs: Subscription[] = [];

    constructor(route: ActivatedRoute, private resultActions: ResultActions) {
        this.browserId = route.params.map((_params) =>
            _params['browserId']).distinctUntilChanged();

        this.specId = route.params.map((_params) =>
            _params['specId']).distinctUntilChanged();
    }

    public ngOnInit() {
        this.browser = this.browsers.map((_browsers) =>
            _browsers.find((_browser) => _browser.get('selected') === true))
            .filter((_browser) => _browser !== undefined).do(x => console.log(x));

        this.result = this.results.map((_results) =>
            _results.find((_result) => _result.get('selected') === true))
            .filter((_result) => _result !== undefined).do(x => console.log(x));

        this.subs.push(Observable.combineLatest(this.browserId, this.specId,
            (_browserId, _specId) => ({ _browserId, _specId }))
            .distinctUntilChanged((x, y) => x._browserId === y._browserId &&
                x._specId === y._specId)
                .subscribe((c) => this.resultActions.select(c._browserId, c._specId)));
    }

    public ngOnDestroy() {
        this.subs.forEach((_sub) => _sub.unsubscribe());
    }
};
