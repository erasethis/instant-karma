import { Component, Input } from '@angular/core';
import { IResultDetails } from './result-details.model';

@Component({
    selector: 'ink-result-preview-header',
    templateUrl: './result-preview-header.component.html',
    styleUrls: ['./result-preview-header.component.scss']
})
export class ResultPreviewHeaderComponent {
    @Input()
    public details: IResultDetails;
};
