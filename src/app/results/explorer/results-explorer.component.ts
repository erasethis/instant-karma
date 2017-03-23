import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ResultActions } from '../../../services';
import { IBrowserState, IResultState } from '../../../store/data';
import { FlyInOutAnimation } from '../../fly-in-out.animation';
import { groupBy } from 'lodash';
import { IResultItem } from './result-item.model';
import { IResultsGroup } from './results-group.model';

@Component({
    selector: 'ink-results-explorer',
    templateUrl: './results-explorer.component.html',
    styleUrls: ['./results-explorer.component.scss'],
    animations: [FlyInOutAnimation]
})
export class ResultsExplorerComponent implements OnInit {
    public state = 'in';

    @Input()
    public browsers: Observable<IBrowserState[]>;

    @Input()
    public results: Observable<IResultState[]>;

    public groups: Observable<IResultsGroup[]>;

    constructor(private resultActions: ResultActions) { }

    public ngOnInit() {
        this.groups = Observable.combineLatest(this.browsers, this.results,
            (_browsers, _results) => ({ _browsers, _results })).map((c) => {
                let resultsGroups: IResultsGroup[] = [];
                let groups = groupBy(c._results, (_result) => _result.get('browserId'));
                for (let key in groups) {
                    if (groups.hasOwnProperty(key)) {
                        let browser = c._browsers.find((_browser) => _browser.get('id') === key);
                        let name = browser ? browser.get('name') : key;
                        resultsGroups.push({ name, results: groups[key].map((_result) =>
                            this.createItem(_result)) });
                    }
                }
                return resultsGroups;
        });
    }

    public trackById(index: number, item: any): string {
        return item ? [item.browserId, item.id].join('/') : undefined;
    }

    private createItem(result: IResultState): IResultItem {
        return {
            icon: 'flask',
            title: result.get('description'),
            path: [result.get('browserId'), result.get('id')],
            status: result.get('status')
        };
    }
};
