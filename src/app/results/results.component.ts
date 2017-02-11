import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as Immutable from 'immutable';
import { select } from 'ng2-redux';
import { IRunState, IBrowserState, IResultState } from '../../store/data';

@Component({
    selector: 'ink-results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.scss']
})
export class ResultsComponent {
    public browsers: Observable<IBrowserState[]>;

    @select(['data', 'run', 'browsers'])
    private _browsers: Observable<Immutable.List<IBrowserState>>;

    constructor() {
        this.browsers = this._browsers.map((_browser) => _browser.toJS());
    }

    public browserChange($event) {
        console.log($event);
    }

    public trackByBrowserId(index: number, item: any): number {
        return item ? +item.id : undefined;
    }
};
