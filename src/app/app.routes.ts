import { Routes, RouterModule } from '@angular/router';

import {
    IsValidBrowser,
    ResultsComponent,
    ResultPreviewComponent,
    ResultsExplorerComponent
} from './results';

//import { AboutComponent } from './about';

export const routes: Routes = [
    { path: '', redirectTo: 'results', pathMatch: 'full' },
    { path: 'results', component: ResultsComponent, children: [
        {
            path: ':browserId/:specId',
            component: ResultPreviewComponent,
            //canActivate: [IsValidBrowser],
        },
    ]},
    // { path: 'about', component: AboutComponent },
    { path: '**', redirectTo: 'results', pathMatch: 'full' },
];


export const appRoutingProviders: any[] = [];
