import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { select } from 'ng2-redux';

@Component({
    selector: 'ink-browser',
    templateUrl: './browser.component.html',
    styleUrls: ['./browser.component.scss']
})
export class BrowserComponent implements OnInit {
    @Input()
    public name: string;

    @Input()
    public status: string;

    @Input()
    public total: number;

    public ngOnInit() {
        
    }
};
