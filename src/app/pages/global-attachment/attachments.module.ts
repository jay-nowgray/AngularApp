import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { GlobalAttachmentComponent } from '../global-attachment/global-attachment.component';
import { MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, MatPseudoCheckboxModule, MatSortModule, MatTableModule } from '@angular/material';
import { NgSelectModule } from '@ng-select/ng-select';
 

@NgModule({
  declarations: [GlobalAttachmentComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatPseudoCheckboxModule,
    NgSelectModule,
  ],
  exports: [GlobalAttachmentComponent]
})
export class AttachmentsModule { }
