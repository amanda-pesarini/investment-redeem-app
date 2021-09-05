import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'
import { of } from 'rxjs';
import { AppModule } from '../app.module';
import { InvestmentService } from '../service/investment.service';
import { MockInvestmentService } from '../shared/mocks/mock-investment-service';

import { InvestmentRedeemComponent } from './investment-redeem.component';

describe('InvestmentRedeemComponent', () => {
  let component: InvestmentRedeemComponent;
  let fixture: ComponentFixture<InvestmentRedeemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule, AppModule],
      declarations: [ InvestmentRedeemComponent ],
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
    fixture = TestBed.createComponent(InvestmentRedeemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call methods of ngOnInit', async () => {
    const investmentMock = MockInvestmentService.investmentMock;
    const service = TestBed.inject(InvestmentService);

    spyOn(component, 'getInvestmentDetail');
    spyOn(component, 'calculateActionValue');
    spyOn(component, 'createForm');
    spyOn(component, 'valueChangesForm');

    spyOn(service, 'getDetailInvestment').and.returnValue(of(investmentMock));
    component.ngOnInit();

    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(component.getInvestmentDetail).toHaveBeenCalled();
    expect(component.calculateActionValue).toHaveBeenCalled();
    expect(component.createForm).toHaveBeenCalled();
    expect(component.valueChangesForm).toHaveBeenCalled();
  });

  it('should create form', async () => {
    const service = TestBed.inject(InvestmentService);
    const investmentMock = MockInvestmentService.investmentMock;
    const formRawValue = {
      BBAS3: ''
    }
   
    spyOn(service, 'getDetailInvestment').and.returnValue(of(investmentMock));

    component.ngOnInit();

    fixture.detectChanges();

    expect(component.form).toBeTruthy();
    expect(component.form.getRawValue()).toEqual(formRawValue);
  });
});
