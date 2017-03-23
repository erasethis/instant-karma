import { Routes, RouterModule } from '@angular/router';

import {
    ResultsComponent,
    ResultPreviewComponent,
    ResultsWithoutPreviewComponent
} from './results';

export const routes: Routes = [
    { path: '', redirectTo: 'results', pathMatch: 'full' },
    { path: 'results', component: ResultsComponent, children: [
        {
            path: ':browserId/:specId',
            component: ResultPreviewComponent
        },
        {
            path: '',
            component: ResultsWithoutPreviewComponent
        }
    ]},
    { path: '**', redirectTo: 'results', pathMatch: 'full' },
];


export const appRoutingProviders: any[] = [];
