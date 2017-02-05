import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { select } from 'ng2-redux';
import * as Immutable from 'immutable'; 
import { IRunState, ISessionState, ITestResultState } from '../../store';
import { IResult } from './result.model';
import { ISuite } from './suite.model';

@Component({
    selector: 'ink-results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
    public model: Observable<{
        browser: string,
        suites: ISuite[],
        result: IResult
    }>;

    @select(['data', 'session'])
    private session: Observable<ISessionState>;

    @select(['data', 'run'])
    private run: Observable<IRunState>;

    constructor(private route: ActivatedRoute) { }

    public ngOnInit() {
        let suiteId: Observable<string> = this.route.params
            .map((params) => params['id'] ? params['id'] : null);

        this.model = Observable.combineLatest(this.session, suiteId,
            (session, id) => ({ session, id })).map((c) =>
                this.getModel(c));
    }

    private getModel(c: { id: string, session: ISessionState }): {
        suites: ISuite[],
        result: IResult
    } {
        let id = c.id;
        let session = c.session.toJS();
        let selectedId = null;
        let width = 60;
        let model = {
            browser: (session.browser) ? session.browser.name : '',
            suites: [],
            result: undefined
        };

        if (session.results && id in session.results) {
            let result = session.results[id];
            model.result = {
                id,
                path: this.getPath(result, session),
                description: result.description,
                success: result.success,
                log: result.log
            };
            width *= 0.4;
            selectedId = id;
            id = result.suite;
        }

        while (true) {
            model.suites.unshift(this.getSuite(session, id, selectedId, width));
            width *= 0.4;

            if (id === null) {
                break;
            }

            selectedId = id;
            id = this.getParentId(id, session.suites);
        }
        //console.log('model = ', model)
        return model;
    }
    private getPath(result: any, session: any): string[] {
        let suites = session.suites;
        let parentId = result.suite;
        let path: string[] = [];
        while (parentId) {
            let suiteName = parentId in suites ? suites[parentId] : undefined;
            if (suiteName) {
                path.unshift(suiteName);
            }
            parentId = parentId in suites ? suites[parentId].suite : undefined;
        }
        return path;
    }

    private getSuite(session: any, id: string, selectedId: string, width: number): ISuite {
        let suite: ISuite = { suites: [], results: [], log: [], width: '100%' };
        if (session.suites) {
            suite.suites = this.filterById(session.suites, id, selectedId);
        }

        if (session.results) {
            suite.results = this.filterById(session.results, id, selectedId);

            suite.width = `${width}%`;

            return suite;
        }
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
