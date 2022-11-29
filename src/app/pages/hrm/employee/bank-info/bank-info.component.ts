import { Identifiers } from '@angular/compiler';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Config } from 'src/app/utility/config';

import Swal from 'sweetalert2';
import { EmployeeinfoService } from '../../employee-info/employeeinfo.service';


@Component({
  selector: 'app-bank-info',
  templateUrl: './bank-info.component.html',
  styleUrls: ['./bank-info.component.scss']
})
export class BankInfoComponent implements OnInit {
  @Input() user_Id: any;
  

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = ['name', 'bank_Name','account_No', 'ifsc', 'swiftCode', 'action'];
  dataSource: MatTableDataSource<unknown>;
  EditFormBank: FormGroup
  employee: any;
  constructor(private FormBuilder: FormBuilder,
    private router: Router,
    private config: Config,
    private route: ActivatedRoute,
    private employeeAPI: EmployeeinfoService
  ) {
   
    this.EditFormBank = this.FormBuilder.group({
      bank_Id: 0,
      user_Id: 0,
      bank_Name: "",
      account_No: "",
      ifsc: "",
      swiftCode: "",
      payPal: ""
    });
  }
  ngOnInit() {
 this.Getall();


  }

  Getall() {
    this.config.startLoader();
    this.employeeAPI
      .getBankList(this.user_Id)
      .subscribe(res => {
   
        if ((res.status == 1)) {
          this.config.stopLoader();
          this.dataSource = new MatTableDataSource(res.bankInfo);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        } else {
          this.config.stopLoader();
       
        }
      });
  }
  saveEmployee() {
    if(this.EditFormBank.value.bank_Id==null)
    {
     this.EditFormBank.value.bank_Id=0
    }
    this.EditFormBank.value.user_Id = parseInt(this.user_Id);
    this.employeeAPI.BankAddUpdate(this.EditFormBank.value).subscribe(res => {
      if (res.status == 1) {
      
        Swal.fire("Success", res.message, "success");
        this.Getall();
        this.EditFormBank.reset();
      }
      else {
        err => {
      
        }
      }
    });
 
  }
  clear()
  {
    this.EditFormBank.reset();
  }
  // close() {
  //   this.router.navigateByUrl("hrm/employees");
  // }
  loadBank(Id) {
    //console.log("uyuygygu",this.user_Id)
    this.employeeAPI.GetBankById(Id).subscribe(
      res => {
        this.employee = res.bankInfo;
      
        this.EditFormBank .patchValue({
         user_Id:this.user_Id,
         bank_Id:res.bankInfo.bank_Id,
         bank_Name: res.bankInfo.bank_Name,
         account_No:res.bankInfo.account_No,
         ifsc: res.bankInfo.ifsc,
         swiftCode:res.bankInfo.swiftCode,
         payPal:res.bankInfo.payPal

        });
      },
      err => {
        throw new Error(err);
      
      }
    );
  }

  delete(Id) {
    Swal.fire({
      title: "Are you sure want to delete?",
      
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No"
    }).then(result => {
      if (result.value) {
        this.employeeAPI.DeleteBank(Id).subscribe(res => {
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
