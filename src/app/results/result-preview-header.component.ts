import { Component, Input } from '@angular/core';
import { IResult } from './result.model';

@Component({
    selector: 'ink-result-preview-header',
    templateUrl: './result-preview-header.component.html',
    styleUrls: ['./result-preview-header.component.scss']
})
export class ResultPreviewHeaderComponent {
    @Input()
    public result: IResult;
};
