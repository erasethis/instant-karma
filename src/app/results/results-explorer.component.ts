import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { select } from 'ng2-redux';
import * as Immutable from 'immutable';
import { IBrowserState, IResultState } from '../../store/data';
import { FlyInOutAnimation } from '../fly-in-out.animation';

@Component({
    selector: 'ink-results-explorer',
    templateUrl: './results-explorer.component.html',
    styleUrls: ['./results-explorer.component.scss'],
    animations: [FlyInOutAnimation]
})
export class ResultsExplorerComponent {
    public state = 'in';
    public results: Observable<IResultState[]>;

    @select(['data', 'run', 'browsers'])
    private browsers: Observable<Immutable.List<IBrowserState>>;

    constructor(route: ActivatedRoute) {
        let browserId = route.params.map((_params) =>
            _params['id']).distinctUntilChanged().do(x => console.log('browser id = ', x));

        this.results = Observable.combineLatest(browserId, this.browsers,
            (_browserId, _browsers) => ({ _browserId, _browsers}))
            .map((c) => {
                let match = c._browsers.find((b) => b.get('id') === c._browserId);
                console.log('match for ', c._browserId, ': ', match.toJS())
                return match
                    ? match.get('results').toJS()
                    : [];
            }
        ).do(x => console.log('results = ', x));
    }

    public trackById(index: number, item: any): string {
        let id = item ? [item.browserId, item.id].join('/') : undefined;
        // console.log('track by id = ', id);
        return id;
    }
};
