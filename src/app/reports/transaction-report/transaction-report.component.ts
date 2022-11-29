import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { ExportToCsv } from 'export-to-csv';
import { ReportsService } from 'src/app/pages/reports/reports.service';
import { Config } from 'src/app/utility/config';

@Component({
  selector: 'app-transaction-report',
  templateUrl: './transaction-report.component.html',
  styleUrls: ['./transaction-report.component.scss']
})
export class TransactionReportComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['name', 'total'];
  columnsToDisplay: string[] = ['name', 'total'];

  dataSource: any;
  TransactionReport: any;
  fy: any;
  total: any;
  GetFinancialYear: any;
  financialYear: any;
  type: any;
  reportGroupByTypes:any;
  totalcount: any;

  constructor( private Reportapi: ReportsService,
    private config: Config,
    private router: Router,) { }

  ngOnInit() {
    this.getFYList();
    this.getTypeList();
    this.getTotalAmount();
  }
  getFYList() {

    this.Reportapi.GetFinancialYear().subscribe(
      res => {
        this.financialYear = res.financialYear;
      },
      err => {
       
      }
    );
  }
  getTypeList() {

    this.Reportapi.GetReportGroupByTypes().subscribe(
      res => {
        this.reportGroupByTypes = res.reportGroupByTypes;
      },
      err => {
       
      }
    );
  }
  getReport() {
    this.config.startLoader();
    this.Reportapi.GetTransactionReportGroupedByModeByFY(this.fy, this.type).subscribe(res => {
      this.config.stopLoader();
      if (res.status == 1) {
        this.TransactionReport = res.transactionReportGroupedByModeByFY;
        this.dataSource = new MatTableDataSource(this.TransactionReport);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.getTotalAmount()
      }
      else {
      }
    });
   
  }
  resetData() {
    this.fy = 0;
    this.getReport();
  }
  onPrint() {
    window.print();
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
    this.getTotalAmount();
  }
  getTotalAmount() {
    this.totalcount = 0;
    if (typeof this.dataSource.filteredData == 'undefined') {
      return;
    }
    for (let i = 0; i < this.dataSource.filteredData.length; i++) {
      this.totalcount += this.dataSource.filteredData[i].total;
      if (this.dataSource.filteredData[i].total > 0) {
        this.totalcount += this.dataSource.filteredData[i].total;
      }
    }
  }

    export() {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: false,
      title: 'Expenses report',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename:'Expenses Report'
    };
    const csvExporter = new ExportToCsv(options);
    let final = this.TransactionReport.map(({name,total}) => ({name,total}))
    csvExporter.generateCsv(final);
  }
}

