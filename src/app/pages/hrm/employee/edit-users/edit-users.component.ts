import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { Config } from "src/app/utility/config";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import Swal from "sweetalert2";

import { DatePipe } from '@angular/common';
import { EmployeeService } from '../employee.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LookupsService } from 'src/app/services/lookups.service';
import { TimeBtxService } from "src/app/pages/bentex/time-btx.service";

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.scss']
})
export class EditUsersComponent implements OnInit {
  fileToUpload: File = null;
  @Input() attachmentInfo: any;
  @Input() entityType: any;
  @Input() entityId: any;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  displayedColumns: string[] = ['dts', 'attachmentName', 'attachmentUrl', 'action'];
  dataSource: any;

  EditForm: FormGroup;
  submitted: boolean;
  servityList: any;
  employeeObj: any = [];
  comments: any = [];
  employee_Attachments: any;
  user_Id: string;
  MyFirmapi: any;
  attachmentForm: FormGroup;
  ModalOpen: boolean = false;
  userInfo: any;
  userType: any;
  isShow: boolean = false;
  workingFor: any;
  user: any;

  constructor(
    private fb: FormBuilder,

    private config: Config,
    private router: Router,
    private employeeApi: EmployeeService,
    private Route: ActivatedRoute,
    private lookupApi:LookupsService,
    private Api: TimeBtxService,
  ) {

    this.EditForm = this.fb.group({

      company_Id: 0,
      user_Id: "",
      password: ["", Validators.required],
      first_Name:["", Validators.required],
      last_Name: "",
      role_Id: [0, Validators.required],
      email: [''],
      last_Login: "2020-11-09T17:57:45.4586016+05:30",
      failed_Login: null,
      failed_Attempt: null,
      is_Locked: false,
      is_Active: true,
      is_DailyStatusRequired: false,
      dts: "2020-11-09T17:57:45.4586016+05:30",
      salt: null,
      is_Deleted: false,
      created_On: "2020-11-09T17:57:45.4585942+05:30",
      modified_On: null,
      created_By: null,
      filePath: null,
      modified_By: null,
      workingFor: "20091715472385_G07X",
      isThirdPartyAdmin: false,
      app_Id: null
    });
    this.user_Id = this.Route.snapshot.paramMap.get("Id");
  }

  ngOnInit() {
    //console.log(this.user_Id)
    this.getDetail()
    this.GetUserTypeList();
    this.GetWorkingForList();
    // if (this.EmployeeId > 0) {
    //   this.loadRequestById(this.EmployeeId);
    // }
    this.GetallUser();
  }
  get f() {
    return this.EditForm.controls;
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

  getDetail() {
    this.employeeApi.GetEmployeeById(this.user_Id).subscribe(
      res => {
        this.userInfo = res.user;
        //console.log("respond", res);
        this.EditForm.patchValue({
          company_Id: res.user.company_Id,
          user_Id: res.user.user_Id,
          password: res.user.password,
          first_Name: res.user.first_Name,
          full_Name: res.user.first_Name,
          last_Name: res.user.last_Name,
          role_Id: res.user.role_Id,
          email: res.user.email,
          last_Login: res.user.last_Login,
          failed_Login: res.user.failed_Login,
          failed_Attempt: res.user.failed_Attempt,
          is_Locked: res.user.is_Locked,
          is_Active: res.user.is_Active,
          is_DailyStatusRequired: res.user.is_DailyStatusRequired,
          dts: res.user.dts,
          salt: res.user.salt,
          is_Deleted: res.user.is_Deleted,
          created_On: res.user.created_On,
          modified_On: res.user.modified_On,
          created_By: res.user.created_By,
          profilePath: res.user.profilePath,
          modified_By: res.user.modified_By,
          workingFor: res.user.workingFor,
          isThirdPartyAdmin: res.user.isThirdPartyAdmin,
          app_Id: res.user.app_Id
        });
      },
      err => {
        throw new Error(err);
    
      }
    );

  }
  showpass() {
    this.isShow = !this.isShow;
  }


  GetUserTypeList() {
    this.employeeApi.GetByType("usertype").subscribe(
      res => {
        this.userType = res.lookupList;
      
      },
      err => {
        
      }
    );
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
    this.attachmentForm.reset();
    this.ModalOpen = false;
  }

  addAttachment() {
    this.ModalOpen = true;
    this.attachmentForm.reset();
  }

  saveEmployee() {
    this.submitted = true;

    if (this.EditForm.invalid) {
    
      return;
    }
    this.submitted = false;
    // else {
       this.submitted = true;
      if (this.EditForm.value.user_Id === null) {
        this.EditForm.value.user_Id = 0
      }
      if (this.EditForm.value.compensation === null) {
        this.EditForm.value.compensation = 0
      }
      if (this.EditForm.value.dob === null) {
        this.EditForm.value.dob = "2020-10-07T07:51:10.517Z";
      }
      this.EditForm.value.company_Id = 0;
      this.EditForm.value.dts = "2020-10-07T07:51:10.517Z";
      this.EditForm.value.user_Id = parseInt(this.EditForm.value.user_Id);
      this.EditForm.value.role_Id = parseInt(this.EditForm.value.role_Id);
      this.employeeApi.saveEmployees(this.EditForm.value).subscribe(res => {
        if (res.status == 1) {

   
          Swal.fire("Success", res.message, "success");


        }
        else {
          err => {
         
          }
        }
      });

    }
    GetallUser() {
      this.config.startLoader();
      this.Api.GetUserByWorkingFor().subscribe(
        res => {
          this.config.stopLoader();
          // if (this.IsHarita()) {
          //   this.user = res.user.filter(item => item.user_Id !== 4);
          // } else {
            this.user = res.user;
        //  }
        },
        err => {
          //console.log("Errror", err);
        }
      );
    }

  close() {
    this.router.navigateByUrl("hrm/employees");
  }
  loadexpense(id)
  {

  }
  
  
}

