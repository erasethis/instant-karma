import { Component, Input } from '@angular/core';
import { IBrowserState, IResultState } from '../../../store';

@Component({
    selector: 'ink-result-preview-header',
    templateUrl: './result-preview-header.component.html',
    styleUrls: ['./result-preview-header.component.scss']
})
export class ResultPreviewHeaderComponent {
    @Input()
    public browser: IBrowserState;

    @Input()
    public result: IResultState;
};
