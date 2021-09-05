import { Observable, of } from 'rxjs';
import { Investment } from '../models/investment.model';

export class MockInvestmentService {
    static investmentsMock: Investment[] = [
        {
            nome: "INVESTIMENTO I",
            objetivo: "Minha aposentadoria",
            saldoTotalDisponivel: 39321.29,
            indicadorCarencia: "N",
            acoes: [
              {
                id: "1",
                nome: "BBAS3",
                percentual: 28.1
              },
              {
                id: "2",
                nome: "VALE3",
                percentual: 20.71
              },
              {
                id: "3",
                nome: "PETR4",
                percentual: 21.63
              },
              {
                id: "4",
                nome: "CMIG3",
                percentual: 12.41
              },
              {
                id: "5",
                nome: "OIBR3",
                percentual: 17.15
              }
            ]
          },
          {
            nome: "INVESTIMENTO II",
            objetivo: "Viajem dos sonhos",
            saldoTotalDisponivel: 7300,
            indicadorCarencia: "N",
            acoes: [
              {
                id: "1",
                nome: "BBAS3",
                percentual: 35.81
              },
              {
                id: "2",
                nome: "VALE3",
                percentual: 26.42
              },
              {
                id: "3",
                nome: "PETR4",
                percentual: 37.77
              }
            ]
          },
    ];

   static investmentMock: Investment = {
      nome: "INVESTIMENTO III",
      objetivo: "Abrir meu próprio negócio",
      saldoTotalDisponivel: 26000,
      indicadorCarencia: "N",
      acoes: [
        {
          id: "1",
          nome: "BBAS3",
          percentual: 41.1
        },
      ]
   }

    getInvestments(): Observable<Investment[]> {
        return of(MockInvestmentService.investmentsMock);
    }

    setDetailInvestment(): void {
    }

    getDetailInvestment(): Observable<Investment> {
      return of(MockInvestmentService.investmentMock);
    }
    
    }