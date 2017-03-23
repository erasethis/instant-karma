import { Component, Input } from '@angular/core';
import { IResultItem } from './result-item.model';

@Component({
    selector: 'ink-result-item',
    templateUrl: './result-item.component.html',
    styleUrls: ['./result-item.component.scss']
})
export class ResultItemComponent {
    @Input()
    public result: IResultItem;

    public click($event) {
        if ($event) {
            $event.stopPropagation();
        }
        return false;
    }
};
