import { Component, Input } from '@angular/core';

@Component({
    selector: 'ink-result',
    templateUrl: './result.component.html',
    styleUrls: ['./result.component.scss']
})
export class ResultComponent {
    @Input()
    public icon: string;

    @Input()
    public path: string[];

    @Input()
    public description: string;

    @Input()
    public success: boolean;

    @Input()
    public selected: boolean;
};
