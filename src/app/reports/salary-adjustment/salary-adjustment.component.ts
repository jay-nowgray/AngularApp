import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { ReportsService } from 'src/app/pages/reports/reports.service';
import { LookupsService } from 'src/app/services/lookups.service';
import { Config } from 'src/app/utility/config';

@Component({
  selector: 'app-salary-adjustment',
  templateUrl: './salary-adjustment.component.html',
  styleUrls: ['./salary-adjustment.component.scss']
})
export class SalaryAdjustmentComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['first_Name', 'total'];
  columnsToDisplay: string[] = ['first_Name', 'total'];
  dataSource: any;
  // hideForUser: boolean = false;
  type: any = "";
  userId: any = 0;
  total: any = 0;
  workingFor: any;
  salarytype: any;
  workingForCompany: any;
  salaryAdjustments: any;
  totalHoldings: number;
  constructor(
    private Reportapi: ReportsService,
    private config: Config,
    private router: Router,
    private lookupApi: LookupsService,
    // dateTimeAdapter: DateTimeAdapter<any>
  ) { }

  ngOnInit() {
    this.GetWorkingForList();
    this.GetSalarytypeList();
    this.getReport();
  //  this.getTotalAmount();
  }
  GetSalarytypeList() {
    this.lookupApi.GetByType("salarytype").subscribe(
      res => {
        this.salarytype = res.lookupList;

      },
      err => {
      }
    );
  }
  GetWorkingForList() {
    this.lookupApi.GetByType("workingfor").subscribe(
      res => {
        this.workingFor = res.lookupList;
      },
      err => {

      }
    );
  }
  getReport() {
    this.config.startLoader();
    this.Reportapi.GetSalaryAdjustmentsByType(this.type, this.workingForCompany).subscribe(res => {
      this.config.stopLoader();
      if (res.status == 1) {
        this.salaryAdjustments = res.salaryAdjustments;
        this.dataSource = new MatTableDataSource(this.salaryAdjustments);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.getTotalAmount();
      }
      else {
      }
    });

  }
  getTotalAmount() {
    debugger
    this.totalHoldings = 0;
    if (typeof this.dataSource.filteredData === 'undefined') {
      return;
    }
    for (let i = 0; i < this.dataSource.filteredData.length; i++) {
      this.totalHoldings += this.dataSource.filteredData[i].total;

    }
  }


  resetData() {
    // this.GetWorkingForList();
    // this.GetSalarytypeList();
    this.workingForCompany = null;
    this.salarytype = null;
    this.workingFor=null;
    this.type=null;
    this.getTotalAmount();
    this.getReport();
      this.GetWorkingForList();
    this.GetSalarytypeList();
  }

  onPrint() {
    window.print();
  }
}

