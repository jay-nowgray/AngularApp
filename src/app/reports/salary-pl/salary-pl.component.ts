import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/pages/hrm/employee.service';
import { ReportsService } from 'src/app/pages/reports/reports.service';
import { Config } from 'src/app/utility/config';

@Component({
  selector: 'app-salary-pl',
  templateUrl: './salary-pl.component.html',
  styleUrls: ['./salary-pl.component.scss']
})
export class SalaryPlComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['first_Name', 'salary_Date', 'salary_Basic', 'incentive', 'deductions', 'advance', 'holdings', 'salary_Payable', 'salary_Paid', 'net_Salary'];
  columnsToDisplay: string[] = ['first_Name', 'salary_Date', 'salary_Basic', 'incentive', 'deductions', 'advance', 'holdings', 'salary_Payable', 'salary_Paid', 'net_Salary'];
  dataSource: any;
  startDate: any = "";
  userDetails: any;
  hideForUser: boolean = false;
  endDate: any = "";
  userId: any = 0;
  user: any;
  totalSalaryBasic: number;
  totalAdvance: number;
  totalDeductions: number;
  totalIncentive: number;
  totalSalaryPaid: number;
  totalSalaryPayable: number;
  totalSalaryNet: number;
  totalHoldings: number;
  SalaryReport: any;
  constructor(
    private employeeApi: EmployeeService,
    private Reportapi: ReportsService,
    private config: Config,
    private router: Router,
    // dateTimeAdapter: DateTimeAdapter<any>
  ) { }

  ngOnInit() {
    this.getReport();
    this.getEmployeeList();
    this.userDetails = JSON.parse(localStorage.getItem("userObj"));
    if (this.userDetails.userInfo.role_Id > 1) {
      this.hideForUser = true;
    }
  }

  getReport() {
    this.config.startLoader();
    this.Reportapi.GetSalaryPL(this.userId, this.config.getCurrentDateParsed(this.startDate), this.config.getCurrentDateParsed(this.endDate)).subscribe(res => {
      this.config.stopLoader();
      if (res.status == 1) {
        this.SalaryReport = res.salaryPL;
        this.dataSource = new MatTableDataSource(this.SalaryReport);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.getTotalAmount()
      }
      else {
      }
    });
   
  }
  getTotalAmount() {
    this.totalSalaryBasic = 0;
    this.totalAdvance = 0;
    this.totalSalaryPaid = 0;
    this.totalDeductions = 0;
    this.totalIncentive = 0;
    this.totalSalaryPayable = 0;
    this.totalSalaryNet = 0;
    this.totalHoldings = 0;
    if (typeof this.dataSource.filteredData == 'undefined') {
      return;
    }
    for (let i = 0; i < this.dataSource.filteredData.length; i++) {
      this.totalSalaryBasic += this.dataSource.filteredData[i].salary_Basic;
      this.totalIncentive += this.dataSource.filteredData[i].incentive;
      this.totalAdvance += this.dataSource.filteredData[i].advance;
      this.totalDeductions += this.dataSource.filteredData[i].deductions;
      this.totalSalaryPaid += this.dataSource.filteredData[i].salary_Paid;
      this.totalSalaryPayable += this.dataSource.filteredData[i].salary_Payable;
      this.totalHoldings += this.dataSource.filteredData[i].holdings;
      if (this.dataSource.filteredData[i].net_Salary > 0) {
        this.totalSalaryNet += this.dataSource.filteredData[i].net_Salary;
      }
    }
  }

  getEmployeeList() {
     this.employeeApi.getAllEmployeesListByIsActive(true).subscribe(
      res => {
        //this.user = res.user;
        this.user = res.user;
      },
      err => {
        
      }
    );
  }
  resetData() {
    this.userId = 0;
    this.startDate = null;
    this.endDate = null;
    this.getReport();
  }
  onPrint() {
    window.print();
  }
}
