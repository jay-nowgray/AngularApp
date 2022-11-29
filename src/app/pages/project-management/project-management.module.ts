import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectManagementRoutingModule } from './project-management-routing.module';
import { EditProjectsComponent } from './edit-projects/edit-projects.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table'  
import { MatPaginatorModule } from '@angular/material/paginator';
import { DaybookComponent } from './daybook/daybook.component';
import { TaskInvoiceComponent } from './daybook/task-invoice/task-invoice.component';
import { SearchAutocomplete } from 'src/app/controls/search-autocomplete.component';
import { MatSortModule } from '@angular/material';
import { MultiDaybookComponent } from './daybook/multi-daybook/multi-daybook.component';
import { SoftwareSaleComponent } from './software-sale/software-sale.component';
import { MenulistComponent } from './menulist/menulist.component';
import { MenuPermisionComponent } from './menu-permision/menu-permision.component';
import { NgSelectModule } from '@ng-select/ng-select';
//import { PendingInvoiceComponent } from './pending-invoice/pending-invoice.component';


@NgModule({
  declarations: [
    EditProjectsComponent,
    ProjectsComponent,
    DaybookComponent,
    TaskInvoiceComponent,
    SearchAutocomplete,
    MultiDaybookComponent,
    SoftwareSaleComponent,
    MenulistComponent,
    MenuPermisionComponent,
   // PendingInvoiceComponent,
  ],
  imports: [
    CommonModule,
    ProjectManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgSelectModule

  ]
})
export class ProjectManagementModule { }
