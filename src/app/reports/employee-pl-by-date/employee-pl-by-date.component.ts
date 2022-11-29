import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/pages/hrm/employee.service';
import { ReportsService } from 'src/app/pages/reports/reports.service';
import { Config } from 'src/app/utility/config';


@Component({
  selector: 'app-employee-pl-by-date',
  templateUrl: './employee-pl-by-date.component.html',
  styleUrls: ['./employee-pl-by-date.component.scss']
})
export class EmployeePlByDateComponent implements OnInit {
  @Input() clientName: any;
  @Input() clientInfo: any;
  startDate: any = "";
  endDate: any = "";
  employee: any;
  debitAmount: any;
  creditAmount: any;
  totalDebitedAmount: number = 0;
  totalCreditedAmount: number = 0;
  user: any;
  userId: number;
  constructor(
    private ReportApi: ReportsService,
    private employeeApi: EmployeeService,
    private config: Config,
    private ClientFormBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) {

  }

  ngOnInit(): void {
    this.getReport();
    this.getEmployeeList();
  }
  //getemployee() {
    getReport() {
      this.config.startLoader();
      this.debitAmount = [];
      this.creditAmount = [];
      this.totalDebitedAmount = 0;
      this.totalCreditedAmount = 0;
      this.ReportApi.GetEmployeePL(this.userId, this.startDate, this.endDate).subscribe(res => {
        this.config.stopLoader();
        if (res.status == 1) {
          this.employee = res.employee;
          this.debitAmount = this.employee.filter(x => x.type === "Dr");
          this.creditAmount = this.employee.filter(x => x.type === "Cr");
          for (let i = 0; i < this.debitAmount.length; i++) {
            this.totalDebitedAmount += this.debitAmount[i].total;
          }
          for (let i = 0; i < this.creditAmount.length; i++) {
            this.totalCreditedAmount += this.creditAmount[i].total;
          }
        }
        else {
  
        }
      });
    }
  getEmployeeList() {
    this.employeeApi.getAllEmployees().subscribe(
      res => {
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
  //  applyFilter(filterValue: string) {
  //   filterValue = filterValue.trim();
  //   filterValue = filterValue.toLowerCase();
  //   this.dataSource.filter = filterValue;
  
  // }
  onPrint() {
    window.print();
  }

}
