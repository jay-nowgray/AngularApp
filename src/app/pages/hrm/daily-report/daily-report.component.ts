import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DailyReportService } from 'src/app/services/daily-report.service';
import { AuthService } from 'src/app/utility/auth.service';
import { ExpenseService } from 'src/app/services/expense.service';
import { Config } from 'src/app/utility/config';

@Component({
  selector: 'app-daily-report',
  templateUrl: './daily-report.component.html',
  styleUrls: ['./daily-report.component.scss']
})
export class DailyReportComponent implements OnInit {
  reportList: any;
  attendanceForm: FormGroup;
  attendanceId: number;
  ModalOpen: boolean = false;
  submitted: boolean;
  user: any;
  constructor(
    private Api: DailyReportService,
    private ApiUser: ExpenseService,
    private router: Router,
    private AssetsFormBuilder: FormBuilder,
    private config: Config,
  ) {
    this.attendanceForm = this.AssetsFormBuilder.group({
      attendance_Id: 0,
      user_Id: [0, Validators.required],
      name: ["", Validators.required],
      department: ["", Validators.required],
      shift_Name: ["", Validators.required],
      shift_Start: "",
      checkin: ["", Validators.required],
      lunch_Start: "",
      lunch_End: "",
      checkout: ["", Validators.required],
      shift_End: "",
      late_Arrival: "",
      early_Departure: "2020-03-30T08:59:20.02Z",
      status: ["", Validators.required]
      // working_Hours: "2020-03-24T12:05:42.529Z",
      // overtime_Hours: "2020-03-24T12:05:42.529Z",
      // break_Hours: "2020-03-24T12:05:42.529Z",
      // effective_Working_Hours: "2020-03-24T12:05:42.529Z"
    });
  }

  ngOnInit() {
    this.getDailyReport();
    this.GetallUser();
  }
  get f() {
    return this.attendanceForm.controls;
  }

  getDailyReport(userId=0) {
    this.config.startLoader();
    this.Api.GetDailyReports(userId).subscribe(res => {
      this.config.stopLoader();
      if (res.status == "1") {
        this.reportList = res.dailyReportsList;
      
      } else {
       
      }
    });
  }
  GetallUser() {
    this.config.startLoader();
    this.ApiUser.Getall().subscribe(
      res => {
        this.config.stopLoader();
        this.user = res.user;
      },
      err => {
        
      }
    );
  }
  //  <======start====  save attendance from model>

  saveAttendance() {
    this.submitted = true;
    
    this.attendanceForm.value.attendance_Id = this.attendanceId;
    this.attendanceForm.value.user_Id = parseInt(this.attendanceForm.value.user_Id);
    this.Api.SaveAttendance(this.attendanceForm.value).subscribe(res => {
      if (res.status == "1") {
        this.ModalOpen = false;
        Swal.fire("Success", res.message, "success");
        this.getDailyReport();

        this.attendanceForm.reset();
       
      }
     
       else {
        Swal.fire("Oops..", res.message, "error");
       
      }
    });
    this.attendanceId = 0;
  }

  //  <====== end ====  save attendance from model >

  // <=========delete Attendance start>

  deleteAttendance(attendanceId) {
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
        this.Api.DeleteAttendance(attendanceId).subscribe(res => {
          //console.log("ddddddee", res);
          if (res.status == "1") {
            //console.log("dddddd", res);
            Swal.fire("Success", "Deleted Successfully!", "success");
            this.getDailyReport()
          } else {
            Swal.fire("Unathorized", res.message, "error");
            //console.log("dddddd", res);
            this.getDailyReport();
          }
        });
      }
    });
  }
  // <=========delete Attendance end>

  //   <=======start ====edit model call>>>>

  async loadAttendance(attendance_Id) {
    this.ModalOpen = true;
    // this.getEmployee();
    //this.getTypeofProduct();
    this.attendanceId = attendance_Id;
    this.Api.GetAttendanceById(this.attendanceId).subscribe(
      res => {
        //console.log("respond", res);

        this.attendanceForm.setValue({
          attendance_Id: res.dailyReportsList.attendance_Id,
          user_Id: res.dailyReportsList.user_Id,
          name: res.dailyReportsList.name,
          department: res.dailyReportsList.department,
          shift_Name: res.dailyReportsList.shift_Name,
          shift_Start: res.dailyReportsList.shift_Start,
          checkin: res.dailyReportsList.checkin,
          lunch_Start: res.dailyReportsList.lunch_Start,
          lunch_End: res.dailyReportsList.lunch_End,
          checkout: res.dailyReportsList.checkout,
          shift_End: res.dailyReportsList.shift_End,
          late_Arrival: res.dailyReportsList.late_Arrival,
          early_Departure: res.dailyReportsList.early_Departure,
          status: res.dailyReportsList.status
          // working_Hours: res.dailyReportsList.working_Hours,
          // overtime_Hours: res.dailyReportsList.overtime_Hours,
          // break_Hours: res.dailyReportsList.break_Hours,
          // effective_Working_Hours: res.dailyReportsList.effective_Working_Hours
        });
      },
      err => {
        throw new Error(err);
       
      }
    );
  }

  updateAttendance() {
    this.submitted = true;
  
    this.attendanceForm.value.user_Id = parseInt(this.attendanceForm.value.user_Id);
    if (this.attendanceForm.invalid) {
      return;
    } else {
      this.attendanceForm.value.attendance_Id = this.attendanceId;
      this.Api.SaveAttendance(this.attendanceForm.value).subscribe(res => {
        if (res.status == "1") {
          Swal.fire("Success", res.message, "success");
          this.getDailyReport();
      
        } else {
          Swal.fire("Oops..", res.message, "error");

        
        }
      });
    }
  }

  cancel() {
    this.submitted = false;
    this.attendanceForm.reset();
    this.ModalOpen = false;
  }
  addReport() {
    this.attendanceId = 0;
    this.ModalOpen = true;
    this.attendanceForm.reset();
  }
}
//  <======= start ====edit model call >>>>
