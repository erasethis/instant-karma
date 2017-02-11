import { Routes, RouterModule } from '@angular/router';
import { ResultsComponent, ResultDetailsComponent } from './results';
//import { AboutComponent } from './about';
//import { NoContentComponent } from './no-content';

//import { DataResolver } from './app.resolver';

export const routes: Routes = [
  { path: '', redirectTo: 'results', pathMatch: 'full' },
  { path: 'results',  component: ResultsComponent },
  { path: 'results/:browserId',  component: ResultsComponent, children: [
      { path: ':specId', component: ResultDetailsComponent }
  ] },
  //{ path: 'results/:id',  component: ResultsComponent },
  /*{ path: 'about', component: AboutComponent },
  { path: 'detail', loadChildren: './+detail#DetailModule'},
  { path: 'barrel', loadChildren: './+barrel#BarrelModule'},*/
  //{ path: '**',    component: NoContentComponent },
];

export const appRoutingProviders: any[] = [];
