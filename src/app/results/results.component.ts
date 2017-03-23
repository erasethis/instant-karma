import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as Immutable from 'immutable';
import { select } from 'ng2-redux';
import { IBrowserState, ISuiteState, IResultState, ResultStatus } from '../../store/data';

type ResultsModel = {
    browsers: Observable<IBrowserState[]>,
    failed: Observable<IResultState[]>,
    all: Observable<IResultState[]>
    showPreview: Observable<boolean>;
};

@Component({
    selector: 'ink-results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.scss']
})
export class ResultsComponent {
    public model: ResultsModel;

    @select(['data', 'run', 'browsers'])
    private browsers: Observable<IBrowserState[]>;

    @select(['data', 'run', 'suite', 'results'])
    private results: Observable<Immutable.List<IResultState>>;

    constructor() {
        this.model = {
            browsers: this.browsers,
            failed: this.results.map((_results) =>
                _results.filter((_result) =>
                    _result.get('status') === ResultStatus.Failed).toArray()),
            all: this.results.map((_results) => _results.toArray()),
            showPreview: this.results.map((_results) =>
                _results.some((_result) => _result.get('selected') === true)).do(x => console.log(`showPreview=${x}`))
        };
    }

    public trackByBrowserId(index: number, item: any): number {
        return item ? +item.id : undefined;
    }
};
