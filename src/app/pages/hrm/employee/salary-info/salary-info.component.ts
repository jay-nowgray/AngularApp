import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Config } from 'src/app/utility/config';
import Swal from 'sweetalert2';
import { SalaryinfoService } from '../salaryinfo.service';

@Component({
  selector: 'app-salary-info',
  templateUrl: './salary-info.component.html',
  styleUrls: ['./salary-info.component.scss']
})
export class SalaryInfoComponent implements OnInit {
  @Input() user_Id: any;

  EditFormSalary: FormGroup
  employee: any;
  salaries: any;
  compensationType: any;

  constructor(private FormBuilder: FormBuilder,
    private router: Router,
    private config: Config,
    private route: ActivatedRoute,
    private salaryAPI:SalaryinfoService
  ) {
   
    this.EditFormSalary = this.FormBuilder.group({
      salary_Id: 0,
      user_Id: 0,
      compensation_Type: "",
      amount: 0,
      valid_From: "2020-12-05T07:02:00.567Z",
    });
  }
  ngOnInit() {
    this.loadSalary();
    this.GetUserTypeList();
  }
  GetUserTypeList() {
    this.salaryAPI.GetByType("compensationType").subscribe(
      res => {
        this.compensationType= res.lookupList;
     
      },
      err => {
      
      }
    );
  }
  // getDetail() {
  //   //console.log("crack",this.user_Id)
  //   this.salaryAPI.GetById(this.user_Id).subscribe(
  //     res => {
  //       this.employee = res.salary;
  //       //console.log(" salaryinfo respond", res);
  //       this.EditFormSalary.patchValue({
  //                user_Id:this.user_Id,
  //                salary_Id:res.salary.salary_Id,
  //                compensation_Type:res.salary.compensation_Type,
  //                amount:res.salary.amount,
  //                valid_From:res.salary.valid_From
  //       });
  //     },
  //     err => {
  //       throw new Error(err);
  //       //console.log("errrrr", err);
  //     }
  //   );
  // }

  Getall() {
    //console.log("jayyyyyy",this.user_Id)
    this.salaryAPI
      .getSalaryList(this.user_Id)
      .subscribe(res => {
       
        if ((res.status == 1)) {
          this.config.stopLoader();
          this.salaries = res.salary;
        } else {
     
        }
      });
  }
  saveSalary() {
    if(this.EditFormSalary.value.salary_Id==null)
    {
     this.EditFormSalary.value.salary_Id=0
    }
    if(this.EditFormSalary.value.amount==null)
    {
     this.EditFormSalary.value.amount=0
    }
  this.EditFormSalary.value.valid_From="2020-12-05T07:02:00.567Z";
    this.EditFormSalary.value.user_Id = parseInt(this.user_Id);
    this.salaryAPI.SalaryAddUpdate(this.EditFormSalary.value).subscribe(res => {
      if (res.status == 1) {
       
        Swal.fire("Update", res.message, "success");
      }
      else {
        err => {
      
        }
      }
    });
 
  }
 
  loadSalary() {
    this.salaryAPI.GetSalaryById(this.user_Id).subscribe(
      res => {
        this.employee = res.salary;
        //console.log("respond", res);
        this.EditFormSalary .patchValue({
         user_Id:this.user_Id,
         salary_Id:res.salary.salary_Id,
         compensation_Type:res.salary.compensation_Type,
         amount:res.salary.amount,
         valid_From:res.salary.valid_From
      

        });
      },
      err => {
        throw new Error(err);
    
      }
    );
  }

  // delete(Id) {
  //   Swal.fire({
  //     title: "Are you sure want to delete?",
      
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes",
  //     cancelButtonText: "No"
  //   }).then(result => {
  //     if (result.value) {
  //       this.salaryAPI.DeleteBank(Id).subscribe(res => {
  //         if (res.status == 1) {
  //           Swal.fire("Success", "Deleted Successfully!", "success");
  //           this.Getall()
  //         } else {
  //           Swal.fire("Unathorized", res.message, "error");
  //           this.Getall();
  //         }
  //       });
  //     }
  //   });
  // }
}
