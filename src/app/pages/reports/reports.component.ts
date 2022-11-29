import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { SiteSidebarService } from 'src/app/services/site-sidebar.service';
import { Config } from 'src/app/utility/config';
import { SiteSidebarBtxComponent } from 'src/app/_layoutbtx/site-sidebar-btx/site-sidebar-btx.component';
import { ReportsService } from './reports.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
displayedColumns: string[] = ['fullName', 'workingHour',  'toBeBilled','toBePaid','savings'];
  dailyReportsUnBilled: any;
//workingFor: any;
  dataSource: any;
  workingFor: any;
  workingForList: any;
  constructor( 
    private api:ReportsService ,
    private router: Router,
    private workingForApi: SiteSidebarService ,  
    private config: Config,) { }

  ngOnInit() {
    var obj = JSON.parse(localStorage.getItem("userObj"));
    if(obj.user_Id ===1)
    {
    this.GetDailyReportsUnBilled();
    }
    this. getWorkingFor();
  }
  GetDailyReportsUnBilled() {
    this.api.GetUnbilledDetails(this.workingFor).subscribe(res => {
      this.dailyReportsUnBilled = res.dailyReportsUnBilled;
      this.dataSource = new MatTableDataSource(res.dailyReportsUnBilled);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    // this.api.GetUnbilledDetails().subscribe(res => {
    //   this.dailyReportsUnBilled = res.dailyReportsUnBilled;
    //   //console.log(this.dailyReportsUnBilled);
    });
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
}
