import { IResult } from './result.model';

export interface ISuite {
    suites: ISuite[];
    results: IResult[];
};
