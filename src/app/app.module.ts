import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { Config } from "./utility/config";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { HttpModule } from "@angular/http";
import { AuthGuard, AuthGuardSuperAdmin, RoleGuard } from "./utility/auth.gaurds";
import { SiteLayoutComponent } from "./_layout/site-layout/site-layout.component";
import { SiteHeaderComponent } from "./_layout/site-header/site-header.component";
import { SiteSidebarComponent } from "./_layout/site-sidebar/site-sidebar.component";
import { NotificationBarComponent } from "./_layout/notification-bar/notification-bar.component";
import { SiteFooterComponent } from "./_layout/site-footer/site-footer.component";

import { NgxUiLoaderModule } from "ngx-ui-loader";
import { NgxPaginationModule } from "ngx-pagination";
import { ClipboardModule } from "ngx-clipboard";
import { AngularEditorModule } from "@kolkov/angular-editor";
import { DatePipe } from "@angular/common";
import { NgxSortableModule } from "ngx-sortable";
import { FileUploadModule } from "ng2-file-upload";
import { SystemErrorComponent } from "./pages/devtools/system-error/system-error.component";
import { SelectDropDownModule } from "ngx-select-dropdown";

import { ChartsModule } from 'ng2-charts';

import { MemberComponent } from './pages/member/member.component';
import { HelpComponent } from './pages/help/help.component';
import { TransactionsComponent } from './pages/accounts/transactions/transactions.component';
import { ExpensesComponent } from './pages/accounts/expenses/expenses.component';
import { AssetsManagementComponent } from './pages/accounts/assets-management/assets-management.component';
import { InvoicingComponent } from './pages/accounts/invoicing/invoicing.component';
import { EmployeesComponent } from './pages/hrm/employees/employees.component';
import { SalariesComponent } from './pages/hrm/salaries/salaries.component';

import { ReportsComponent } from './pages/reports/reports.component';
import { SettingComponent } from './pages/setting/setting.component';
import { ClientsComponent } from './pages/crm/clients/clients.component';
import { ActivitySheetComponent } from './pages/crm/activity-sheet/activity-sheet.component';
import { TimeTrackingComponent } from './pages/time-managementent/time-tracking/time-tracking.component';
import { TimeSheetComponent } from './pages/time-managementent/time-sheet/time-sheet.component';
import { ToDoComponent } from './pages/project-management/to-do/to-do.component';
import { TaskComponent } from './pages/project-management/task/task.component';
import { SmsPanelComponent } from './pages/crm/sms-panel/sms-panel.component';
import { OportunityComponent } from './pages/crm/oportunity/oportunity.component';
import { EditOportunityComponent } from './pages/crm/oportunity/edit-oportunity/edit-oportunity.component';
import { EditEmployeeComponent } from './pages/hrm/employees/edit-employee/edit-employee.component';
import { PaymentRequestComponent } from './pages/accounts/payment-request/payment-request.component';
import { StatusReportComponent } from './pages/status-report/status-report.component';
import { StatusTaskFormComponent } from './pages/status-report/status-task-form/status-task-form.component';
import { StatusFormComponent } from './pages/status-report/status-form/status-form.component';
import { DailyReportComponent } from './pages/hrm/daily-report/daily-report.component';
import { LeadsComponent } from './pages/crm/leads/leads.component';
import { EditLeadsComponent } from './pages/crm/leads/edit-leads/edit-leads.component';
import { JobApplicantsComponent } from './pages/hrm/job-applicants/job-applicants.component';
import { EditJobApplicantsComponent } from './pages/hrm/job-applicants/edit-job-applicants/edit-job-applicants.component';
import { TimeDashboardComponent } from './pages/bentex/time-dashboard/time-dashboard.component';
import { TimeUserTrackerComponent } from './pages/bentex/time-user-tracker/time-user-tracker.component';
import { SiteLayoutBtxComponent } from './_layoutbtx/site-layout/site-layout-btx.component';
import { SiteHeaderBtxComponent } from './_layoutbtx/site-header/site-header-btx.component';
import { SiteSidebarBtxComponent } from './_layoutbtx/site-sidebar-btx/site-sidebar-btx.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component';
import { LogoutComponent } from './pages/auth/logout/logout.component';
import { ProfileComponent } from './pages/auth/profile/profile.component';
import { ProjectManagementModule } from './pages/project-management/project-management.module';
import { CrmModule } from './pages/crm/crm.module';
import { HrmModule } from './pages/hrm/hrm.module';
import { AccountsModule } from './pages/accounts/accounts.module';
import { ReportsModule } from './pages/reports/reports.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { LookupheadComponent } from './pages/lookuphead/lookuphead.component';

import { MyfirmComponent } from './pages/myfirm/myfirm.component';
import { BankComponent } from './pages/myfirm/bank/bank.component';
import { PatnerComponent } from './pages/myfirm/patner/patner.component';
import { EmployeePlComponent } from './reports/employee-pl/employee-pl.component';
// import { EmployeePlByDateComponent } from './reports/employee-pl-by-date/employee-pl-by-date.component';
import { BillingRateComponent } from './pages/billing-rate/billing-rate.component';
import { BtxInvoiceComponent } from './pages/bentex/btx-invoice/btx-invoice.component';
import { SalaryPlComponent } from './reports/salary-pl/salary-pl.component';
import { BalanceReportComponent } from './reports/balance-report/balance-report.component';
import { AttachmentsService } from "./pages/global-attachment/attachments.service";

import { AttachmentsModule } from "./pages/global-attachment/attachments.module";
import { PendingInvoiceComponent } from './reports/pending-invoice/pending-invoice.component';
import { NotificationComponent } from './reports/notification/notification.component';
import { ImportantLinksComponent } from './pages/devtools/important-links/important-links.component';
import { SocialmediaComponent } from './pages/devtools/socialmedia/socialmedia.component';
import { EmployeeExpensesComponent } from "./pages/accounts/employee-expenses/employee-expenses.component";
import { EmployeePlByDateComponent } from "./reports/employee-pl-by-date/employee-pl-by-date.component";
import { EmployeeTransactionComponent } from "./pages/accounts/employee-expenses/employee-transaction/employee-transaction.component";
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import { BtxInvoiceComboComponent } from './pages/bentex/btx-invoice-combo/btx-invoice-combo.component';
import { SalaryAdjustmentComponent } from './reports/salary-adjustment/salary-adjustment.component';
import { NowgrayTimeDashboardComponent } from './pages/bentex/nowgray-time-dashboard/nowgray-time-dashboard.component';
import { AbsentReportComponent } from './reports/absent-report/absent-report.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { ExpenseReportComponent } from './reports/expense-report/expense-report.component';
import { TransactionReportComponent } from './reports/transaction-report/transaction-report.component';
import { PendingInvoiceUserComponent } from './reports/pending-invoice/pending-invoice-user/pending-invoice-user.component';
import { NgSelectModule } from "@ng-select/ng-select";




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SiteLayoutComponent,
    SiteHeaderComponent,
    SiteSidebarComponent,
    NotificationBarComponent,
    SiteFooterComponent,
    ForgotPasswordComponent,
    // DeleteMsgComponent,
    ResetPasswordComponent,
    SystemErrorComponent,
    ProfileComponent,
    MemberComponent,
    HelpComponent,
    TransactionsComponent,
    ExpensesComponent,
    AssetsManagementComponent,
    EmployeesComponent,
    InvoicingComponent,
    SalariesComponent,
    SalaryPlComponent,
    BalanceReportComponent,
   
    ReportsComponent,
    SettingComponent,
    ClientsComponent,
    ActivitySheetComponent,
    TimeTrackingComponent,
    TimeSheetComponent,
    TaskComponent,
    ToDoComponent,
    //  ProjectsComponent,
    // EditProjectsComponent,
    //PendingInvoiceComponent,
    LogoutComponent,
    // SmsPanelComponent,
    OportunityComponent,
    EditOportunityComponent,
    EditEmployeeComponent,
    PaymentRequestComponent,
    StatusReportComponent,
    StatusTaskFormComponent, StatusFormComponent,
    DailyReportComponent,
    LeadsComponent, EditLeadsComponent,
    JobApplicantsComponent,
    EditJobApplicantsComponent,
    TimeDashboardComponent,
    TimeUserTrackerComponent,
    SiteLayoutBtxComponent,
    SiteHeaderBtxComponent,
    SiteSidebarBtxComponent,
    LookupheadComponent,
    TimeTrackingComponent,
    TimeSheetComponent,
    AssetsManagementComponent,
    ExpensesComponent,
    InvoicingComponent,
    EditOportunityComponent,
    SmsPanelComponent,
    MyfirmComponent,
    BankComponent,
    PatnerComponent,
    EmployeePlComponent,
    // EmployeePlByDateComponent,
    BillingRateComponent,
    BtxInvoiceComponent,
    PendingInvoiceComponent,
    NotificationComponent,
    ImportantLinksComponent,
    SocialmediaComponent,
     EmployeeExpensesComponent,
     EmployeePlByDateComponent,
     EmployeeTransactionComponent,
     BtxInvoiceComboComponent,
     SalaryAdjustmentComponent,
     NowgrayTimeDashboardComponent,
     AbsentReportComponent,
     ExpenseReportComponent,
     TransactionReportComponent,
     PendingInvoiceUserComponent,
 
 


 

  ],
  imports: [
    ChartsModule,
    NgxPaginationModule,
    FileUploadModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    NgxUiLoaderModule,
    NgxPaginationModule,
    HttpClientModule,
    AngularEditorModule,
    NgxSortableModule,
    SelectDropDownModule,
    CKEditorModule,
    ClipboardModule,
    ProjectManagementModule,   CrmModule,
    HrmModule,
    AccountsModule,
    ReportsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatPseudoCheckboxModule,
    AttachmentsModule,
    MatExpansionModule,
    MatIconModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgSelectModule
   

  ], exports: [
    MatInputModule
  ],
  providers: [Config, AuthGuard, AuthGuardSuperAdmin, RoleGuard, DatePipe, ToastrModule,{provide: OWL_DATE_TIME_LOCALE, useValue: 'in'}],
  bootstrap: [AppComponent],
})
export class AppModule { }
