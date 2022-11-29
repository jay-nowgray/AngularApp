import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/utility/auth.gaurds';
import { ReportsComponent } from './reports.component';
import { SiteLayoutComponent } from 'src/app/_layout/site-layout/site-layout.component';


const routes: Routes = [ {
  path: "reports",
  component: SiteLayoutComponent,
  children: [
  { path: "pending-invoices", canActivate: [AuthGuard], component: ReportsComponent }
  ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
