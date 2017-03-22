import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { IResultState } from '../../../store/data';
import { FlyInOutAnimation } from '../../fly-in-out.animation';
import { groupBy } from 'lodash';
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
    public results: Observable<IResultState[]>;

    public groups: Observable<IResultsGroup[]>;

    public ngOnInit() {
        this.groups = this.results.map((_results) => {
            let resultsGroups: IResultsGroup[] = [];
            let groups = groupBy(_results, (_result) => _result.get('browserId'));
            for (let key in groups) {
                if (groups.hasOwnProperty(key)) {
                    resultsGroups.push({ name: key, results: groups[key] });
                }
            }
            return resultsGroups;
        });
    }

    public trackById(index: number, item: any): string {
        return item ? [item.browserId, item.id].join('/') : undefined;
    }
};
