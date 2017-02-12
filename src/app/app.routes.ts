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
            path: ':id',
            component: ResultsExplorerComponent,
            canActivate: [IsValidBrowser],
            children: [
                { path: ':id', component: ResultPreviewComponent }
            ]
        },
    ]},
    // { path: 'about', component: AboutComponent },
    { path: '**', redirectTo: 'results', pathMatch: 'full' },
];


export const appRoutingProviders: any[] = [];
