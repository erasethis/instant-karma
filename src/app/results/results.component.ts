import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { select } from 'ng2-redux';
import * as Immutable from 'immutable';
import { ISessionState } from '../../store';
import { ISuite } from './suite.model';

@Component({
    selector: 'ink-results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
    public suites: Observable<any[]>;
    public results: Observable<any[]>;

    public model: Observable<ISuite[]>;

    @select(['data', 'session'])
    private session: Observable<ISessionState>;

    constructor(private route: ActivatedRoute) { }

    public ngOnInit() {
        let suiteId: Observable<string> = this.route.params
            .map((params) => params['id'] ? params['id'] : null);

        this.model = Observable.combineLatest(this.session, suiteId,
            (session, id) => ({ session, id })).map((c) =>
                this.getModel(c));
    }

    private getModel(c: { id: string, session: ISessionState }): ISuite[] {
        let model = [];
        let id = c.id;
        let suites = c.session.get('suites').toJS();
        let results = c.session.get('results').toJS();
        let selectedId = null;
        let index = 1;
        while (true) {
            model.unshift(this.getLevel(suites, results, id, selectedId, index++));

            if (id === null) {
                break;
            }

            selectedId = id;
            id = this.getParentId(id, suites);
        }

        return model;
    }

    private getLevel(suites: any, results: any, id: string, selectedId: string, index: number) {
        let level = { suites: [], results: [], index };

        if (suites) {
            level.suites = this.filterById(suites, id, selectedId);
        }

        if (results) {
            level.results = this.filterById(results, id, null);
        }
        return level;
    }

    private getParentId(id: string, suites: any) {
        return suites && id && id in suites ? suites[id].suite : null;
    }

    private filterById(map: { [id: string]: { suite: string, selected: boolean } }, id: string, selectedId: string): any[] {
        let results: any[] = [];
        for (let key of Object.keys(map)) {
            if (map[key].suite === id) {
                if (key === selectedId) {
                    map[key].selected = true;
                }
                results.push(map[key]);
            }
        }
        return results;
    }
};
