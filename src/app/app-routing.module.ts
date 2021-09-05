import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvestmentListComponent } from './investment-list/investment-list.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { InvestmentRedeemComponent } from './investment-redeem/investment-redeem.component';

const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  {
    path: 'list', 
    component: InvestmentListComponent,
  },
  {
    path: 'redeem/:nome', 
    component: InvestmentRedeemComponent
  }
]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
