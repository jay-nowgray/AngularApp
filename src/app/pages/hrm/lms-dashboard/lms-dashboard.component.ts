import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { LeaveService } from "src/app/services/leave.service";
import Swal from "sweetalert2";
import { LookupsService } from "src/app/services/lookups.service";
import { Config } from "src/app/utility/config";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: "app-lms-dashboard",
  templateUrl: "./lms-dashboard.component.html",
  styleUrls: ["./lms-dashboard.component.scss"],
})
export class LMSDashboardComponent implements OnInit {
  title = "Dashboard";
  year: any;
  timeoffForm!: FormGroup;
  userInfo: any;
  User_Id: any;
  status: any;
  submitted: boolean;
  from_Date: any;
  to_Date: any;
  requested_Date: any;
  role_Id: any;
  amount: any;
  leaveAmt: any;
  Id: any;
  public _LeaveStatus: any;
  public _LeaveType: any;
  hideForUser: boolean = false;

  // For Table
  displayedColumns: string[] = ["leave_Type", "amount", "isPaid", "remark"];

  displayedColumns2: string[] = ["fullName", "tillDate"];
  dataSource!: MatTableDataSource<any>;
  dataSource2!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  @ViewChild(MatPaginator, { static: false }) newpaginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) newsort: MatSort;
  endDate: any;
  OffToday: any;
  fullName: any;
  employee_Leave: any;
  roleid: any;
  userType: number;
  ModalOpen: boolean=false;
  

  constructor(
    private formBuilder: FormBuilder,
    private api: LeaveService,
    private activatedRoute: ActivatedRoute,
    private CommonApi: LookupsService,
    private config: Config,

  ) {
    this.timeoffForm = this.formBuilder.group({
      id: 0,
      user_Id: 0,
      leave_Type: "AL",
      from_Date: "2022-09-19T12:25:20.681Z",
      to_Date: "2022-09-19T12:25:20.681Z",
      amount: 0,
      requested_Date: "2022-09-19T12:25:20.681Z",
      status: "Pending",
      remark: "",
    });
    this.Id = this.activatedRoute.snapshot.paramMap.get("Id");
    console.log("topId", this.Id);
  }

  ngOnInit(): void {
    this.userInfo = JSON.parse(localStorage.getItem("userObj"));
    this.User_Id = JSON.parse(localStorage.getItem("userObj")).userInfo.user_Id;
    this.userType = this.userInfo.role_Id;
    console.log("roleid", this.roleid)
    this.GetleaveList();
    this.GetStatusList();
    // this.getAllData();
    this.whoIsOff();
    this.AllowedLeaves();
    // this.editLeave(this.Id);

  }
  IsSuperAdmin() {
    if (this.userType === 0 || this.userType === 1) {
      return true;
    } else {
      return false;
    }
  }
  IsEmployee() {
    if (this.userType === 2 || this.userType === 9) {
      return true;
    } else {
      return false;
    }
  }
  // Add Leave
  addLeave() {
    // console.log(this.timeoffForm.value);
    if (
      this.timeoffForm.value.leave_Type == "" ||
      this.timeoffForm.value.status == " " ||
      this.timeoffForm.value.from_Date == "" ||
      this.timeoffForm.value.to_Date == null ||
      this.timeoffForm.value.remark == ""
    ) {
      Swal.fire("Oops...", "Please enter valid data", "error");
    } else {
      console.log(this.timeoffForm.value);
      this.submitted = true;
      if (this.timeoffForm.value.id == null) {
        this.timeoffForm.value.id = 0;
      }

      this.timeoffForm.value.user_Id = this.User_Id;
      this.timeoffForm.value.status = this.timeoffForm.value.status;
      this.timeoffForm.value.from_Date = this.timeoffForm.value.from_Date;
      this.timeoffForm.value.requested_Date = this.timeoffForm.value.from_Date;
      this.timeoffForm.value.amount = this.timeoffForm.value.amount;
      this.timeoffForm.value.remark = this.timeoffForm.value.remark;
      this.api.postLeave(this.timeoffForm.value).subscribe((res) => {
        if (res.status == "1") {
          // console.log(res);
          Swal.fire("Success", res.message, "success");
          this.ModalOpen = false;
          this.timeoffForm.reset();
          
        } else {
          Swal.fire("Oops..", res.message, "error");
        }
      });
    }
  }
  id(id: any) {
    throw new Error("Method not implemented.");
  }

  // Get Leave Type
  GetleaveList() {
    this.CommonApi.GetByType("_LeaveType").subscribe(
      (res) => {
        this._LeaveType = res.lookupList;
      },
      (err) => {
        console.log("Error");

      }
    );
  }
  Openmodel(){
    this.ModalOpen = true;
  }
  cancel(){
    this.ModalOpen = false;
  }
  // Get leave_Type
  GetStatusList() {
    this.CommonApi.GetByType("_LeaveStatus").subscribe(
      (res) => {
        this._LeaveStatus = res.lookupList;
      },
      (err) => {
        console.log("Error");

      }
    );
  }

  // Calculate Date
  calculateAdavance() {
    // console.log("hello")
    let d1 = Date.parse(this.timeoffForm.value.to_Date);
    let d2 = Date.parse(this.timeoffForm.value.from_Date); //time in milliseconds
    var timeDiff = d1 - d2;
    var diff = timeDiff / (1000 * 3600 * 24);
    var day = Math.floor(diff) + 1;
    this.timeoffForm.patchValue({
      amount: day,
    });
  }

  // Apply Filter
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  //Export data 

  // Who is off
  whoIsOff() {
    this.api.getByOff().subscribe((res) => {
      // console.log("whoIsOff",res)
      if (res.status == "1") {
        this.dataSource2 = new MatTableDataSource(res.employee_Leave);
        this.dataSource2.sort = this.newsort;
        this.dataSource2.paginator = this.newpaginator;
      } else {
        Swal.fire("Oops..", res.message, "error");
      }
    });
  }

  // Allowed Leaves
  AllowedLeaves() {
    this.api.getLeavesAllowed().subscribe((res: any) => {
      // console.log("AllowedLeave", res);
      if (res.status == "1") {
        this.dataSource = new MatTableDataSource(res.leaves);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      } else {
        Swal.fire("Oops..", res.message, "error");
      }
    });
  }

  // editLeave(Id) {
   
  //   this.api.editLeave(Id).subscribe((res) => {
      
  //     this.from_Date = this.config.getCurrentDate();
  //     this.to_Date = this.config.getCurrentDate();
  //     this.requested_Date = this.config.getCurrentDate();
  //     this.timeoffForm.patchValue({
  //       id: res.employee_Leave.id,
  //       user_Id: res.employee_Leave.user_Id,
  //       leave_Type: res.employee_Leave.leave_Type,
  //       from_Date: res.employee_Leave.from_Date,
  //       to_Date: res.employee_Leave.to_Date,
  //       amount: res.employee_Leave.amount,
  //       requested_Date: res.employee_Leave.requested_Date,
  //       status: res.employee_Leave.status,
  //       remark: res.employee_Leave.remark,
  //     });
  //   });
  // }
}
