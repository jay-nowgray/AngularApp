import { Component, OnInit,ViewChild } from '@angular/core';
import { BillingRateService } from './billing-rate.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { Config } from 'src/app/utility/config';
import { LookupsService } from 'src/app/services/lookups.service';
@Component({
  selector: 'app-billing-rate',
  templateUrl: './billing-rate.component.html',
  styleUrls: ['./billing-rate.component.scss']
})
export class BillingRateComponent implements OnInit {
   @ViewChild(MatSort, { static: true }) sort: MatSort;
   @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['userName', 'billingRate','payRate', 'action'];
  // columnsToDisplay: string[] = ['userName', 'billingRate','payRate', 'action'];
  IsActive: any = "true";
  workingFor: any = "";
  startDate:any ="";
  endDate:any ="";
  dataSource: any;
  user_Id:number;
  submitted: boolean = false;
  // paginator: any;
  isSubmitted:boolean = false;
  ModalOpen: boolean;
  billingForm:FormGroup;
  EmployeeList:any = "";
  constructor( private Api: BillingRateService, private LookupFormBuilder: FormBuilder, private config: Config , private lookupApi:LookupsService) { 
    this.billingForm = this.LookupFormBuilder.group({
      billing_Id: 0,
      user_Id: [null, Validators.required],
      billingRate:["", Validators.required],
      payRate: ["", Validators.required],
    });
  }
  

  ngOnInit() {
    this.Getall();
    this.getEmployeeList();
    this.GetWorkingForList();
  }

  get f() {
    return this.billingForm.controls;
  }
  resetData() {
    this.IsActive = "true";
   this.workingFor = "";
    this.getEmployeeList();
  }
  
  GetWorkingForList() {
    this.lookupApi.GetByType("workingfor").subscribe(
      res => {
        this.workingFor = res.lookupList;
    
      },
      err => {
    
      }
    );
  }
  getEmployeeList() {
    this.Api.getAllEmployees().subscribe(
      res => {
        this.EmployeeList = res.user;
        //console.log("check id", this.EmployeeList)
      },
      err => {
        //console.log("Errror", err);
      }
    );
  }


  saveBilling() {
    this.submitted = true;
    if (this.billingForm.invalid) {
      this.ModalOpen = true;
      //  Swal.fire("Stop", "Please fill the form to continue", "error");
      //console.log("check validate", this.billingForm.invalid);
      return;
    }
 else {
   this.config.startLoader();
  
   this.submitted = false;
      if (this.billingForm.value.billing_Id === null) {
        this.billingForm.value.billing_Id = 0
      }
  else{
  
  }
      //  this.isSubmitted = true;
      this.billingForm.value.user_Id = parseInt(this.billingForm.value.user_Id);
      this.billingForm.value.billingRate = parseFloat(this.billingForm.value.billingRate);
      this.billingForm.value.payRate = parseFloat(this.billingForm.value.payRate);
      this.Api.saveBilling(this.billingForm.value).subscribe(res => {
      if (res.status == 1) {
        this.config.stopLoader();
      this.ModalOpen = false;
      Swal.fire("Success", res.message, "success");
      //console.log("Success Res==> ", res);
      this.Getall();
      this.billingForm.reset();
        }
        else {
        err => {
        //console.log("Errror", err);
           }
            }
          });
    }
      
      }





   Getall() {
   this.Api.GetAll(this.workingFor, this.IsActive).subscribe(
      res => {
       //console.log("listed",res);
        this.dataSource = new MatTableDataSource(res.billingRate);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      err => {
        //console.log("Errror", err);
      }
    );
  }


 getBillingById(id) {
  this.ModalOpen = true;
  this.Api.GetBillingById(id).subscribe(
    res => {
        //console.log("respond", res);
        this.billingForm.patchValue({
          billing_Id: res.billingRate.billing_Id,
          user_Id: res.billingRate.user_Id,
          billingRate: res.billingRate.billingRate,
          payRate: res.billingRate.payRate,
        
         
        
        });
      },
      err => {
        throw new Error(err);
        //console.log("errrrr", err);
      }
    );
  }


  
  delete(Id) {
    Swal.fire({
      title: "Are you sure want to delete?",
      //icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No"
    }).then(result => {
      if (result.value) {
        this.Api.DeleteById(Id).subscribe(res => {
          //console.log("success", res);
          if (res.status == 1) {
            //console.log("success", res);
            Swal.fire("Success", "Deleted Successfully!", "success");
            this.Getall()
          } else {
            Swal.fire("Unathorized", res.message, "error");
            //console.log("success", res);
            this.Getall();
          }
        });
      }
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }



  cancel() {
    this.submitted = false;
 this.ModalOpen = false;
 this.billingForm.reset();
  }
  addLookup() {
   this.ModalOpen = true;
   }



}
