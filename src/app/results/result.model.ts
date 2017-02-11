import { ResultStatus } from '../../store/data';

export interface IResult {
    id: string;
    description: string;
    suite: string[];
    status: ResultStatus;
};
