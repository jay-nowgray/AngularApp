import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, AuthGuardSuperAdmin } from 'src/app/utility/auth.gaurds';
import { AssetsManagementComponent } from './assets-management/assets-management.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { InvoicingComponent } from './invoicing/invoicing.component';
import { PaymentRequestComponent } from './payment-request/payment-request.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { SiteLayoutComponent } from 'src/app/_layout/site-layout/site-layout.component';
import { EditinvoiceComponent } from './invoicing/editinvoice/editinvoice.component';
import { EmployeeExpensesComponent } from './employee-expenses/employee-expenses.component';
// import { EmployeePlByDateComponent } from 'src/app/reports/employee-pl-by-date/employee-pl-by-date.component';


const routes: Routes = [{
  path: "",
  component: SiteLayoutComponent,
  children: [{ path: "accounts/assets-management", component: AssetsManagementComponent },
  { path: "accounts/expenses", component: ExpensesComponent },
  { path: "accounts/employee-expenses", component: EmployeeExpensesComponent },
  { path: "accounts/Invoicing", canActivate: [AuthGuard], component: InvoicingComponent },
  { path: "accounts/invoicing/editinvoice/:Id", canActivate: [AuthGuardSuperAdmin], component: EditinvoiceComponent },
  { path: "accounts/patment-request", canActivate: [AuthGuard], component: PaymentRequestComponent },
  { path: "accounts/transactions", canActivate: [AuthGuardSuperAdmin], component: TransactionsComponent },]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }
