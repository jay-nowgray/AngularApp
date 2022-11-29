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
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss']
})
export class BankComponent implements OnInit {

  @Input() ResultDataCompanyBank: any;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = ['branch_Account', 'bank_Name', 'holder_Name', 'account_Number', 'ifsc_Code', 'micr_Code', 'action'];
  dataSource: MatTableDataSource<unknown>;
  EditFormBank: FormGroup;
  company_BankDetails_Id: number;
  submitted: boolean;
  userDisabled: boolean;
  userInfo: any;
  constructor(private FormBuilder: FormBuilder,
    private router: Router,
    private config: Config,
    private route: ActivatedRoute,
    private MyFirmAPI: MyfirmService
  ) {
    this.company_BankDetails_Id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.EditFormBank = this.FormBuilder.group({
      company_BankDetails_Id: 0,
      company_Id: 0,
      company_Info_Id: 0,
      bank_Name: "",
      branch_Account: "",
      holder_Name: "",
      account_Number: "",
      ifsc_Code: "",
      micr_Code: ""
    });
  }
  ngOnInit() {
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
      .getBankList()
      .subscribe(res => {
        if ((res.status == 1)) {
          this.config.stopLoader();
          this.dataSource = new MatTableDataSource(res.company_BankDetails);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        } else {
          this.config.stopLoader();
       
        }
      });
  }

  saveBank() {
    this.Getall();
    this.submitted = true;
    if (this.EditFormBank.value.company_BankDetails_Id == null) {
      this.EditFormBank.value.company_BankDetails_Id = 0
    }
    this.EditFormBank.value.company_BankDetails_Id = parseInt(this.EditFormBank.value.company_BankDetails_Id);
    // this.EditFormBank.value.client_Id = parseInt(this.EditFormBank.value.client_Id);
    // this.EditFormBank.value.expire_Date = this.EditFormBank.value.expire_Date;
    this.MyFirmAPI.BankAddUpdate(this.EditFormBank.value).subscribe(res => {
      if (res.status == "1") {
        //Swal.fire("Success", res.message, "success");
        this.Getall();
        this.EditFormBank.reset();
      }
      else {
        Swal.fire("Oops..", res.message, "error");
      }
    });
  }
  async loadBank(company_BankDetails_Id) {
    //this.ModalOpen = true;
    this.company_BankDetails_Id = company_BankDetails_Id;
    this.MyFirmAPI.GetBankById(this.company_BankDetails_Id).subscribe(
      res => {
       
        this.EditFormBank.patchValue({
          company_BankDetails_Id: res.company_BankDetails.company_BankDetails_Id,
          company_Id: res.company_BankDetails.company_Id,
          company_Info_Id: res.company_BankDetails.company_Info_Id,
          bank_Name: res.company_BankDetails.bank_Name,
          branch_Account: res.company_BankDetails.branch_Account,
          holder_Name: res.company_BankDetails.holder_Name,
          account_Number: res.company_BankDetails.account_Number,
          ifsc_Code: res.company_BankDetails.ifsc_Code,
          micr_Code: res.company_BankDetails.micr_Code,
          state: res.company_BankDetails.state

        });
      },
      err => {
        throw new Error(err);
      
      }
    );
  }

  delete(company_BankDetails_Id) {
    Swal.fire({
      title: "Are you sure want to delete?",
      
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No"
    }).then(result => {
      if (result.value) {
        this.MyFirmAPI.DeleteBank(company_BankDetails_Id).subscribe(res => {
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
  }
}
