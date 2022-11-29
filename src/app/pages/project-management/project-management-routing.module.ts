import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, AuthGuardSuperAdmin } from 'src/app/utility/auth.gaurds';
import { ProjectsComponent } from './projects/projects.component';
import { TaskComponent } from './task/task.component';
import { SiteLayoutComponent } from 'src/app/_layout/site-layout/site-layout.component';
import { EditProjectsComponent } from './edit-projects/edit-projects.component';
import { DaybookComponent } from './daybook/daybook.component';
import { TaskInvoiceComponent } from './daybook/task-invoice/task-invoice.component';
import { MenulistComponent } from './menulist/menulist.component';
import { MenuPermisionComponent } from './menu-permision/menu-permision.component';

const routes: Routes = [{
  path: "project-management",
  component: SiteLayoutComponent,
  children: [
    { path: "projects", canActivate: [AuthGuard], component: ProjectsComponent },
    { path: "daybook", canActivate: [AuthGuard], component: DaybookComponent },
    // { path: "invoice", canActivate: [AuthGuard], component: TaskInvoiceComponent },
    { path: "edit-projects/:Id", component: EditProjectsComponent },
    { path: "menulist", canActivate: [AuthGuardSuperAdmin], component: MenulistComponent },
    { path: "menupermision", canActivate: [AuthGuardSuperAdmin], component: MenuPermisionComponent },
    
  ]
},
{ path: "invoice/:id", canActivate: [AuthGuard], component: TaskInvoiceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectManagementRoutingModule { }
