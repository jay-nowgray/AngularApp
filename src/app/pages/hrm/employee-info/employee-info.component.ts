import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup,} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Config } from 'src/app/utility/config';
import Swal from 'sweetalert2';
import { EmployeeinfoService } from './employeeinfo.service';



@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.scss']
})
export class EmployeeInfoComponent implements OnInit {
  @Input() user_Id: any;
  EditForm: FormGroup;

  dataSource: any;
  submitted:boolean;

  employee: any;
  employeeType: any;




  constructor(private router: Router, private employeeApi: EmployeeinfoService, private Route: ActivatedRoute, private employeeFormBuilder: FormBuilder, private config: Config) {
    this.EditForm = this.employeeFormBuilder.group({
      user_Id: 0,
      designation:"",
      date_Of_Joining: "2020-11-25T08:35:51.129Z",
      department:"",
      employment_Type:"",
      emp_Code:"",
      dob: "2020-11-25T08:35:51.129Z",
      location: "",
      contact_Id: 0
    });

  }

  ngOnInit() {
    this.GetUserTypeList();
    this.getDetail();



  }


  GetUserTypeList() {
    this.employeeApi.GetByType("employeeType").subscribe(
      res => {
        this.employeeType = res.lookupList;
        //console.log("user type list", this.employeeType);
      },
      err => {
        //console.log("Errror", err);
      }
    );
  }


 
  getDetail() {
    //console.log("uyuygygu",this.user_Id)
    this.employeeApi.GetById(this.user_Id).subscribe(
      res => {
        this.employee = res.employee;
        //console.log(" employeeinfo respond", res);
        this.EditForm.patchValue({
          user_Id:this.user_Id,
          designation: res.employee.designation,
          date_Of_Joining: res.employee.date_Of_Joining,
          department: res.employee.department,
          employment_Type: res.employee.employment_Type,
          emp_Code: res.employee.emp_Code,
          dob: res.employee.dob,
          location: res.employee.location,

        });
      },
      err => {
        throw new Error(err);
        //console.log("errrrr", err);
      }
    );
  }
  get f() {
    return this.EditForm.controls;
  }
  saveEmployee() {
  
    if( this.EditForm.value.emp_Code == null){
      this.EditForm.value.emp_Code= 0;
    }
    if( this.EditForm.value.contact_Id == null){
      this.EditForm.value.contact_Id= 0;
    }
 if(this.EditForm.value.designation==null)
 {
   this.EditForm.value.designation=0;
 }
    // }
    // if( this.EditForm.value.dob == null){
    //   this.EditForm.value.dob= this.config.getCurrentDate();

    // }
    this.EditForm.value.date_Of_Joining=this.EditForm.value.date_Of_Joining;
    this.EditForm.value.employeeType=this.EditForm.value.employeeType;
    this.EditForm.value.dob= this.EditForm.value.dob;
    this.EditForm.value.user_Id = parseInt(this.user_Id);
    this.employeeApi.SaveUpdate(this.EditForm.value).subscribe(res => {
      if (res.status == 1) {
        //console.log("successss", res);
        Swal.fire("Success", res.message, "success");
      }
      else {
        err => {
          //console.log("Errror", err);
        }
      }
    });
  }

}


