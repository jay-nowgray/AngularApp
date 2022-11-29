import { Component, OnInit } from '@angular/core';
import { Config } from 'src/app/utility/config';
import { TimeBtxService } from '../time-btx.service';
import { ExpenseService } from 'src/app/services/expense.service';
import { ActivatedRoute } from '@angular/router';
import { min } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DailyReportService } from 'src/app/services/daily-report.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-nowgray-time-dashboard',
  templateUrl: './nowgray-time-dashboard.component.html',
  styleUrls: ['./nowgray-time-dashboard.component.scss']
})
export class NowgrayTimeDashboardComponent implements OnInit {
  date = new Date();
  callsMadeToday: any;
  dailyAttendance: any;
  dailyAttendanceToday: any;
  startDate: any =  new Date(this.date.getTime() - (7 * 24 * 60 * 60 * 1000)).toISOString().slice(0, 10);
  endDate: any = this.date.toISOString().slice(0, 10);
  userId: any;
  totalTime: any;
  adminType: any;
  user: any;
  WorkingFor: any= "nowgray";
  attendanceForm: FormGroup;
  attendanceId: number;
  ModalOpen: boolean = false;
  submitted: boolean;
  currentUserId: any;
  userInfo: any;
  play: boolean = false;
  startWatch: any
  objAttendance: any;
  attendanceObj: any;
  attendanceStatus: boolean;
  userObj: any;
  date1: any;
  date2: any;
  checkinTimer: any;
  interval: any;
  isCheckIn: boolean;
  startdateofweek: any;  
  Enddateofweek: string;  
  model: any = {};  
  name: string;  
  Friday: any;  
  Thruds: any;  
  mon: any;  
  Tuesday: any;  
  Wednedday: any;  
  Sat: any;  
  Sun: any; 
  constructor(private config: Config,
    private Api: TimeBtxService,
    private AttendanceApi: DailyReportService,
    private Route: ActivatedRoute,
    private AssetsFormBuilder: FormBuilder,
    public datepipe: DatePipe
  ) {
this.startDate = this.config.getMonday(new Date()).toISOString().slice(0, 10);
this.endDate = this.config.getSunday(new Date()).toISOString().slice(0, 10);
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
    this.objAttendance = {
      attandance_Id: 0,
      checkin: "",
      checkout: "",
      status: "",
      qrData: "",
      user_Id: 0,
      location: ""
    }
  }


  ngOnInit() {

    //this.getDailyReport();
    var obj = JSON.parse(localStorage.getItem("userObj"));
    this.adminType = obj.userInfo.isThirdPartyAdmin;
  //  this.userId = obj.userInfo.user_Id;
    this.userInfo = obj.userInfo;
    //this.currentUserId = obj.userInfo.user_Id;
   // this.WorkingFor = this.Route.snapshot.paramMap.get("Id");
    this.GetallUser();
    this.LoadData();
    this.getAttendanceStatus()
    this.userObj = JSON.parse(localStorage.getItem("userObj"));
    //console.log("obj", this.userObj.userInfo.user_Id)
    this.model.startdate = new Date();  
   // this.searchdate();
  }
  searchdate() {  
   
    //console.log(this.model.startdate);  
    let getdate = this.datepipe.transform(this.model.startdate, 'd,M,yyyy');  
    function startOfWeek(date) {  
      var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);  
      return new Date(date.setDate(diff));  
    }  
    function endofweek(date) {  
      var lastday = date.getDate() - (date.getDay() - 1) + 6;  
      return new Date(date.setDate(lastday));  
    }  
    var dt = new Date(getdate);  
    this.startdateofweek= this.datepipe.transform(startOfWeek(dt),'d MMMM y');  
    this.Enddateofweek=this.datepipe.transform(endofweek(dt),'d MMMM y');  
  //this.startDate=this.startdateofweek;
//this.endDate=this.Enddateofweek;
    function addDays(date, days) {  
      const find = new Date(Number(date))  
      find.setDate(date.getDate() + days)  
      return find  
    }  
    const date = new Date(startOfWeek(dt));  
    this.mon = this.datepipe.transform(startOfWeek(dt), 'EEEE,d MMMM');  
    this.Tuesday = this.datepipe.transform(addDays(date, 1), 'EEEE, d MMMM');  
    this.Wednedday = this.datepipe.transform(addDays(date, 2), 'EEEE, d MMMM');  
    this.Thruds = this.datepipe.transform(addDays(date, 3), 'EEEE, d MMMM');  
    this.Friday = this.datepipe.transform(addDays(date, 4), 'EEEE, d MMMM');  
    this.Sat = this.datepipe.transform(addDays(date, 5), 'EEEE, d MMMM');  
    this.Sun = this.datepipe.transform(endofweek(dt), 'EEEE, d MMMM');  
  }  
  // IsSuperAdmin() {

  //   if (this.adminType) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
  // IsHarita() {
  //   if (this.currentUserId == 16) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
  LoadData() {
//console.log(this.startDate)
    if (typeof this.startDate == 'undefined' ||
      typeof this.endDate == 'undefined' ||
      typeof this.userId == 'undefined') {
      return
    }

    this.config.startLoader();

    //var last = new Date(date.getTime() - (7 * 24 * 60 * 60 * 1000));
    //last.toISOString().slice(0,10),date.toISOString().slice(0,10)""
    this.totalTime = "00:00";
    let mint = 0;
    this.Api.GetNowgrayDailyActivity(this.userId, this.startDate, this.endDate).subscribe(res => {
      this.config.stopLoader();
      if (res.status == "1") {
        this.dailyAttendance = res.dailyAttendance;
        this.dailyAttendance.forEach(time => {
          if (time.asMinutes > 0) {
            mint += time.asMinutes;
            var hours = Math.floor(mint / 60);
            var minutes = mint % 60;
            this.totalTime = hours + ":" + minutes;
          }
        });
        //console.log("res", res);
      } else {
        //console.log("Somthing went wrong");
      }
    });


  }
  SaveInvoice() {
    this.Api.CreateInvoiceByUserIdAndPeriod(this.userId, this.startDate, this.endDate).subscribe(res => {
      //console.log(res);
      Swal.fire("Success", 'Invoice created successfully', "success");
      this.LoadData();
    });
  }
  UpdateSalaryPaid() {
    this.Api.SalaryPaidByUserIdAndPeriod(this.userId, this.startDate, this.endDate).subscribe(res => {
      //console.log(res);
      Swal.fire("Success", 'Salary paid updated successfully', "success");
      this.LoadData();
    });
  }
  getDailyReport() {
    this.config.startLoader();
    this.Api.GetDailyActivityByDate().subscribe(res => {
      this.config.stopLoader();
      if (res.status == "1") {
        this.dailyAttendanceToday = res.dailyAttendance;
        //console.log("res", res);
      } else {
        //console.log("Somthing went wrong");
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
  //  <======start====  save attendance from model>

  saveAttendance() {
    this.submitted = true;

    this.attendanceForm.value.attendance_Id = this.attendanceId;
    this.attendanceForm.value.user_Id = parseInt(this.attendanceForm.value.user_Id);
    this.AttendanceApi.SaveAttendance(this.attendanceForm.value).subscribe(res => {
      if (res.status == "1") {
        this.ModalOpen = false;
        Swal.fire("Success", res.message, "success");
        this.LoadData();

        this.attendanceForm.reset();
        //console.log("Success Res==> ", res);
      }

      else {
        Swal.fire("Oops..", res.message, "error");
        //console.log("Failed==> ", res);
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
        this.AttendanceApi.DeleteAttendance(attendanceId).subscribe(res => {
          //console.log("ddddddee", res);

          //console.log("dddddd", res);
          Swal.fire("Success", "Deleted Successfully!", "success");


          this.LoadData();

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
    this.AttendanceApi.GetAttendanceById(this.attendanceId).subscribe(
      res => {


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
        });
      },
      err => {
        throw new Error(err);
        //console.log("errrrr", err);
      }
    );
  }

  updateAttendance() {
    this.submitted = true;
    //console.log("Success==> ", this.attendanceForm.value);
    this.attendanceForm.value.user_Id = parseInt(this.attendanceForm.value.user_Id);
    if (this.attendanceForm.invalid) {
      return;
    } else {
      this.attendanceForm.value.attendance_Id = this.attendanceId;
      this.AttendanceApi.SaveAttendance(this.attendanceForm.value).subscribe(res => {
        if (res.status == "1") {
          Swal.fire("Success", res.message, "success");
          this.getDailyReport();
          //console.log("SuccessSSSS==> ", res);
        } else {
          Swal.fire("Oops..", res.message, "error");

          //console.log("Failed==> ", res);
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

  checkIn() {
    this.config.startLoader();
    this.objAttendance.checkin = this.getFormattedDate();// this.curTime.toString(),
    this.objAttendance.checkout = null,
      this.objAttendance.status = "In",
      this.objAttendance.user_Id = this.userObj.userInfo.user_Id,
      //console.log('Object', this.objAttendance);
    this.AttendanceApi.Attandance(this.objAttendance).subscribe(res => {
      if (res.status == 1) {
        //console.log("checkin")
        this.config.stopLoader();
        this.attendanceStatus = true
        this.getAttendanceStatus();
        this.interval = setInterval(() => { this.startTimer() }, 1000)
        this.LoadData()
      }
      else {

      }
    })
  }

  checkOut() {
    this.config.startLoader();
    this.objAttendance.attandance_Id = this.attendanceObj.attendance_Id
    this.objAttendance.checkout = this.getFormattedDate();// this.curTime.toString(),
    this.objAttendance.checkin = null,
      this.objAttendance.status = "Out",
      this.objAttendance.user_Id = this.userObj.userInfo.user_Id,
      this.AttendanceApi.Attandance(this.objAttendance).subscribe(res => {
        if (res.status == 1) {
          //console.log("checkout");
          this.config.stopLoader();
          this.attendanceStatus = false
          this.getAttendanceStatus();
          clearInterval(this.interval);
          this.isCheckIn = false
          this.LoadData()
        }
        else {

        }
      })
  }


  startTimer() {
    this.isCheckIn = true
    this.date2 = new Date(this.attendanceObj.checkin);
    this.date1 = new Date();

    let diffInMilliSeconds = Math.abs(this.date1 - this.date2) / 1000;

    // calculate days
    const days = Math.floor(diffInMilliSeconds / 86400);
    diffInMilliSeconds -= days * 86400;
    //console.log('calculated days', days);

    // calculate hours
    const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
    diffInMilliSeconds -= hours * 3600;
    //console.log('calculated hours', hours);

    // calculate minutes
    const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
    diffInMilliSeconds -= minutes * 60;
    //console.log('minutes', minutes);
    //console.log('diffInMilliSeconds', diffInMilliSeconds);
    const seconds = Math.floor(diffInMilliSeconds);
    //diffInMilliSeconds -= seconds * 100;
    //console.log('seconds', seconds);


    let difference = '';
    if (days > 0) {
      difference += (days === 1) ? `${days} day, ` : `${days} days, `;
    }

    difference += (hours === 0 || hours === 1) ? `${hours} hour, ` : `${hours} hours, `;

    difference += (minutes === 0 || hours === 1) ? `${minutes} minute, ` : `${minutes} minutes, `;
    difference += (seconds === 0 || minutes === 1) ? `${seconds} seconds` : `${seconds} seconds`;
    this.checkinTimer = difference

    return difference;

  }

  getFormattedDate() {
    // 2020-09-18T14:05:05.318Z
    var date = new Date();
    var dateStr =
      date.getFullYear() + "-" +
      ("00" + (date.getMonth() + 1)).slice(-2) + "-" +
      ("00" + date.getDate()).slice(-2) + "T" +
      ("00" + date.getHours()).slice(-2) + ":" +
      ("00" + date.getMinutes()).slice(-2) + ":" +
      ("00" + date.getSeconds()).slice(-2) + "." +
      ("00" + date.getMilliseconds()).slice(-2) + "Z";
    //console.log(dateStr);
    return dateStr;
  }

  getAttendanceStatus() {
    this.AttendanceApi.AttandanceStatus().subscribe(res => {
      if (res != null) {
        this.attendanceObj = res;
        //console.log("attendanceObj", this.attendanceObj)
        this.attendanceStatus = true;
        this.interval = setInterval(() => { this.startTimer() }, 1000)
      }
      else {
        this.attendanceStatus = false;
      }
    })
  }

}


