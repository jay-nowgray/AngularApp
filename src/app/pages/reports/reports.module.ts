import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { SalaryPlComponent } from '../../reports/salary-pl/salary-pl.component';
// import { SalaryAdjustmentComponent } from './salary-adjustment/salary-adjustment.component';
//import { BalanceReportComponent } from './balance-report/balance-report.component';


@NgModule({
 // declarations: [SalaryPlComponent, BalanceReportComponent],
  imports: [
    CommonModule,
    ReportsRoutingModule
  ],
//  declarations: [SalaryAdjustmentComponent]
})
export class ReportsModule { }
