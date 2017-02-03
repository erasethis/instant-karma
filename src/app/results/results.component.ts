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
        let session = c.session.toJS();
        let selectedId = null;
        while (true) {
            model.unshift(this.getSuite(session, id, selectedId));

            if (id === null) {
                break;
            }

            selectedId = id;
            id = this.getParentId(id, session.suites);
        }

        return model;
    }

    private getSuite(session: any, id: string, selectedId: string): ISuite {
        let suite: ISuite = { suites: [], results: [] };

        if (session.suites) {
            suite.suites = this.filterById(session.suites, id, selectedId);
        }

        if (session.results) {
            suite.results = this.filterById(session.results, id, null);
        }
        return suite;
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
