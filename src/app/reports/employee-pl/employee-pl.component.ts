import { Component, Input, OnInit } from '@angular/core';
// import { EmployeeService } from 'src/app/pages/employee/employee.service';
import{EmployeeService} from "src/app/pages/hrm/employee/employee.service"
import { ReportsService } from 'src/app/pages/reports/reports.service';
//import { ReportsService } from 'src/app/pages/reports/reports.service';
import { Config } from 'src/app/utility/config';

@Component({
  selector: 'app-employee-pl',
  templateUrl: './employee-pl.component.html',
  styleUrls: ['./employee-pl.component.scss']
})
export class EmployeePlComponent implements OnInit {

  @Input() clientName: any;
  @Input() clientInfo: any;
  startDate: any = "";
  endDate: any = "";
  userId: any;
  employee: any;
  debitAmount: any;
  creditAmount: any;
  totalDebitedAmount: number = 0;
  totalCreditedAmount: number = 0;
  user: any;
  constructor(
    private ReportApi: ReportsService,
    private employeeApi: EmployeeService,
    private config: Config,
    //  dateTimeAdapter: DateTimeAdapter<any>
  ) {
    //dateTimeAdapter.setLocale('en-IN');
  }

  ngOnInit(): void {
    this.getReport();
    this.getEmployeeList();
  }
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

  onPrint() {
    window.print();
  }

}


