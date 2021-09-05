import { Investment } from './investment.model';

export interface IResponseInvestment {
    data: Investment[];
    status: string;
}