import { ResultStatus } from '../../../common';

export interface IResultItem {
    icon: string;
    title: string;
    status: ResultStatus;
    path: string[];
};
