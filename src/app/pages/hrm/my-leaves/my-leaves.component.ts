import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { ExportToCsv } from "export-to-csv";
import { LeaveService } from "src/app/services/leave.service";
import { LookupsService } from "src/app/services/lookups.service";
import { Config } from "src/app/utility/config";
import Swal from "sweetalert2";
import { EmployeeService } from "../../hrm/employee.service";

@Component({
  selector: "app-my-leaves",
  templateUrl: "./my-leaves.component.html",
  styleUrls: ["./my-leaves.component.scss"],
})
export class MyLeavesComponent implements OnInit {
  title = "My Leaves";
  UserId: any;
  res: any;
  // assignTo: any = 0;

  // For Table
  displayedColumns: string[] = [
    "fullName",
    "leave_Type",
    "status",
    "from_Date",
    "to_Date",
    "amount",
    "remark",
    "action"
  ];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  userInfo: any;
  Login_key: any;
 _LeaveType: any;
_AccountHeadType: any;
  EmployeeList: any;

  employee_Leave: any;
  timeoffForm: any;
  Id: any;
 
  roleid: any;
  ModalOpen: boolean;
  submitted: boolean;
  _LeaveStatus: any;
  Hideuser:boolean=false;
  AllTasks: any;
  dates: any;
  pending: MatTableDataSource<any>;

  constructor(
    private api: LeaveService,
    private employeeApi: EmployeeService,
    private config: Config,
    private CommonApi: LookupsService,
    private router: Router,
    private formBuilder: FormBuilder,
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
  }

  ngOnInit(): void {
    this.userInfo = JSON.parse(localStorage.getItem("userObj"));
    this.UserId = this.userInfo.user_Id;
    this.roleid=this.userInfo.role_Id;
    console.log("roleid",this.roleid)
    if(this.roleid == 0 && 1){
      this.Hideuser=true;
      this.getAll()
    // this.getAllData(0);
    }else{
      this.getAllData(this.UserId);
    }
    this.getEmployeeList();
    
    this.GetleaveList();
    this.GetStatusList();
    // this.filter();
  }
  getAll() {
    this.api.getAll().subscribe((res) => {
   console.log("my-leaves",res)
      if (res.status == "1") {
        this.AllTasks = res.employeeleavelist;
    
        // this.pending=
        this.dataSource = new MatTableDataSource(res.employeeleavelist);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      } else {
        // console.log("Something went wrong");
      }
    });
  }
  getAllData(userid) {
    this.api.getByList(userid).subscribe((res) => {
  //  console.log("my-leaves",res)
      if (res.status == "1") {
        this.AllTasks = res.employeeleavelist;
    
       
        this.dataSource = new MatTableDataSource(res.employeeleavelist);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      } else {
        // console.log("Something went wrong");
      }
    });
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
  GetleaveList() {
    this.CommonApi.GetByType("_LeaveType").subscribe(
      (res) => {
        // console.log(res);
        this._LeaveType = res.lookupList;
        },
      (err) => {
        console.log("Error");
      }
    );
  }
  export() {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Leave List',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Leave list'
    };
    const csvExporter = new ExportToCsv(options);
    let final = this.AllTasks.map(({fullName,leave_Type,status,from_Date,to_Date,amount,remark}) => ({ fullName,leave_Type,status,from_Date,to_Date ,amount,remark}))
    csvExporter.generateCsv(final);
  }
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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getEmployeeList() {
    this.employeeApi.getAllEmployeesListByIsActive(true).subscribe(
      (res) => {
        // console.log("kkkk", res)
        this.EmployeeList = res.user;
      },
      (err) => {}
    );
  }
  cancel() {
    this.submitted = false;
    this.ModalOpen = false;
    this.timeoffForm.reset();
  }
  selectEmployee(userId) {
  // console.log("select=>Emp",userId)
    this.getAllData(userId);
}
selectStatus(val){
  console.log("select=>status",val)
  this.api.getByListbystatus(val).subscribe((res) => {
   
        if (res.status == "1") {
          this.AllTasks = res.employeeleavelist;
      
         
          this.dataSource = new MatTableDataSource(res.employeeleavelist);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        } else {
          // console.log("Something went wrong");
        }
      });
}

// Edit
getById(Id) {
  console.log("getById=>",Id)
  this.ModalOpen = true;
  this.api.editLeave(Id).subscribe((res) => {
    console.log("editLeave", res);
this.dates=res.employee_Leave;
console.log("editLeavesss", this.dates);
    this.timeoffForm.patchValue({
      id: res.employee_Leave.id,
      user_Id: res.employee_Leave.user_Id,
      leave_Type: res.employee_Leave.leave_Type,
      from_Date: res.employee_Leave.from_Date,
      to_Date: res.employee_Leave.to_Date,
      amount: res.employee_Leave.amount,
      requested_Date: res.employee_Leave.requested_Date,
      status: res.employee_Leave.status,
      remark: res.employee_Leave.remark,
    });
  });
}

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
    // console.log(this.timeoffForm.value);
    this.submitted = true;
    if (this.timeoffForm.value.id == null) {
      this.timeoffForm.value.id = 0;
    }
    this.timeoffForm.value.user_Id = this.UserId;
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
        if(this.roleid <= 1){ 
        this.getAllData(0);
        }else{
          this.getAllData(this.UserId);
        }
      } else {
        Swal.fire("Oops..", res.message, "error");
      }
    });
  }
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
      this.api.DeleteById(Id).subscribe(res => {
   
        if (res.status == 1) {
        
          Swal.fire("Success", "Deleted Successfully!", "success");
          if(this.roleid == 0 && 1){
            this.Hideuser=true;
            this.getAll()
          // this.getAllData(0);
          }else{
            this.getAllData(this.UserId);
          }
        } else {
          Swal.fire("Unathorized", res.message, "error");
        
          if(this.roleid == 0 && 1){
            this.Hideuser=true;
            this.getAll()
          // this.getAllData(0);
          }else{
            this.getAllData(this.UserId);
          }
        }
      });
    }
  });
}

}
