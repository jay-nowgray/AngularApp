import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, AuthGuardSuperAdmin } from 'src/app/utility/auth.gaurds';
import { DailyReportComponent } from './daily-report/daily-report.component';
import { EmployeesComponent } from './employees/employees.component';
import { EditEmployeeComponent } from './employees/edit-employee/edit-employee.component';
import { JobApplicantsComponent } from './job-applicants/job-applicants.component';
import { EditJobApplicantsComponent } from './job-applicants/edit-job-applicants/edit-job-applicants.component';
import { SalariesComponent } from './salaries/salaries.component';
import { SiteLayoutComponent } from 'src/app/_layout/site-layout/site-layout.component';
import { EmployeeComponent } from './employee/employee.component';
import { EditUsersComponent } from './employee/edit-users/edit-users.component';
import { EmployeeInfoComponent } from './employee-info/employee-info.component';
import { SalaryAdjustmentComponent } from './salary-adjustment/salary-adjustment.component';
import { UserWorkingAssociationComponent } from './user-working-association/user-working-association.component';

import { MyLeavesComponent } from './my-leaves/my-leaves.component';
import { LMSDashboardComponent } from './lms-dashboard/lms-dashboard.component';
const routes: Routes = [ {
  path: "hrm",
  component: SiteLayoutComponent,
  children: [{ path: "daily-report", canActivate: [AuthGuard], component: DailyReportComponent },
// { path: "employees", canActivate: [AuthGuard], component: EmployeesComponent },
{ path: "edit-employee", canActivate: [AuthGuardSuperAdmin], component: EditEmployeeComponent },
{ path: "edit-employee/:Id", canActivate: [AuthGuardSuperAdmin], component: EditEmployeeComponent },
{ path: "job-applicants", canActivate: [AuthGuard], component: JobApplicantsComponent },
{ path: "edit-job-applicants/:Id", canActivate: [AuthGuard], component: EditJobApplicantsComponent },
{ path: "edit-job-applicants", canActivate: [AuthGuard], component: EditJobApplicantsComponent },
{ path: "salaries", component: SalariesComponent },
{ path: "employees", component: EmployeeComponent },

{ path: "MyLeave", component: MyLeavesComponent },
{ path: "lmsdashboard", component: LMSDashboardComponent },
{ path: "lmsdashboard/:Id", component: LMSDashboardComponent },
{ path: "user-working-association", component: UserWorkingAssociationComponent },
{ path: "salary-adjustment", canActivate: [AuthGuardSuperAdmin], component:SalaryAdjustmentComponent },
{ path: "edit-employees/:Id", canActivate: [AuthGuardSuperAdmin], component: EditUsersComponent },
{ path: "employee-info/:Id", canActivate: [AuthGuardSuperAdmin], component:  EmployeeInfoComponent},
]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HrmRoutingModule { }
