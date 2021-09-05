import { Action } from './action.model';

export interface Investment {
  nome: string;
  objetivo: string;
  saldoTotalDisponivel: number;
  indicadorCarencia: string;
  acoes: Action[];
}