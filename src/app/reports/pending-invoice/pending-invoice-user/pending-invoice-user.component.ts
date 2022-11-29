import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { ReportsService } from 'src/app/pages/reports/reports.service';
import { SiteSidebarService } from 'src/app/services/site-sidebar.service';
import { Config } from 'src/app/utility/config';
import { SiteSidebarBtxComponent } from 'src/app/_layoutbtx/site-sidebar-btx/site-sidebar-btx.component';


@Component({
  selector: 'app-pending-invoice-user',
  templateUrl: './pending-invoice-user.component.html',
  styleUrls: ['./pending-invoice-user.component.scss']
})
export class PendingInvoiceUserComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
displayedColumns: string[] = ['fullName','payRate', 'workingHour','toBePaid','conversionRate','conversion'];
  dailyReportsUnBilled: any;
//workingFor: any; {user_Id: 16, fullName: "Harita Singh", workingHour: "168h 59m", toBePaid: 718.18, conversion: 17954.5}
  dataSource: any;
  workingFor: any;
  workingForList: any;
  startDate: any;
  endDate: any;
  conversion: any;
  currentUserId: any;
  total: number;
  Conversiontotal: number;
  TotalToBePaid: number;
  TotalWorkingHour: number;
  constructor( 
    private api:ReportsService ,
    private router: Router,
    private workingForApi: SiteSidebarService ,  
    private config: Config,) { }

  ngOnInit() {
    var obj = JSON.parse(localStorage.getItem("userObj"));
    this.currentUserId = obj.userInfo.user_Id;
    this. getWorkingFor();
  }
  IsHarita() {
    if (this.currentUserId == 16) {
      return true;
    } else {
      return false;
    }
  }
  GetDailyReportsUnBilled() {
    debugger
    this.api.GetUnbilledDetailsUsers(this.config.getCurrentDateParsed(this.startDate), this.config.getCurrentDateParsed(this.endDate),this.conversion, this.workingFor).subscribe(res => {
      this.dailyReportsUnBilled = res.dailyReportsUnBilledUser;
      this.dataSource = new MatTableDataSource(res.dailyReportsUnBilled);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    // this.api.GetUnbilledDetails().subscribe(res => {
    //   this.dailyReportsUnBilled = res.dailyReportsUnBilled;
    //   //console.log(this.dailyReportsUnBilled);
    });
  }
  resetData() {
    this.workingFor = "";
    this.startDate = null;
    this.endDate = null;
    this.conversion=0;
  }
  getWorkingFor() {
    this.config.startLoader();
    this.workingForApi
      .getWorkingFor()
      .subscribe(res => {
        if ((res.status == '1')) {
        
         //   this.workingFor = res as string[];
          this.workingForList = res.workingFor;
          //console.log("Something went wrong", this.workingForList);
          this.config.stopLoader();
        } else {
          this.config.stopLoader();
          //console.log("Something went wrong");
        }
      });
  }
  // clearFilter() {
  //   this.GetDailyReportsUnBilled ();

  //   this.getWorkingFor();

  // }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  getTotalAmount() {
    this.Conversiontotal = 0; 
    this.TotalToBePaid=0;
    this.TotalWorkingHour=0;
    if (typeof this.dataSource.filteredData == 'undefined') {
      return;
    }
    for (let i = 0; i < this.dataSource.filteredData.length; i++) {
      this.Conversiontotal += this.dataSource.filteredData[i].conversion;                                                                                                                  
      this.TotalToBePaid += this.dataSource.filteredData[i].toBePaid;
      this.TotalWorkingHour += this.dataSource.filteredData[i].workingHour;
      if (this.dataSource.filteredData[i].conversion > 0) {
        this.Conversiontotal += this.dataSource.filteredData[i].conversion;
      }
    }
  }
}
