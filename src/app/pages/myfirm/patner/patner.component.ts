import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Config } from 'src/app/utility/config';

import Swal from 'sweetalert2';
import { MyfirmService } from '../myfirm.service';


@Component({
  selector: 'app-patner',
  templateUrl: './patner.component.html',
  styleUrls: ['./patner.component.scss']
})
export class PatnerComponent implements OnInit {

  @Input() ResultDataCompanyPartner: any;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = ['name', 'pan', 'mobile', 'address', 'action'];
  dataSource: MatTableDataSource<unknown>;
  EditFormPatner: FormGroup;
  partner_Id: number;
  userDisabled: boolean;
  userInfo: any;

  constructor(private FormBuilder: FormBuilder,
    private router: Router,
    private config: Config,
    private route: ActivatedRoute,
    private MyFirmAPI: MyfirmService,
   
  ) {
    this.partner_Id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.EditFormPatner = this.FormBuilder.group({
      partner_Id: 0,
      company_Id: 0,
      company_Info_Id: 0,
      name: "",
      pan: "",
      dob: "",
      mobile: "",
      address: "",
      city: "",
      state: "",
      remarks: "",
      pin: ""
      //  client_Id: this.Client_Id,

    });
  
  }
  ngOnInit() {
    // : void {
    //   this.dataSource = new MatTableDataSource(this.ResultDataCompanyPartner);
    //         this.dataSource.sort = this.sort;
    //         this.dataSource.paginator = this.paginator;
    this.userInfo = JSON.parse(localStorage.getItem("userObj"));
    //console.log(this.userInfo)
    this.Getall();
    if (this.userInfo.userInfo.role_Id > 1) {
      this.userDisabled = true;
    }
  }
  Getall() {
    this.config.startLoader();
    this.MyFirmAPI
      .getPartnerList()
      .subscribe(res => {
        if ((res.status == '1')) {
          this.config.stopLoader();
          this.dataSource = new MatTableDataSource(res.company_Partner);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        } else {
          this.config.stopLoader();
         
        }
      });
  }
  savePartner() {
    this.Getall();
    // this.submitted = true;
    if (this.EditFormPatner.value.partner_Id == null) {
      this.EditFormPatner.value.partner_Id = 0
    }
     if(this.EditFormPatner.value.dob == null || this.EditFormPatner.value.dob == "")
     {
       this.EditFormPatner.value.dob="2020-12-05T11:37:45.278Z"
     }
      this.EditFormPatner.value.company_Info_Id= 0
    this.EditFormPatner.value.partner_Id = parseInt(this.EditFormPatner.value.partner_Id);
    this.MyFirmAPI.PartnerAddUpdate(this.EditFormPatner.value).subscribe(res => {
      if (res.status == "1") {
        // this.ModalOpen = false;
       // Swal.fire("Success", res.message, "success");
        this.Getall();
        this.EditFormPatner.reset();
       
      }
      else {
        Swal.fire("Oops..", res.message, "error");
        
      }
    });
  }

  async loadPartner(partner_Id) {
    this.MyFirmAPI.GetPartnerById(partner_Id).subscribe(
      res => {
        //console.log("respond", res);
        this.EditFormPatner.patchValue({
          partner_Id: res.company_Partner.partner_Id,
          company_Id: res.company_Partner.company_Id,
          company_Info_Id: res.company_Partner.company_Info_Id,
          name: res.company_Partner.name,
          pan: res.company_Partner.pan,
          dob: res.company_Partner.dob,
          mobile: res.company_Partner.mobile,
          address: res.company_Partner.address,
          city: res.company_Partner.city,
          state: res.company_Partner.state,
          remarks: res.company_Partner.remarks,
          pin: res.company_Partner.pin
        });
      },
      err => {
        throw new Error(err);
       
      }
    );
    this.Getall();
  }
  delete(partner_Id) {
    Swal.fire({
      title: "Are you sure want to delete?",
      
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No"
    }).then(result => {
      if (result.value) {
        this.MyFirmAPI.DeletePatner(partner_Id).subscribe(res => {
          if (res.status == 1) {
            Swal.fire("Success", "Deleted Successfully!", "success");
            this.Getall()
          } else {
            Swal.fire("Unathorized", res.message, "error");
            this.Getall();
          }
        });
      }
    });
    this.Getall();
  }
}


