import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { select } from 'ng2-redux';
import * as Immutable from 'immutable';
import { ISessionState } from '../../store';

@Component({
    selector: 'ink-results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
    public suites: Observable<any[]>;
    public results: Observable<any[]>;

    public model: Observable<Array<{ suites: any[], results: any[], index: number }>>;

    @select(['data', 'session'])
    private session: Observable<ISessionState>;

    constructor(private route: ActivatedRoute) { }

    public ngOnInit() {
        let suiteId: Observable<string> = this.route.params
            .map((params) => params['id'] ? params['id'] : null);

        this.model = Observable.combineLatest(this.session, suiteId,
            (session, id) => ({ session, id })).map((c) => {
                let model = [];
                let id = c.id;
                let suites = c.session.get('suites').toJS();
                let results = c.session.get('results').toJS();
                let selectedId = null;
                let index = 1;
                while (true) {
                    console.log('id = ', id)
                    let level = { suites: [], results: [], index: index++ };

                    if (suites) {
                        level.suites = this.filterById(suites, id, selectedId);
                    }

                    if (results) {
                        level.results = this.filterById(results, id, null);
                    }

                    model.unshift(level);

                    if (id === null) {
                        break;
                    }

                    if (suites) {
                        selectedId = id;
                        id = id && id in suites ? suites[id].suite : null;
                    } else {
                        id = null;
                    }

                }

                return model;
            });
    }

    public getWidth(index: number): string {
        return (100 / index).toString() + '%';
    }

    private filterById(map: { [id: string]: { suite: string, selected: boolean} }, id: string, selectedId: string): any[] {
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
