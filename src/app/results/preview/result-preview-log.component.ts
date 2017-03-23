import { Component, Input } from '@angular/core';
import { IResultState } from '../../../store';

@Component({
    selector: 'ink-result-preview-log',
    templateUrl: './result-preview-log.component.html',
    styleUrls: ['./result-preview-log.component.scss']
})
export class ResultPreviewLogComponent {
    @Input()
    public result: IResultState;
};
