import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { select } from 'ng2-redux';
import * as Immutable from 'immutable';
import { IBrowserState } from '../../store/data';

@Injectable()
export class IsValidBrowser implements CanActivate {
    @select(['data', 'run', 'browsers'])
    private browsers: Observable<Immutable.List<IBrowserState>>;

    public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        let browserId = route.params['id'];

        return this.browsers.map((_browsers) => {
            return _browsers.find((b) => b.get('id') === browserId) !== undefined;
        });
    }
};
