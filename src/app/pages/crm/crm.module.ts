import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CrmRoutingModule } from './crm-routing.module';
import { EditClientsComponent } from './clients/edit-clients/edit-clients.component';
import { ClientsBillComponent } from './clients/clients-bill/clients-bill.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { TaskClientsComponent } from './clients/task-clients/task-clients.component';
import { ProjectClientsComponent } from './clients/project-clients/project-clients.component';
import { AttachmentsModule } from '../global-attachment/attachments.module';
import { InvoiceGroupdollrComponent } from './clients/invoice-groupdollr/invoice-groupdollr.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [EditClientsComponent, ClientsBillComponent, TaskClientsComponent, ProjectClientsComponent, InvoiceGroupdollrComponent],
  imports: [
    CommonModule,
    CrmRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    AttachmentsModule,
    NgSelectModule,
  ]
})
export class CrmModule { }
