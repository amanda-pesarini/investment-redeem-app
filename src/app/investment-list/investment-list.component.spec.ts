import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'
import { of } from 'rxjs';
import { AppModule } from '../app.module';
import { InvestmentService } from '../service/investment.service';
import { MockInvestmentService } from '../shared/mocks/mock-investment-service';

import { InvestmentListComponent } from './investment-list.component';

describe('InvestmentListComponent', () => {
  let component: InvestmentListComponent;
  let fixture: ComponentFixture<InvestmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule, AppModule],
      declarations: [ InvestmentListComponent ],
      providers: [
        {
          provide: InvestmentService,
          useClass: MockInvestmentService
        }
    ]
  })
    .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(InvestmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call loadInvestmentsList method', async () => {
    const mockInvestment = MockInvestmentService.investmentsMock;
    const service = TestBed.inject(InvestmentService);

    spyOn(component, 'loadInvestmentsList');
    spyOn(service, 'getInvestments').and.returnValue(of(mockInvestment));
    component.ngOnInit();

    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(component.loadInvestmentsList).toHaveBeenCalled();
  });

  it('should call setDetailInvestment method', async () => {
    const service = TestBed.inject(InvestmentService);
    const mockInvestment = {
      nome: "Investimento 1",
      objetivo: "Viagem",
      saldoTotalDisponivel: 12345.34,
      indicadorCarencia: 'N',
      acoes: [],
    }

    spyOn(service, 'setDetailInvestment');
    component.routeToRedeem(mockInvestment);

    fixture.detectChanges();

    expect(service.setDetailInvestment).toHaveBeenCalled();
  });

  it('shouldnt call setDetailInvestment method', async () => {
    const service = TestBed.inject(InvestmentService);
    const mockInvestment = {
      nome: "Investimento 1",
      objetivo: "Viagem",
      saldoTotalDisponivel: 12345.34,
      indicadorCarencia: 'S',
      acoes: [],
    }

    spyOn(service, 'setDetailInvestment');
    component.routeToRedeem(mockInvestment);

    fixture.detectChanges();

    expect(service.setDetailInvestment).not.toHaveBeenCalled();
  });
});
