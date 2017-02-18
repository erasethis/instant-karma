import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as Immutable from 'immutable';
import { select } from 'ng2-redux';
import { IBrowserState, IResultState } from '../../store/data';

@Component({
    selector: 'ink-results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.scss']
})
export class ResultsComponent {
    public model: Observable<{ results: IResultState[] }>;

    @select(['data', 'run', 'browsers'])
    private browsers: Observable<Immutable.List<IBrowserState>>;

    constructor() {
        this.model = this.browsers.map((_browsers) => {
            let selectedBrowser = _browsers.find((_browser) => _browser.get('selected') === true);
            return ({
                results: selectedBrowser ? selectedBrowser.get('results').toJS() : []
            });
        }).distinctUntilChanged();
    }

    public trackByBrowserId(index: number, item: any): number {
        return item ? +item.id : undefined;
    }
};
