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

    @Input()
    public results: Observable<IResultState[]>;

    public showPreview: Observable<boolean>;

    @select(['data', 'run', 'browsers'])
    private browsers: Observable<Immutable.List<IBrowserState>>;

    constructor(route: ActivatedRoute) {

    }

    public ngOnInit() {
       // this.showPreview = this.results.map((_results) =>
       //     _results.some((_result) => _result.get('selected') === true));
    }

    public trackById(index: number, item: any): string {
        let id = item ? [item.browserId, item.id].join('/') : undefined;
        // console.log('track by id = ', id);
        return id;
    }
};
