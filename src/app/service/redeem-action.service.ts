import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Investment } from '../shared/models/investment.model';

@Injectable({ providedIn: 'root' })
export class RedeemActionService {
    private subject = new Subject<any>();

    setDetailInvestment(investment: Investment) {
        this.subject.next(investment);
    }

    getDetailInvestment(): Observable<any> {
        return this.subject.asObservable();
    }
}