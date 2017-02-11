import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';
import { Observable } from 'rxjs/Rx';
import { KarmaReporter } from '../services/karma-reporter.service';
import { NgRedux, select } from 'ng2-redux';

@Component({
    selector: 'body',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    @select(['ui', 'progress', 'busy'])
    public busy: Observable<boolean>;

    private iconPath = '/assets/svg/material-icons/';

    constructor(
        private ngRedux: NgRedux<any>,
        private reporter: KarmaReporter,
        private mdIconRegistry: MdIconRegistry,
        private sanitizer: DomSanitizer) {
        mdIconRegistry.addSvgIcon('menu',
            sanitizer.bypassSecurityTrustResourceUrl(`${this.iconPath}ic_menu_white_24px.svg`));
        mdIconRegistry.addSvgIcon('layers',
            sanitizer.bypassSecurityTrustResourceUrl(`${this.iconPath}ic_layers_black_48px.svg`));
        mdIconRegistry.addSvgIcon('colorize',
            sanitizer.bypassSecurityTrustResourceUrl(`${this.iconPath}ic_colorize_black_48px.svg`));
        mdIconRegistry.addSvgIcon('flask',
            sanitizer.bypassSecurityTrustResourceUrl(`/assets/svg/icons/flask.svg`));
    }

    public ngOnInit() {
        this.reporter.start();
    }
};
