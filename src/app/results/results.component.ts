import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as Immutable from 'immutable';
import { select } from 'ng2-redux';
import { IBrowserState } from '../../store/data';

@Component({
    selector: 'ink-results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.scss']
})
export class ResultsComponent {
    public model: Observable<Array<{ id: string, name: string }>>;

    @select(['data', 'run', 'browsers'])
    private browsers: Observable<Immutable.List<IBrowserState>>;

    constructor() {
        this.model = this.browsers.map((_browsers) =>
            _browsers.map((_browser) => ({
                id: _browser.get('id'),
                name: _browser.get('name')
            })).toJS()
        ).distinctUntilChanged();
    }

    public trackByBrowserId(index: number, item: any): number {
        return item ? +item.id : undefined;
    }
};
