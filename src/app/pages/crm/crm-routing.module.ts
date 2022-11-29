import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, AuthGuardSuperAdmin } from 'src/app/utility/auth.gaurds';
import { ClientsComponent } from './clients/clients.component';
import { ActivitySheetComponent } from './activity-sheet/activity-sheet.component';
import { EditOportunityComponent } from './oportunity/edit-oportunity/edit-oportunity.component';
import { OportunityComponent } from './oportunity/oportunity.component';
import { SmsPanelComponent } from './sms-panel/sms-panel.component';
import { LeadsComponent } from './leads/leads.component';
import { EditLeadsComponent } from './leads/edit-leads/edit-leads.component';
import { SiteLayoutComponent } from 'src/app/_layout/site-layout/site-layout.component';
import { EditClientsComponent } from './clients/edit-clients/edit-clients.component';
import { ClientsBillComponent } from './clients/clients-bill/clients-bill.component';
import { InvoiceGroupdollrComponent } from './clients/invoice-groupdollr/invoice-groupdollr.component';
import { OfferLetterComponent } from '../hrm/employee-document/offer-letter/offer-letter.component';
import { AppointmentLetterComponent } from '../hrm/employee-document/appointment-letter/appointment-letter.component';

const routes: Routes = [   {
  path: "crm",
  component: SiteLayoutComponent,
  children: [    { path: "clients", canActivate: [AuthGuard], component: ClientsComponent },
{ path: "activity-sheet", canActivate: [AuthGuard], component: ActivitySheetComponent },
{ path: "edit-oportunity/:Id", canActivate: [AuthGuard], component: EditOportunityComponent },
{ path: "edit-oportunity", canActivate: [AuthGuard], component: EditOportunityComponent },
{ path: "oportunities", canActivate: [AuthGuard], component: OportunityComponent },
{ path: "sms-panel", canActivate: [AuthGuard], component: SmsPanelComponent },
{ path: "leads", canActivate: [AuthGuard], component: LeadsComponent },
{ path: "edit-leads/:Id", canActivate: [AuthGuard], component: EditLeadsComponent },
{ path: "clients-bill/:Id", canActivate: [AuthGuard], component: ClientsBillComponent },
{ path: "edit-clients/:Id", canActivate: [AuthGuard], component: EditClientsComponent },


{ path: "edit-leads", canActivate: [AuthGuard], component: EditLeadsComponent },]
},
{ path: "crm/invoice-groupdollr", canActivate: [AuthGuardSuperAdmin], component: InvoiceGroupdollrComponent },
{ path: "hrm/offerletter/:Id", canActivate: [AuthGuardSuperAdmin], component: OfferLetterComponent },
{ path: "hrm/appointmentletter/:Id", canActivate: [AuthGuardSuperAdmin], component: AppointmentLetterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrmRoutingModule { }
