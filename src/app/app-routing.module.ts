import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { AuthGuard, AuthGuardSuperAdmin, RoleGuard } from "./utility/auth.gaurds";
import { SiteLayoutComponent } from "./_layout/site-layout/site-layout.component";
import { SystemErrorComponent } from "./pages/devtools/system-error/system-error.component";
import { SmsPanelComponent } from './pages/crm/sms-panel/sms-panel.component';
import { ToDoComponent } from './pages/project-management/to-do/to-do.component';
import { TaskComponent } from './pages/project-management/task/task.component';
import { ProjectsComponent } from './pages/project-management/projects/projects.component';
import { TimeSheetComponent } from './pages/time-managementent/time-sheet/time-sheet.component';
import { TimeTrackingComponent } from './pages/time-managementent/time-tracking/time-tracking.component';
import { ActivitySheetComponent } from './pages/crm/activity-sheet/activity-sheet.component';
import { ClientsComponent } from './pages/crm/clients/clients.component';
import { AssetsManagementComponent } from './pages/accounts/assets-management/assets-management.component';
import { ExpensesComponent } from './pages/accounts/expenses/expenses.component';
import { TransactionsComponent } from './pages/accounts/transactions/transactions.component';
import { InvoicingComponent } from './pages/accounts/invoicing/invoicing.component';

import { SalariesComponent } from './pages/hrm/salaries/salaries.component';
import { EmployeesComponent } from './pages/hrm/employees/employees.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { HelpComponent } from './pages/help/help.component';
import { MemberComponent } from './pages/member/member.component';
import { SettingComponent } from './pages/setting/setting.component';
import { OportunityComponent } from './pages/crm/oportunity/oportunity.component';
import { EditOportunityComponent } from './pages/crm/oportunity/edit-oportunity/edit-oportunity.component';
import { EditEmployeeComponent } from './pages/hrm/employees/edit-employee/edit-employee.component';
import { PaymentRequestComponent } from './pages/accounts/payment-request/payment-request.component';
import { StatusReportComponent } from './pages/status-report/status-report.component';
import { DailyReportComponent } from './pages/hrm/daily-report/daily-report.component';
import { EditLeadsComponent } from './pages/crm/leads/edit-leads/edit-leads.component';
import { LeadsComponent } from './pages/crm/leads/leads.component';
import { JobApplicantsComponent } from './pages/hrm/job-applicants/job-applicants.component';
import { EditJobApplicantsComponent } from './pages/hrm/job-applicants/edit-job-applicants/edit-job-applicants.component';
import { TimeDashboardComponent } from './pages/bentex/time-dashboard/time-dashboard.component';
import { SiteLayoutBtxComponent } from './_layoutbtx/site-layout/site-layout-btx.component';
import { TimeUserTrackerComponent } from './pages/bentex/time-user-tracker/time-user-tracker.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { ProfileComponent } from './pages/auth/profile/profile.component';
import { LookupheadComponent } from './pages/lookuphead/lookuphead.component';

import { MyfirmComponent } from './pages/myfirm/myfirm.component';

import { EmployeePlComponent } from './reports/employee-pl/employee-pl.component';
import { EmployeePlByDateComponent } from './reports/employee-pl-by-date/employee-pl-by-date.component';

import { BillingRateComponent } from './pages/billing-rate/billing-rate.component';
import { BtxInvoiceComponent } from './pages/bentex/btx-invoice/btx-invoice.component';
 
import { SalaryPlComponent } from './reports/salary-pl/salary-pl.component';
import { DaybookComponent } from './pages/project-management/daybook/daybook.component';
import { ResetPasswordService } from './pages/accounts/reset-password/reset-password.service';
import { BalanceReportComponent } from './reports/balance-report/balance-report.component';
import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component';
import { PendingInvoiceComponent } from './reports/pending-invoice/pending-invoice.component';
import { NotificationComponent } from './reports/notification/notification.component';
import { ImportantLinksComponent } from "./pages/devtools/important-links/important-links.component";
//import { PendingInvoiceComponent } from "./pages/project-management/pending-invoice/pending-invoice.component";
//import { PendingInvoiceComponent } from "./reports/pending-invoice/pending-invoice.component";
import { SocialmediaComponent } from './pages/devtools/socialmedia/socialmedia.component';
import { EmployeeExpensesComponent } from "./pages/accounts/employee-expenses/employee-expenses.component";
import { EmployeeTransactionComponent } from "./pages/accounts/employee-expenses/employee-transaction/employee-transaction.component";
import { BtxInvoiceComboComponent } from "./pages/bentex/btx-invoice-combo/btx-invoice-combo.component";
import { SalaryAdjustmentComponent } from "./reports/salary-adjustment/salary-adjustment.component";
import { NowgrayTimeDashboardComponent } from "./pages/bentex/nowgray-time-dashboard/nowgray-time-dashboard.component";
import { SoftwareSaleComponent } from "./pages/project-management/software-sale/software-sale.component";
import { AbsentReportComponent } from './reports/absent-report/absent-report.component';
import { ExpenseReportComponent } from "./reports/expense-report/expense-report.component";
import { TransactionReportComponent } from "./reports/transaction-report/transaction-report.component";
import { EmployeeDocumentComponent } from "./pages/hrm/employee-document/employee-document.component";
import { OfferLetterComponent } from "./pages/hrm/employee-document/offer-letter/offer-letter.component";
import { AppointmentLetterComponent } from "./pages/hrm/employee-document/appointment-letter/appointment-letter.component";
import { PendingInvoiceUserComponent } from "./reports/pending-invoice/pending-invoice-user/pending-invoice-user.component";


const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "btx-invoice",   component: BtxInvoiceComponent }, 
   { path: "btx-invoice-combo",   component: BtxInvoiceComboComponent },
  {
    path: "",
    component: SiteLayoutComponent,
    children: [
      {
        path: "dashboard",
        canActivate: [AuthGuardSuperAdmin],
        component: DashboardComponent,
        data: { title: "My Dashboard",roles: ['Admin'] }
      },
      
      {
        path: "password-manager",
        canActivate: [AuthGuard],
        component: ImportantLinksComponent
      },
      {
        path: "employee-expenses",
      
        component: EmployeeExpensesComponent
      },
      {
        path: "socialmedia",
        canActivate: [AuthGuard],
        component: SocialmediaComponent
      },
      {
        path: "system-error",
        canActivate: [AuthGuard],
        component: SystemErrorComponent
      },
      {
        path: "lookuphead",
        canActivate: [AuthGuardSuperAdmin],
        component: LookupheadComponent
      },
        
        {
          path: "billing-rate",
         canActivate: [AuthGuardSuperAdmin],
          component: BillingRateComponent
        },

        { path: "employee-pl",  canActivate: [AuthGuardSuperAdmin], component: EmployeePlComponent },
        { path: "project-management/software-sales",  canActivate: [AuthGuardSuperAdmin], component: SoftwareSaleComponent },
        { path: "Importantlink",  canActivate: [AuthGuardSuperAdmin], component: ImportantLinksComponent },
        { path: "employee-pl-date", canActivate: [AuthGuardSuperAdmin], component: EmployeePlByDateComponent },
        { path: "reports/salay-pl", canActivate: [AuthGuardSuperAdmin], component: SalaryPlComponent },
        { path: "reset-password", component: ResetPasswordComponent },
        { path: "reports/balance-report", canActivate: [AuthGuardSuperAdmin], component: BalanceReportComponent },
       // { path: "reports/pending-invoice", canActivate: [AuthGuardSuperAdmin], component: PendingInvoiceComponent },
        { path: "reports/notification", canActivate: [AuthGuardSuperAdmin], component: NotificationComponent },
        { path: "reports/pending-invoice", canActivate: [AuthGuardSuperAdmin], component: ReportsComponent },
        { path: "reports/salart-adjustment", canActivate: [AuthGuardSuperAdmin], component: SalaryAdjustmentComponent },
        { path: "reports/absent", component: AbsentReportComponent },
      {
        path: "myfirm",
        canActivate: [AuthGuardSuperAdmin],
        component: MyfirmComponent
      },
      {path: "reports/expenses-report",   component: ExpenseReportComponent }, 
      {path: "reports/transaction-report", canActivate: [AuthGuardSuperAdmin], component: TransactionReportComponent }, 

     
    ]
  },
  //Status-Report
  { path: "status-report/:key", component: StatusReportComponent },
  
  //Bentex
  { path: "bentex", component: LoginComponent },

  {
    path: "",
    component: SiteLayoutBtxComponent,
    children: [
      { path: "bentex/time-dashboard/nowgray", canActivate: [AuthGuard], component: NowgrayTimeDashboardComponent },
      { path: "time-dashboard/:Id", canActivate: [AuthGuard], component: TimeDashboardComponent },
      { path: "bentex/time-user-tracker", canActivate: [AuthGuard], component: TimeUserTrackerComponent },
      { path: "bentex/daybook", canActivate: [AuthGuard], component: DaybookComponent },
      { path: "bentex/status-report/:key", component: StatusReportComponent }, 
      { path: "bentex/opportunity", canActivate: [AuthGuard], component: OportunityComponent },
      { path: "bentex/edit-oportunity/:Id", canActivate: [AuthGuard], component: EditOportunityComponent },
      { path: "bentex/edit-oportunity", canActivate: [AuthGuard], component: EditOportunityComponent },
      { path: "bentex/password-manager", canActivate: [AuthGuard], component: ImportantLinksComponent }, 
      { path: "bentex/salaries", canActivate: [AuthGuard], component: SalaryPlComponent }, 
      { path: "accounts/employee-expenses",canActivate: [AuthGuard], component: EmployeeExpensesComponent }, 
      { path: "bentex/accounts/employee-expenses/employee-transaction",canActivate: [AuthGuard], component: EmployeeTransactionComponent }, 
      {path: "expenses-report",canActivate: [AuthGuard], component: ExpenseReportComponent }, 
      {path: "hrm/reports", component: EmployeeDocumentComponent }, 
       {path: "reports/pending-invoice-user",canActivate: [AuthGuard], component: PendingInvoiceUserComponent }, 
      // {path: "hrm/appointmentletter/:Id",canActivate: [AuthGuard], component: AppointmentLetterComponent }, 
    ]
  }

]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
