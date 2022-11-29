import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { Config } from 'src/app/utility/config';
import { MyfirmService } from './myfirm.service';


@Component({
  selector: 'app-myfirm',
  templateUrl: './myfirm.component.html',
  styleUrls: ['./myfirm.component.scss']
})
export class MyfirmComponent implements OnInit {
  
  fileToUpload: File = null;
  @Input() attachmentInfo: any;
  @Input() entityType: any;
  @Input() entityId: any;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = ['company_Name', 'patner_Name', 'patner_Pan'];
  clientForm: FormGroup;
  submitted: boolean;
  
  clients: any;
  dataSource: MatTableDataSource<unknown>;
  infoTab: boolean = true;
  bankTab: boolean;
  partenersTab: boolean;
  attchmentsTab: boolean;

  constructor(
    private MyFirmapi:MyfirmService ,
    private config: Config,
    private ClientFormBuilder: FormBuilder,
    private router: Router,

  ) {
    this.clientForm = this.ClientFormBuilder.group({
      company_Info_Id: 0,
      name: "",
      pan: "",
      doi: "2020-10-04T11:47:28.934Z",
      mobile: "",
      email: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pin_Code: "",
      website: "",
      fb: "",
      twitter: "",
      attachment_Id: 0
    });
 
  }

  ngOnInit() {
    this.loadFirm();
  }

  Getall() {
    this.config.startLoader();
    this.MyFirmapi
      .getFirmList()
      .subscribe(res => {
        if ((res.status == 1)) {
          this.config.stopLoader();
          this.dataSource = new MatTableDataSource(res.clients);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        } else {
          this.config.stopLoader();
         
        }
      });
  }

  cancel() {
    this.submitted = false;
    this.clientForm.reset();
  }

  updateFirm() {
    this.submitted = true;
    if (this.clientForm.value.company_Info_Id == null) {
      this.clientForm.value.company_Info_Id = 0
    }
    this.clientForm.value.company_Info_Id = parseInt(this.clientForm.value.company_Info_Id);
    this.MyFirmapi.FirmAddUpdate(this.clientForm.value).subscribe(res => {
      if (res.status == "1") {
        Swal.fire("Success", res.message, "success");
        //this.Getall();
        //this.clientForm.reset(); 
      }
      else {
        Swal.fire("Oops..", res.message, "error");
      }
    });
  }

  async loadFirm() {
    this.MyFirmapi.GetFirmById(1).subscribe(
      res => {
        //console.log("respond", res);
        this.clientForm.patchValue({
         company_Info_Id: res.company_Info.company_Info_Id,
          name: res.company_Info.name,
          pan: res.company_Info.pan,
          doi: res.company_Info.doi,
          mobile: res.company_Info.mobile,
          email: res.company_Info.email,
          address: res.company_Info.address,
          city: res.company_Info.city,
          state: res.company_Info.state,
          country: res.company_Info.country,
          pin_Code: res.company_Info.pin_Code,
          website: res.company_Info.website,
          fb: res.company_Info.fb,
          twitter: res.company_Info.twitter,
          attachment_Id: res.company_Info.attachment_Id
        });
      },
      err => {
        throw new Error(err);
      
      }
    );
  }

  currentTab(tabId) {

    this.infoTab = false;
    this.bankTab = false;
    this.partenersTab = false;
    this.attchmentsTab = false;

    if (tabId == 'info') {
      this.infoTab = true;
    }
    else if (tabId == 'bank') {
      this.bankTab = true;
    }
    else if (tabId == 'partner') {
      this.partenersTab = true;
    }
    else if (tabId == 'attchments') {
      this.attchmentsTab = true;
    }

  }

  
}


