import { Component, Input, OnInit } from '@angular/core';
import { IResult } from './result.model';

@Component({
    selector: 'ink-result-detail',
    templateUrl: './result-detail.component.html',
    styleUrls: ['./result-detail.component.scss']
})
export class ResultDetailComponent {
    @Input()
    public result: IResult;
};
