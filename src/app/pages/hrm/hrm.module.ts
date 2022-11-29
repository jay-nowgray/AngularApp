import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from './employee/employee.component';
import { EditUsersComponent } from './employee/edit-users/edit-users.component';
import { HrmRoutingModule } from './hrm-routing.module';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material';
import { EmployeeInfoComponent } from './employee-info/employee-info.component';
import { BankInfoComponent } from './employee/bank-info/bank-info.component';
import { EmployeeContactComponent } from './employee/employee-contact/employee-contact.component';
import { SalaryInfoComponent } from './employee/salary-info/salary-info.component';
import { AttachmentsModule } from '../global-attachment/attachments.module';
import { SalaryAdjustmentComponent } from './salary-adjustment/salary-adjustment.component';
import { EmployeeDocumentComponent } from './employee-document/employee-document.component';
import { OfferLetterComponent } from './employee-document/offer-letter/offer-letter.component';
import { AppointmentLetterComponent } from './employee-document/appointment-letter/appointment-letter.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { UserWorkingAssociationComponent } from './user-working-association/user-working-association.component';

import { MyLeavesComponent } from './my-leaves/my-leaves.component';
import { LMSDashboardComponent } from './lms-dashboard/lms-dashboard.component';
import { LeaveTypeComponent } from './leave-type/leave-type.component';

@NgModule({
  declarations: [
    EmployeeComponent,
    EditUsersComponent,
    EmployeeInfoComponent,
    BankInfoComponent,
    EmployeeContactComponent,
    SalaryInfoComponent,
    SalaryAdjustmentComponent,
    EmployeeDocumentComponent,
    OfferLetterComponent,
    AppointmentLetterComponent,
    UserWorkingAssociationComponent,

    MyLeavesComponent,
    LMSDashboardComponent,
    LeaveTypeComponent],
    
  imports: [
    CommonModule,
    HrmRoutingModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatSortModule,
    NgSelectModule,
    AttachmentsModule
  ],
  exports: [
  ]
})
export class HrmModule { }
