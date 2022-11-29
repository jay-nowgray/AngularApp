import { Component, OnInit, ViewChild } from "@angular/core";

import { NgxUiLoaderService } from "ngx-ui-loader";
import { Config } from "src/app/utility/config";
import { Router } from "@angular/router";
import {} from "googlemaps";
import { DashboardService } from "./dashboard.service";
import { MultiDataSet, Label } from 'ng2-charts';
import { ChartType } from 'chart.js';
import { ReportsService } from '../reports/reports.service';
import { formatDate } from "@angular/common";
import { eRoleType } from 'src/app/utility/config';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  CallsPending: any;
  CallsCompleted: any;
  callsMadeToday: any;
  expensesCount:any;
  employeesCount: any;
  employeesInactiveCount: any;
  opportunitiesCount:any;
  incomeCount: any;
  toBePaid: number;
  toBeBilled: number;
  lastMonthExpensesCount: any;
  lastMonthIncomeCount: any;
  dailyCheckInAttendance: any;
  list:any;
  localTime: any;
  today = new Date();
  todaysDataTime = "";
  play:boolean = false;
  startWatch:any
  objAttendance:any;
  attendanceObj: any;
  attendanceStatus: boolean = false;
  userObj: any;
  data: any;
  roleId: any;
  successMessage: string;
  // incidentByCaregoryData: any;

  // doughnutChartLabels: Label[] = [];
  // doughnutChartData: MultiDataSet = [];
  // doughnutChartType: ChartType = "doughnut";
  // donutColorsByCate = [
  //   {
  //     backgroundColor: [
  //       "rgba(184, 186, 184,255)",
  //       "rgba(255, 244, 210,255)",
  //       "rgba(255, 223, 223,255)",
  //       "rgba(164, 212, 164,255)",
  //       "rgba(214, 184, 214,255)",
  //       "rgba(210, 237, 255,255)"
  //     ]
  //   }
  // ];

  
  constructor(
    private dashboardApi: DashboardService,
    private api: ReportsService,
    private router: Router,
    private config: Config
  ) {
    //  this.getAllOpportunitiesReport();
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

  ngOnInit(){
    this.userObj = JSON.parse(localStorage.getItem("userObj"));
    this.roleId = this.userObj.role_Id;
    this.Getall();
    // this.LoadDashboardData();
    this.LoadDashboardData();
    this.GetDailyReportsUnBilled();
   // setInterval(()=>{ this.GetDailyReportsUnBilled();},8000);
 
 
  }
  LoadDashboardData() {
    this.config.startLoader();
    this.dashboardApi
      .getDashboardinfo()
      .subscribe(res => {
        if ((res.status == '1')) {
          
          this.CallsPending = res.opportunitiesDoneToday;
          this.callsMadeToday = res.opportunitiesForToday;
          this.expensesCount = res.expensesCount;
          this.incomeCount = res.incomeCount;
          this.lastMonthExpensesCount = res.lastMonthExpensesCount;
          this.lastMonthIncomeCount =res.lastMonthIncomeCount
          this.employeesCount = res.employeesCount;
          this.opportunitiesCount = res.opportunitiesCount;
          this.employeesInactiveCount=res.employeesInactiveCount;
          this.config.stopLoader();
          //console.log("This is res", res);
        } else {
          this.config.stopLoader();
         
        }
      });
      
  }

  EditRequestResponse(Id) {
    this.router.navigate(["edit-oportunity/" + Id]);
  }
  GetDailyReportsUnBilled() {
     
    this.api.GetUnbilledDetails("Bentex").subscribe(res => {
      this.toBeBilled=0;
      this.toBePaid=0;
      if(res.dailyReportsUnBilled!=null ){
       res.dailyReportsUnBilled.forEach(element => {
        this.toBeBilled+= element.toBeBilled;
        this.toBePaid+= element.toBePaid;
       });
      }
       
    });
  
   
  }
  workingFor(workingFor: any) {
    throw new Error("Method not implemented.");
  }
  handleError(error: any): void {
    // let errorObj = {
    //   exception: JSON.stringify(error),
    //   location: "reportIncidentsPage",
    //   severity: "low",
    //   deviceType: "Admin"
    // };
    // //super.handleError(error);
    // this.dashboardApi.exceptionLog(errorObj);
  }
  // getAllOpportunitiesReport() {
  //   //console.log("report");

  //   this.dashboardApi.getAllOpportunitiesReport().subscribe(res => {
  //     if (res.opportunity_Type == 1) {
  //       //doughnut chart data manipulate//
  //       let opportunitiesByType = res.opportunitiesByType;
  //       let name = [];
  //       let count = [];
  //       opportunitiesByType.forEach(elm => {
  //         name.push(elm.name);
  //         count.push(elm.count);
  //       });
  //       this.doughnutChartLabels = name;
  //       this.doughnutChartData = count;
  //       //doughnut chart data manipulate END//

  //       //Pie chart data manipulate//
  //       // let incidentByPriority = res.incidentByPriority;
  //       // let Pname = [];
  //       // let Pcount = [];
  //       // incidentByPriority.forEach(elm => {
  //       //   Pname.push(elm.name);
  //       //   Pcount.push(elm.count);
  //       // });
  //       // this.pieChartLabels = Pname;
  //       // this.pieChartData = Pcount;

  //       //3rd chart
  //       // let incidentByStatus = res.incidentByStatus;
  //       // let Pname1 = [];
  //       // let Pcount1 = [];
  //       // incidentByStatus.forEach(elm => {
  //       //   Pname1.push(elm.name);
  //       //   Pcount1.push(elm.count);
  //       // });
  //       // this.pieChartLabels1 = Pname1;
  //       // this.pieChartData1 = Pcount1;
  //     }
  //     //console.log("This is res", res);
  //   });
  // }
  Getall() {
    this.api.GetAllEmployee().subscribe(
       res => {
       //console.log("user",res)
        this.list = res.checkInUserList;//.sort((a,b)=>a.logOutMessage.rendered > b.logOutMessage.rendered)
       console.log("jayyykkk",this.list)
      
        
       },
       err => {
        
       }
     );
   }
   checkOut(userId) {
    this.api.LogOutUser(userId).subscribe(res=> { 

      if(res.status == 1){
        this.successMessage = "Checkout Succesfully";
        this.Getall();
      }
    });
     
  }
   IsSuperAdmin(){
    if ( this.roleId===eRoleType.SuperAdmin) {
      return true;
    } else {
      return false;
    }
}

//  checkIn() {
//   this.play = true;
//   var d = new Date();
//  this.localTime = d.toLocaleTimeString();
//  if(this.play == true){
//   this.startWatch =  setInterval(() => { this.checkIn() }, 1000)
//  }
// else{
//   //console.log("stop interval")
// }
//   }


}
