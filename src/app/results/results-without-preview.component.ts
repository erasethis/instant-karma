import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';
import { ResultActions } from '../../services';

@Component({
    selector: 'ink-results-without-preview',
    template: ''
})
export class ResultsWithoutPreviewComponent implements OnInit, OnDestroy {
    private subs: Subscription[] = [];

    constructor(
        private resultActions: ResultActions,
        private route: ActivatedRoute) { }

    public ngOnInit() {
        this.subs.push(this.route.params.subscribe(() =>
            this.resultActions.select(null, null)));
    }

    public ngOnDestroy() {
        this.subs.forEach((_sub) => _sub.unsubscribe());
    }
};
