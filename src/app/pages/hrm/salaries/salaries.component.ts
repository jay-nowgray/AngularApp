import { Component, Input, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Config } from 'src/app/utility/config';
import { SalariesService } from './salaries.service';
import { ExportToCsv } from 'export-to-csv';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { LookupsService } from 'src/app/services/lookups.service';

import { EmployeeService } from '../employee.service';
import { SalaryinfoService } from '../employee/salaryinfo.service';

@Component({
  selector: 'app-salaries',
  templateUrl: './salaries.component.html',
  styleUrls: ['./salaries.component.scss']
})

export class SalariesComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Input() user_Id: any;


  displayedColumns: string[] = ['name', 'salary_date', 'salary_Basic', 'salary_Total', 'month', 'action'];
  dataSource: any;
  submitted: boolean;
  ModalOpen: boolean;
  id: number;
  user: any;
  salarytype: any;
  selectedUser: any;
  salaryadjustment: any = [];
  savedAmount: number = 0;
  selectedMonth: number = 0;
  selectedYear: number = 0;
  selectedEmployee: number = 0;
  SalariesForm = new FormGroup({
    id: new FormControl(0),
    user_Id: new FormControl(0),
    month: new FormControl(0),
    year: new FormControl(0),
    salary_Basic: new FormControl(0),
    salary_Total: new FormControl(0),
    salary_Date: new FormControl(""),
    settled: new FormControl(false),
    remark: new FormControl(""),
  });

  salaryAdjustmentForm = new FormGroup({
    id: new FormControl(0),
    user_Id: new FormControl(0),
    adjustment_Type: new FormControl(""),
    remark: new FormControl(""),
    date: new FormControl(""),
    amount: new FormControl(0),
    salaryID: new FormControl(0),
  });
  incentiveAmount: number = 0;
  deductedAmount: number = 0;
  monthList: any;
  yearList: any;
  employee: any;
  salary: any;

  constructor(
    private SalariesApi: SalariesService,
    private lookupsServiceApi: LookupsService,
    private config: Config,
    private userApi: EmployeeService,
    private salaryinfoApi: SalaryinfoService
  ) {

  }

  ngOnInit() {
    this.getSalariesList();
    this.Getall();
    this.GetSalaryType()
    //console.log("Date=> ", this.config.getCurrentDate())
    // this.salaryadd();
  }

  Getall() {
    this.SalariesApi.Getall(true).subscribe(
      res => {
        this.user = res.user;
      },
      err => {
        //console.log("Errror", err);
      }
    );
  }

  addSalaryAdjustment() {
    debugger
    this.incentiveAmount = 0;
    this.deductedAmount = 0;
    if (this.SalariesForm.value.user_Id == "" || this.SalariesForm.value.user_Id == null) {
      Swal.fire("Oops..", "Please select any user!", "error");
      return;
    }
    if (this.SalariesForm.value.remark == null) {
      this.SalariesForm.value.remark = "";
    }
    if (this.salaryAdjustmentForm.value.adjustment_Type == "" || this.salaryAdjustmentForm.value.adjustment_Type == null) {
      Swal.fire("Oops..", "Please select salary type!", "error");
      return;
    }
    if (this.salaryAdjustmentForm.value.amount < 0 || this.salaryAdjustmentForm.value.amount == null) {
      Swal.fire("Oops..", "Please enter amount!", "error");
      return;
    }

    let basicSalary = this.salaryadjustment.filter(x => x.adjustment_Type === 'Basic')

    if (basicSalary.length > 0 && this.salaryAdjustmentForm.value.adjustment_Type === 'Basic') {
      Swal.fire("Warning!", "Basic salary already added.", "error");
      return;
    }
    else if (this.salaryAdjustmentForm.value.adjustment_Type === 'Basic') {
      this.SalariesForm.patchValue({
        salary_Basic: this.salaryAdjustmentForm.value.amount
      });
    } else {

    }

    if (this.salaryAdjustmentForm.value.id == null) {
      this.salaryAdjustmentForm.value.id = 0;
    }
    if (this.salaryAdjustmentForm.value.salaryID == null) {
      this.salaryAdjustmentForm.value.salaryID = 0;
    }
    if (this.salaryAdjustmentForm.value.remark == null) {
      this.salaryAdjustmentForm.value.remark = "";
    }
    this.salaryAdjustmentForm.value.user_Id = parseInt(this.SalariesForm.value.user_Id);
    if (this.salaryAdjustmentForm.value.date == null || this.salaryAdjustmentForm.value.date == "") {
      this.salaryAdjustmentForm.value.date = this.config.getCurrentDate();
    }

    let adjustment = this.salaryAdjustmentForm.value;
    this.salaryadjustment.push(adjustment)
    this.salaryAdjustmentForm.patchValue({
      adjustment_Type: "",
      date: "",
      remark: "",
      amount: 0
    })
    this.sum();
  }

  sum() {
    let deductions = this.salaryadjustment.filter(x => x.adjustment_Type === 'Advance' || x.adjustment_Type === 'Deductions' || x.adjustment_Type === 'Paid' || x.adjustment_Type === 'Holdings');
    let sumDeductions = 0;
    deductions.forEach(element => {
      sumDeductions += element.amount;
    });
    let incentive = this.salaryadjustment.filter(x => x.adjustment_Type === 'Incentive' || x.adjustment_Type === 'Arrear' || x.adjustment_Type === 'OtherAllowances');
    let sumIncentive = 0;
    incentive.forEach(element => {
      sumIncentive += element.amount;
    });
    this.salaryadjustment.forEach(element => {
      element.user_Id = parseInt(this.SalariesForm.value.user_Id);
    });
    this.savedAmount = this.SalariesForm.value.salary_Basic + sumIncentive - sumDeductions;
    this.SalariesForm.patchValue({
      salary_Total: this.savedAmount
    });
  }

  deleteAdjustment(type, amt) {
    debugger
    this.incentiveAmount = 0;
    this.deductedAmount = 0;
    let rawSalary = this.salaryadjustment ? this.salaryadjustment : [];
    rawSalary = rawSalary.filter(function (item) {
      return item.adjustment_Type !== type || item.amount !== amt;
    });

    let deletedSalary = this.salaryadjustment ? this.salaryadjustment : [];
    deletedSalary = deletedSalary.filter(function (item) {
      return item.adjustment_Type === type && item.amount === amt;
    });

    if (deletedSalary[0].adjustment_Type === 'Basic') {
      this.SalariesForm.patchValue({
        salary_Total: this.SalariesForm.value.salary_Total - deletedSalary[0].amount,
        salary_Basic: 0
      });
      this.savedAmount = this.savedAmount - deletedSalary[0].amount;
    }

    else {
      if (deletedSalary[0].adjustment_Type === 'Incentive' || deletedSalary[0].adjustment_Type === 'Arrear' || deletedSalary[0].adjustment_Type === 'OtherAllowances') {
        this.incentiveAmount = deletedSalary[0].amount;
      }
      else {
        this.deductedAmount = deletedSalary[0].amount;
      }
    }
    let grossAmount = this.savedAmount + this.deductedAmount - this.incentiveAmount;
    this.SalariesForm.patchValue({
      salary_Total: grossAmount
    });
    this.savedAmount = grossAmount;
    this.salaryadjustment = rawSalary;
    //console.log(this.salaryadjustment)
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
  getYear(number) {
    if (number == 2016) {
      return '2016';
    }
    if (number == 2017) {
      return '2017';
    }
    if (number == 2018) {
      return '2018';
    }
    if (number == 2019) {
      return '2019';
    }
    if (number == 2020) {
      return '2020';
    }
    if (number == 2021) {
      return '2021';
    }
    if (number == 2022) {
      return '2022';
    }
    if (number == 2023) {
      return '2023';
    }
    if (number == 2024) {
      return '2024';
    }
    if (number == 2025) {
      return '2025';
    }
  }
  getMonth(number) {
    if (number == 1) {
      return 'Jan';
    }
    if (number == 2) {
      return 'Feb';
    }
    if (number == 3) {
      return 'Mar';
    }
    if (number == 4) {
      return 'Apr';
    }
    if (number == 5) {
      return 'May';
    }
    if (number == 6) {
      return 'Jun';
    }
    if (number == 7) {
      return 'Jul';
    }
    if (number == 8) {
      return 'Aug';
    }
    if (number == 9) {
      return 'Sep';
    }
    if (number == 10) {
      return 'Oct';
    }
    if (number == 11) {
      return 'Nov';
    }
    if (number == 12) {
      return 'Dec';
    }
  }
  getSalariesList() {
    this.config.startLoader();
    //console.log(this.selectedMonth, this.selectedYear)
    this.SalariesApi.GetSalaryListByMonth(this.selectedEmployee, this.selectedMonth, this.selectedYear).subscribe(
      res => {
        this.config.stopLoader();
        //console.log(res.salary);
        this.dataSource = new MatTableDataSource(res.salary);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.monthList = res.result.monthList;
        this.yearList = res.result.yearList;
        //console.log("Months=> ", this.monthList, "Years==>", this.yearList)
      },
      err => {
        //console.log("Errror", err);
      }
    );
  }

  cancel() {
    this.submitted = false;
    this.SalariesForm.reset();
    this.ModalOpen = false;
  }

  addSalary() {
    this.id = 0;
    this.ModalOpen = true;
    this.SalariesForm.reset();
    this.salaryAdjustmentForm.reset();
    this.salaryadjustment = [];
    this.savedAmount = 0;

  }
  getSum(): number {
    if (typeof this.salary == 'undefined') {
      return;
    }
    let sum = 0;
    for (let i = 0; i < this.salary.length; i++) {
      sum += this.salary[i].salary_Total;
    }
    return sum;
  }
  saveSalaries() {
    this.submitted = true;
    if (this.SalariesForm.value.id == null) {
      this.SalariesForm.value.id = 0
    }
    if (this.SalariesForm.value.user_Id == "" || this.SalariesForm.value.user_Id == null) {
      Swal.fire("Oops..", "Please select user!", "error");
      return;
    }

    if (this.SalariesForm.value.settled == null) {
      this.SalariesForm.value.settled = false;
    }
    if (this.SalariesForm.value.month == null) {
      this.SalariesForm.value.month = 0;
    }
    if (this.SalariesForm.value.year == null) {
      this.SalariesForm.value.year = 0;
    }
    if(this.SalariesForm.value.salary_Date == "" || this.SalariesForm.value.salary_Date == null)
    {
      this.SalariesForm.value.salary_Date = this.config.getCurrentDate();
    }
    this.SalariesForm.value.user_Id = parseInt(this.SalariesForm.value.user_Id);
    this.SalariesForm.value.month = parseInt(this.SalariesForm.value.month);
    this.SalariesForm.value.year = parseInt(this.SalariesForm.value.year);

    this.SalariesForm.value.id = parseInt(this.SalariesForm.value.id);
    this.SalariesForm.value.salary_Total = parseInt(this.SalariesForm.value.salary_Total);
  
    let basicSalary = this.salaryadjustment.filter(x => x.adjustment_Type === 'Basic')
    //console.log("Basic Salary==> ", basicSalary)

    if (basicSalary.length === 0) {
      if (this.SalariesForm.value.salary_Basic == null) {
        Swal.fire("Warning", "Please enter basic salary.", "error");
        return;
      }
      else {
        this.SalariesForm.value.salary_Basic = parseInt(this.SalariesForm.value.salary_Basic);
      }
    }

    this.SalariesForm.value.salary_Adjustments = this.salaryadjustment;
    this.SalariesApi.SalariesAddUpdate(this.SalariesForm.value).subscribe(res => {
      if (res.status == 1) {
        this.ModalOpen = false;
        Swal.fire("Success", res.message, "success");
        this.getSalariesList();
        this.SalariesForm.reset();
      }
      else {
        Swal.fire("Oops..", res.message, "error");
      }
    });
  }

  async editSalaries(id) {
    this.ModalOpen = true;
    this.getSalaryAdjustment(id);
    this.SalariesApi.GetSalariesById(id).subscribe(
      res => {
        //console.log("respond", res);
        this.savedAmount = res.salary.salary_Total;
        this.SalariesForm.patchValue({
          user_Id: parseInt(res.salary.user_Id),
          month: parseInt(res.salary.month),
          year: parseInt(res.salary.year),
          salary_Basic: parseInt(res.salary.salary_Basic),
          id: parseInt(res.salary.id),
          salary_Total: parseInt(res.salary.salary_Total),
          salary_Type: res.salary.salary_Type,
          salary_Date: res.salary.salary_Date,
          remark: res.salary.remark
        });
      },
      err => {
        throw new Error(err);
        //console.log("errrrr", err);
      }
    );
  }

  getSalaryAdjustment(id) {
    this.SalariesApi.GetSalaryAdjustment(id).subscribe(res => {
      if (res.status == 1) {
        this.salaryadjustment = res.salaryAdjustmentsList;
      }
      else { }
    });
  }

  getEmployeeDetail(e) {
    this.salaryAdjustmentForm.reset();
    // this.salaryadjustment = [];
    this.salaryinfoApi.GetSalaryById(e.target.value).subscribe(res => {
      if (res.status == 1) {
        this.selectedUser = res.salary;
        this.SalariesForm.patchValue({
          salary_Basic: this.selectedUser.amount,

        });
        //this.savedAmount = this.selectedUser.compensation;
        this.sum();
      } else {

      }
    })
  }

  clearFilter() {
    this.selectedMonth = 0;
    this.selectedYear = 0;
    this.selectedEmployee = 0;
    this.getSalariesList();
  }

  generateSalary() {
    Swal.fire({
      title: "Are you sure want to generate current month salary?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No"
    }).then(result => {
      if (result.value) {
        this.config.startLoader();
        this.SalariesApi.GenerateSalary().subscribe(res => {
          if (res.status == 1) {
            Swal.fire("Success", "Salary generated successfully.", "success");
            this.getSalariesList();
          } else {
            Swal.fire("Unathorized", res.message, "error");
            this.getSalariesList();
          }
        });
      }
    });
  }

  deleteSalary(id) {
    Swal.fire({
      title: "Are you sure want to delete?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No"
    }).then(result => {
      if (result.value) {
        this.SalariesApi.DeleteSalary(id).subscribe(res => {
          if (res.status == 1) {
            Swal.fire("Success", "Deleted Successfully!", "success");
            this.getSalariesList();
          } else {
            Swal.fire("Unathorized", res.message, "error");
            this.getSalariesList();
          }
        });
      }
    });
  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
