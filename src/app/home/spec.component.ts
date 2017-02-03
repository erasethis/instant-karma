import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { select } from 'ng2-redux';

@Component({
    selector: 'ink-spec',
    templateUrl: './spec.component.html',
    styleUrls: ['./spec.component.scss']
})
export class SpecComponent implements OnInit {
    @Input()
    public id: string;

    @Input()
    public description: string;

    @Input()
    public success: boolean;



    public ngOnInit() {
        
    }
};
