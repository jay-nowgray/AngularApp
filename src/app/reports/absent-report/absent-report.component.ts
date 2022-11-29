import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/pages/hrm/employee.service';
import { ReportsService } from 'src/app/pages/reports/reports.service';
import { Config } from 'src/app/utility/config';


@Component({
  selector: 'app-absent-report',
  templateUrl: './absent-report.component.html',
  styleUrls: ['./absent-report.component.scss']
})
export class AbsentReportComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['date', 'weekDate', 'status', 'workingFor' ];
  columnsToDisplay: string[] = ['date', 'weekDate', 'status', 'workingFor' ];
  dataSource: any;
  month: any = "";
  userDetails: any;
  hideForUser: boolean = false;
  year: any = "";
  userId: any = 0;
  user: any;
  totalAbsent: number;
  EmployeeAbsent: any;
  EmployeeList: any;
  constructor(
    private employeeApi: EmployeeService,
    private Reportapi: ReportsService,
    private config: Config,
    private router: Router,
    // dateTimeAdapter: DateTimeAdapter<any>
  ) { }

  ngOnInit() {
    // this.getReport();
    this.getEmployeeList();
    this.userDetails = JSON.parse(localStorage.getItem("userObj"));
    this.userId= JSON.parse(localStorage.getItem(this.userDetails.userInfo.user_Id))

    if (this.userDetails.userInfo.role_Id ==2) {
      this.hideForUser = true;
    }
  }

  getReport() {
    this.config.startLoader();
    this.Reportapi.GetEmployeeAbsentList(this.userId,this.month,this.year).subscribe(res => {
      this.config.stopLoader();
      if (res.status == 1) {
        this.EmployeeAbsent = res.employeeAbsent;
        this.dataSource = new MatTableDataSource(this.EmployeeAbsent);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
     
      }
      else {
      }
    });
   
  }


 
  getEmployeeList() {

    this.employeeApi.getAllEmployeesListByIsActive(true).subscribe(
      res => {
        //console.log("if k pahle", res)
        // if (this.IsBtxManager()) {
        //   this.EmployeeList = res.user;
        //   //console.log("if k bad")
        // } 
        // else {
        this.EmployeeList = res.user;
        // }
        //this.EmployeeList = res.user;
      },
      err => {
       
      }
    );
  }
  resetData() {
    this.userId = 0;
    this.month = null;
    this.year = null;
    this.getReport();
  }
  onPrint() {
    window.print();
  }
}

