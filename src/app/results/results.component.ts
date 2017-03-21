import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as Immutable from 'immutable';
import { select } from 'ng2-redux';
import { ISuiteState, IResultState, ResultStatus } from '../../store/data';

type ResultsModel = {
    failed: Observable<IResultState[]>,
    all: Observable<IResultState[]>
};

@Component({
    selector: 'ink-results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.scss']
})
export class ResultsComponent {
    public model: ResultsModel;

    @select(['data', 'run', 'suite', 'results'])
    private results: Observable<Immutable.List<IResultState>>;

    constructor() {
        this.model = {
            failed: this.results.map((_results) =>
                _results.filter((_result) =>
                    _result.get('status') === ResultStatus.Failed).toArray()),
            all: this.results.map((_results) => _results.toArray())
        };
    }

    public trackByBrowserId(index: number, item: any): number {
        return item ? +item.id : undefined;
    }
};
