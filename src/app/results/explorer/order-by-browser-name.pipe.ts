import { Pipe, PipeTransform } from '@angular/core';
import { orderBy } from 'lodash';
import { IResultsGroup } from './results-group.model';

@Pipe({
    name: 'orderByBrowserName'
})
export class OrderByBrowserNamePipe implements PipeTransform {
    public transform(values: IResultsGroup[], args: any[]): any {
        if (!values) {
            return values;
        }

        return orderBy(values, (_value: IResultsGroup) => _value.name);
    }
};
