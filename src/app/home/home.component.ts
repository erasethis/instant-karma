import {
    Component,
    OnInit
} from '@angular/core';

import { select } from 'ng2-redux';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    public browsers;
    public specs;

    @select(['data', 'session', 'testruns'])
    private testruns;

    public ngOnInit() {
        this.browsers = this.testruns.map((testruns) => testruns.toJS())
        .filter(x => x !== undefined && x.length > 0)
        .map(x => x[0].browsers);

        this.specs = this.testruns.map((testruns) => testruns.toJS())
        .filter(x => x !== undefined && x.length > 0)
        .map(x => x[0].browsers[0].specs).do(x => console.log(x));
    }
};
