import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'realCurrency'
})

export class RealCurrencyPipe implements PipeTransform {
    transform(value: any, args?: any): any {
        if(!value) {
            return ['R$ 0,00'];
        }

    const expression = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);

    const symbol = 'R$ ';

    return [symbol + expression];
  }
}