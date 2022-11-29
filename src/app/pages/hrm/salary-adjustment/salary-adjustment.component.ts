import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LookupsService } from 'src/app/services/lookups.service';
import { Config } from 'src/app/utility/config';
import { ReportsService } from '../../reports/reports.service';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-salary-adjustment',
  templateUrl: './salary-adjustment.component.html',
  styleUrls: ['./salary-adjustment.component.scss']
})
export class SalaryAdjustmentComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['user_Name','date','amount','adjustment_Type','remark'];
  columnsToDisplay: string[] = ['user_Name','date','amount','adjustment_Type','remark'];
  dataSource: any;
  startDate: any = "";
  endDate: any = "";
  user: any;
  id: any;
  remark: any;
  amount: any;
  salarytype: any;
  adjustment_Type: any = "all";
  userId: number;
  date: any
  totalAmount: number = 0;

  constructor(
    private employeeApi: EmployeeService,
    private Reportapi: ReportsService,
    private config: Config,
    private router: Router,
    private lookupsServiceApi: LookupsService,
    // dateTimeAdapter: DateTimeAdapter<any>
  ) { }

  ngOnInit() {
    this.getEmployeeList();
    this.GetSalaryType();
    this.getReport();
  }

  getReport() {
    this.totalAmount = 0;
    this.config.startLoader();
    let fromDate = null;
    let toDate = null;
    if (this.config.getCurrentDateParsed(this.startDate) === 'NaN-aN-aNTaN:aN:aN.aNZ' || this.config.getCurrentDateParsed(this.startDate) === '') {
      fromDate = null;
    }
    else
    {
      fromDate = this.config.getCurrentDateParsed(this.startDate)
    }
    if (this.config.getCurrentDateParsed(this.endDate) === 'NaN-aN-aNTaN:aN:aN.aNZ' || this.config.getCurrentDateParsed(this.endDate) === '') {
      toDate = null;
    }
    else
    {
      toDate = this.config.getCurrentDateParsed(this.endDate)
    }
    if (this.adjustment_Type === null || typeof this.adjustment_Type === 'undefined') {
      this.adjustment_Type = 'all';
    }
    if (this.userId < 0 || this.userId === null || typeof this.userId === 'undefined') {
      this.userId = 0;
    }
    this.Reportapi.GetSalaryAdjustment(this.adjustment_Type, this.userId, fromDate, toDate).subscribe(res => {
      this.config.stopLoader();
      if (res.status == 1) {
        //console.log("jayy",res)
      this.dataSource = new MatTableDataSource(res.salaryAdjustmentPL);
        //console.log("datataataa", this.dataSource)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.getTotalAmount()
      }
      else {
      }
    });
   
  }
  getTotalAmount() {
    this.totalAmount = 0;
    
    if (typeof this.dataSource.filteredData == 'undefined') {
      return;
    }
    for (let i = 0; i < this.dataSource.filteredData.length; i++) {
      this.totalAmount += this.dataSource.filteredData[i].amount;
     
      }
    }
  


  resetData() {
    this.userId = 0;
    this.adjustment_Type = 'all';
    this.startDate = null;
    this.endDate = null;
    this.getReport();
  }

  GetSalaryType() {
    this.lookupsServiceApi.GetByType("salarytype").subscribe(
      res => {
        this.salarytype = res.lookupList;
      },
      err => {
        //console.log("Errror", err);
      }
    );
  }

  getEmployeeList() {
    this.employeeApi.getAllEmployeesList().subscribe(
      res => {
        this.user = res.user;
      },
      err => {
        //console.log("Errror", err);
      }
    );
  }

}
