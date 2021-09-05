import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { Investment } from '../shared/models/investment.model';

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {

  private subject: Subject<Investment> = new ReplaySubject<Investment>(1);

  constructor(private http: HttpClient) { }

  public getInvestments(): Observable<Investment[]> {
    const url = 'http://www.mocky.io/v2/5e76797e2f0000f057986099';
     return this.http.get(url)
     .pipe(map((res: any) => res.response.data.listaInvestimentos));
  }

  setDetailInvestment(investment: Investment) {
    this.subject.next(investment);
}

  getDetailInvestment(): Observable<Investment> {
    return this.subject.asObservable();
}
}
