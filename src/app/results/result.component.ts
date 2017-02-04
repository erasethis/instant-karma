import { Component, Input, OnInit } from '@angular/core';
import { IResult } from './result.model';

@Component({
    selector: 'ink-result',
    templateUrl: './result.component.html',
    styleUrls: ['./result.component.scss']
})
export class ResultComponent {
    @Input()
    public result: IResult;
};
