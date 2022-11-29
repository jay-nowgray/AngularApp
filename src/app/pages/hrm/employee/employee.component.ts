import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import{EmployeeService} from "../employee/employee.service"
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

 
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['full_Name', 'email', 'lookupName', 'action']
  EmployeeForm: FormGroup;
  submitted: boolean;
  ModalOpen: boolean;
  user_Id: number;
  userType: any;
  compensationType: any;
  userDisabled: boolean;
  userInfo: any;
  IsActive: any = "true";
  dataSource: MatTableDataSource<unknown>;

 

  constructor( private router:Router, private empoloyeeApi:EmployeeService,private employeeFormBuilder: FormBuilder) {
    this.EmployeeForm = this.employeeFormBuilder.group({
   company_Id: 0,
    user_Id: 0,
     password: "",
     first_Name: "",
     last_Name: "",
     role_Id: 0,
    email: "",
    last_Login: "",
    failed_Login: null,
    failed_Attempt: null,
    is_Locked: false,
    is_Active: true,
    is_DailyStatusRequired: false,
    dts: "",
    salt: null,
   is_Deleted: false,
    created_On: "",
    modified_On: null,
    created_By: 0,
    profilePath: null,
    modified_By: 0,
    workingFor: "",
    isThirdPartyAdmin: false,
    app_Id: null
    });
  }

   

  ngOnInit() {
    this.getEmployeeList();
    this.GetUserTypeList();
    
    //  this.EditRequestResponse(0);
  }
  resetData() {
    this.IsActive = "true";
   
    this.getEmployeeList();
  }

  getEmployeeList() {  
   this.empoloyeeApi.getAllEmployeesListByIsActive(this.IsActive).subscribe(
      res => {
       //console.log("listed",res);
        this.dataSource = new MatTableDataSource(res.user);
        this.dataSource.sort = this.sort;
         this.dataSource.paginator = this.paginator;
      },
      err => {
      
      }
    );
  }
  loadEmployee(user_Id) {
    this.router.navigate(["/hrm/edit-employees/" + user_Id]);
  }


  saveEmployee(){
    this.submitted=true;
    if (this.EmployeeForm.value.is_Deleted == null) {
      this.EmployeeForm.value.is_Deleted = false;
    }
    if (this.EmployeeForm.value.is_Locked == null) {
      this.EmployeeForm.value.is_Locked = false;
    }
    if (this.EmployeeForm.value.is_Active== null) {
      this.EmployeeForm.value.is_Active = false;
    }
    if (this.EmployeeForm.value.is_DailyStatusRequired== null) {
      this.EmployeeForm.value.is_DailyStatusRequired = false;
    }
    if (this.EmployeeForm.value.isThirdPartyAdmin== null) {
      this.EmployeeForm.value.isThirdPartyAdmin= false;
    }
    if (this.EmployeeForm.value.user_Id == null) {
      this.EmployeeForm.value.user_Id = 0;
    }
    else{
      this.EmployeeForm.value.user_Id = parseInt(this.EmployeeForm.value.user_Id);
    }
    if (this.EmployeeForm.value.company_Id == null) {
      this.EmployeeForm.value.company_Id = 0;
    }
    if (this.EmployeeForm.value.role_Id == null) {
      this.EmployeeForm.value.role_Id = 0;
    }
    else{
      this.EmployeeForm.value.role_Id = parseInt(this.EmployeeForm.value.role_Id);
    }
    if (this.EmployeeForm.value.created_By == null) {
      this.EmployeeForm.value.created_By = 0;
    }
    if (this.EmployeeForm.value.modified_By == null) {
      this.EmployeeForm.value.modified_By = 0;
    }
    if (this.EmployeeForm.value.failed_Attempt == null) {
      this.EmployeeForm.value.failed_Attempt = 0
    }
    //console.log("form value",this.EmployeeForm.value);
    if (this.EmployeeForm.value.first_Name == "" || this.EmployeeForm.value.first_Name == null || this.EmployeeForm.value.first_Name == undefined) {
      Swal.fire(
        "Oops...", "Please Enter Name.", "error"
      )
      return;
    
    }
    else if (this.EmployeeForm.value.password == "" || this.EmployeeForm.value.password == null || this.EmployeeForm.value.password == undefined || this.EmployeeForm.value.password == 0) {
      Swal.fire(
        "Oops...", "Please Enter Password.", "error"
      )
      return;
      }
  
       
         else if (this.EmployeeForm.value.role_Id == "" || this.EmployeeForm.value.role_Id == null || this.EmployeeForm.value.role_Id == undefined || this.EmployeeForm.value.role_Id == 0) {
          Swal.fire(
            "Oops...", "Please Select Role", "error"
          )
          return;
         
         }
         this.submitted=false;
          // else {
            // this.submitted = true;
          
            this.empoloyeeApi.saveEmployees(this.EmployeeForm.value).subscribe(res => {
              if (res.status == 1) {
                //console.log("raj",res);
                this.ModalOpen = false;
                //console.log("successss", res);
                Swal.fire("Success", res.message, "success");
                this.getEmployeeList();
                this.EmployeeForm.reset();
              }
              else {
                  Swal.fire("Oops..", res.message, "error");
              }
        
        });
      }
          
      
  

GetUserTypeList() {
this.empoloyeeApi.GetByType("usertype").subscribe(
    res => {
    this.userType = res.lookupList;
      //console.log("user type list", this.userType);
    },
    err => {
   
    }
  );
}
EditRequestResponse(Id) {
  //console.log("edittbutton", Id)
 this.router.navigate(["/hrm/edit-employees/" + Id]);
  }
// pageChange(newPage: number) {
//   this.router.navigate(["/"], { queryParams: { page: newPage } });
// }


applyFilter(filterValue: string) {
  filterValue = filterValue.trim();
  filterValue = filterValue.toLowerCase();
  this.dataSource.filter = filterValue;
}

cancel() {
  this.submitted = false;
  this.EmployeeForm.reset();
  this.ModalOpen = false;
}
addUser() {
  this.user_Id = 0;
  this.ModalOpen = true;
  this.EmployeeForm.reset();
}



}
