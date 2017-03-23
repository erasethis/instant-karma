import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import {
    RouterModule,
    PreloadAllModules
} from '@angular/router';

import { routes, appRoutingProviders } from './app.routes';

import { NgReduxModule, NgRedux } from 'ng2-redux';
import { NgReduxRouter } from 'ng2-redux-router';
import * as createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { IAppState, rootReducer } from '../store';

import { AppComponent } from './app.component';

import {
    OrderByBrowserNamePipe,
    ResultsExplorerComponent,
    ResultItemComponent,
    ResultPreviewComponent,
    ResultPreviewHeaderComponent,
    ResultPreviewLogComponent,
    ResultsComponent,
    ResultsGroupComponent,
    ResultsWithoutPreviewComponent
} from './results';

import { ResultActions } from '../services';
import { IKarmaReporterHostAddress, KarmaReporter } from '../services';

import '../styles/styles.scss';
import '../styles/headings.css';
import '../styles/theme.scss';

declare var window: {
    devToolsExtension: any
};

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        OrderByBrowserNamePipe,
        ResultsExplorerComponent,
        ResultItemComponent,
        ResultPreviewComponent,
        ResultPreviewHeaderComponent,
        ResultPreviewLogComponent,
        ResultsComponent,
        ResultsGroupComponent,
        ResultsWithoutPreviewComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        HttpModule,
        MaterialModule.forRoot(),
        RouterModule.forRoot(routes, { useHash: true, preloadingStrategy: PreloadAllModules }),
        NgReduxModule
    ],
    providers: [
        appRoutingProviders,
        NgReduxRouter,
        { provide: 'IKarmaReporterHostAddress', useValue: { host: 'localhost', port: 3200 } },
        KarmaReporter,
        ResultActions
    ]
})
export class AppModule {
    constructor(ngRedux: NgRedux<any>, ngReduxRouter: NgReduxRouter) {
        ngRedux.configureStore(rootReducer, undefined, [thunkMiddleware/*, createLogger({
            predicate: (getState, action) => action.type !== SERVICE_ACTIONS.SERVICE_CHECK_CONNECTION_REQUEST &&
                action.type !== SERVICE_ACTIONS.SERVICE_CHECK_CONNECTION_FETCH_RESULT
        })*/], window.devToolsExtension && window.devToolsExtension());
        ngReduxRouter.initialize();
    }
}
