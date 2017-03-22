import { Component, Input } from '@angular/core';
import { IResultsGroup } from './results-group.model';

@Component({
    selector: 'ink-results-group',
    templateUrl: './results-group.component.html',
    styleUrls: ['./results-group.component.scss']
})
export class ResultsGroupComponent {
    @Input()
    public group: IResultsGroup;
};
