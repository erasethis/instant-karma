import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { select } from 'ng2-redux';
import * as Immutable from 'immutable';
import { IBrowserState, IResultState } from '../../store/data';

@Component({
    selector: 'ink-results-explorer',
    templateUrl: './results-explorer.component.html',
    styleUrls: ['./results-explorer.component.scss']
})
export class ResultsExplorerComponent {
    public results: Observable<IResultState[]>;

    @select(['data', 'run', 'browsers'])
    private browsers: Observable<Immutable.List<IBrowserState>>;

    constructor(route: ActivatedRoute) {
        let browserId = route.params.map((_params) =>
            _params['id']).distinctUntilChanged();

        this.results = Observable.combineLatest(browserId, this.browsers,
            (_id, _browsers) => ({ _id, _browsers}))
            .map((c) => {
                console.log('id=', c._id)
                let match = c._browsers.find((b) => b.get('id') === c._id);
                return match
                    ? match.get('results').toJS()
                    : []
            }
        ).do(x => console.log(x));
    }

    public trackBySpecId(index: number, item: any): string {
        return item ? item.id : undefined;
    }
};
