import { Component, Input } from '@angular/core';
import { IResultState } from '../../../store';

@Component({
    selector: 'ink-result-item',
    templateUrl: './result-item.component.html',
    styleUrls: ['./result-item.component.scss']
})
export class ResultItemComponent {
    @Input()
    public result: IResultState;

    public click($event) {
        if ($event) {
            $event.stopPropagation();
        }
        return false;
    }
};
