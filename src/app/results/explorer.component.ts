import { Component, Input } from '@angular/core';
import * as Immutable from 'immutable';
import { IResultState } from '../../store/data';

@Component({
    selector: 'ink-explorer',
    templateUrl: './explorer.component.html',
    styleUrls: ['./explorer.component.scss']
})
export class ExplorerComponent {
    @Input()
    public results: IResultState[];

    public trackBySpecId(index: number, item: any): string {
        return item ? item.id : undefined;
    }
};
