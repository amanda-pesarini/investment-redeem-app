import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { InvestmentListComponent } from './investment-list/investment-list.component';
import { InvestmentRedeemComponent } from './investment-redeem/investment-redeem.component';
import { ModalComponent } from './modal/modal.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RealCurrencyPipe } from './shared/pipes/real-currency.pipe';
import { CurrencyMaskInputMode, NgxCurrencyModule } from 'ngx-currency';
import { ReactiveFormsModule } from '@angular/forms';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { ModalService } from './service/modal.service';

export const customCurrencyMaskConfig = {
  align: 'right',
  allowNegative: false,
  allowZero: true,
  decimal: ',',
  precision: 2,
  prefix: 'R$ ',
  suffix: '',
  thousands: '.',
  nullable: true,
  min: undefined,
  max: undefined,
  inputMode: CurrencyMaskInputMode.FINANCIAL
};

@NgModule({
  declarations: [
    AppComponent,
    InvestmentListComponent,
    InvestmentRedeemComponent,
    ModalComponent,
    RealCurrencyPipe
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    ModalModule.forRoot()
  ],
  entryComponents: [ModalComponent],
  providers: [BsModalService, BsModalRef],
  bootstrap: [AppComponent]
})
export class AppModule { }
