import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { IResultState } from '../../../store/data';
import { FlyInOutAnimation } from '../../fly-in-out.animation';

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

    public trackById(index: number, item: any): string {
        return item ? [item.browserId, item.id].join('/') : undefined;
    }
};
