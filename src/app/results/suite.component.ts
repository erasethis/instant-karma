import { Component, Input, OnInit } from '@angular/core';
import { ISuite } from './suite.model';
// import { IResult } from './result.model';

@Component({
    selector: 'ink-suite',
    templateUrl: './suite.component.html',
    styleUrls: ['./suite.component.scss']
})
export class SuiteComponent {
    @Input()
    public suite: ISuite;


};
