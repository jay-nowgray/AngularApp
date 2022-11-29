import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-user-working-association',
  templateUrl: './user-working-association.component.html',
  styleUrls: ['./user-working-association.component.scss']
})
export class UserWorkingAssociationComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['name', 'company_Name', 'percentage', 'action']
  dataSource: any;
  Form: FormGroup;
  submitted: boolean;
  ModalOpen: boolean;
  user_Id: number;
  userType: any;
  companyName: any;
  user: any;
  id: number;
  constructor( private router:Router, private route: ActivatedRoute, private empoloyeeApi:EmployeeService, private Api:EmployeeService,private FormBuilder: FormBuilder) { 
    this.id = parseInt(this.route.snapshot.paramMap.get("id"));
  this.Form = this.FormBuilder.group({
    WorkingCompany_Id: 0,
     user_Id: 0,
     company_Name: "",
     percentage:0,
     });}
  ngOnInit() {
    this.getList();
    this.getEmployeeList();
    this.GetcompanyNameList();
    
  }
  getList() {  
    this.empoloyeeApi.getAllUserWorkingAssociation().subscribe(
       res => {
       console.log("listed",res);
         this.dataSource = new MatTableDataSource(res.user_Working_Association);
         this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
       },
       err => {
       
       }
     );
   }
   getEmployeeList() {
    this.empoloyeeApi.getAllEmployeesListByIsActive(true).subscribe(
     res => {
       //this.user = res.user;
       this.user = res.user;
     },
     err => {
       
     }
   );
 }
   saveEmployee(){
    this.submitted=true;
    
    if (this.Form.value.user_Id == null) {
      this.Form.value.user_Id = 0;
    }
    else{
      this.Form.value.user_Id = parseInt(this.Form.value.user_Id);
    }
    if (this.Form.value.WorkingCompany_Id == null) {
      this.Form.value.WorkingCompany_Id = 0;
    }
    
    if (this.Form.value.percentage == null) {
      this.Form.value.percentage = 0;
    }
    else{
      this.Form.value.percentage = parseInt(this.Form.value.percentage);
    }
    if (this.Form.value.company_Name== null) {
      this.Form.value.company_Name = 0;
    }
  
         this.submitted=false;
            this.empoloyeeApi.saveUserWorkingAssociation(this.Form.value).subscribe(res => {
              if (res.status == 1) {
                //console.log("raj",res);
                this.ModalOpen = false;
                //console.log("successss", res);
                Swal.fire("Success", res.message, "success");
                this.getList();
                this.Form.reset();
              }
              else {
                  Swal.fire("Oops..", res.message, "error");
              }
        
        });
      }
      

loadEmployee(id)
{
  this.ModalOpen = true;
  this.empoloyeeApi.GetUserWorkingAssociationById(id).subscribe(
    res => {
       console.log("respond", res);
        this.Form.patchValue({
          WorkingCompany_Id: res.user_Working_Association.workingCompany_Id,
          user_Id: res.user_Working_Association.user_Id,
          company_Name: res.user_Working_Association.company_Name,
          percentage: res.user_Working_Association.percentage,
        
         
        
        });
      },
      err => {
        throw new Error(err);
        //console.log("errrrr", err);
      }
    );

}
delete(id) {
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
      this.empoloyeeApi.DeleteUserWorkingAssociationById(id).subscribe(res => {
        //console.log("success", res);
        if (res.status == 1) {
          //console.log("success", res);
          Swal.fire("Success", "Deleted Successfully!", "success");
          this.getList()
        } else {
          Swal.fire("Unathorized", res.message, "error");
          //console.log("success", res);
          this.getList()
        }
      });
    }
  });
}

cancel() {
  this.submitted = false;
this.ModalOpen = false;
this.Form.reset();
}
addLookup() {
 this.ModalOpen = true;
 }
GetcompanyNameList() {
  this.empoloyeeApi.GetByType("companyName").subscribe(
      res => {
      this.companyName = res.lookupList;
      },
      err => {
     
      }
    );
  }
}


